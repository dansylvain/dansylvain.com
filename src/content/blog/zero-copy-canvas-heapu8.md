---
title: 'Zero-Copy Canvas Rendering: Sharing a C++ Toroidal Grid with TypeScript via HEAPU8'
summary: How the Game of Life demo reads its C++ grid from TypeScript without serializing or copying it.
date: 2026-11-27
---

The [Game of Life demo](/demos/life/) runs its simulation in C++, compiled to WebAssembly, and
draws it from TypeScript. The grid crosses that boundary without JSON and without an intermediate
JavaScript array.

## A grid with a stable address

The grid is 64 × 48 cells, one byte each, in a static array:

```cpp
std::uint8_t cells[kWidth * kHeight];
std::uint8_t next_cells[kWidth * kHeight];
```

There is no `malloc`: both buffers live in the module's linear memory for its whole lifetime.
Edges wrap around, which makes the grid a torus:

```cpp
constexpr int wrap(int value, int size) { return (value + size) % size; }
```

Adding `size` matters because `-1 % size` is `-1` in C++.

## Exposing a pointer

One exported function returns the address of the visible grid:

```cpp
EMSCRIPTEN_KEEPALIVE
std::uint8_t *life_cells() { return cells; }
```

On the JavaScript side, that pointer is a plain number: an offset into `HEAPU8`, the byte view of
linear memory. The Makefile exports it with `-sEXPORTED_RUNTIME_METHODS=HEAPU8`.

## Reading it from TypeScript

```ts
const ptr = wasm._life_cells();
const cells = wasm.HEAPU8.subarray(ptr, ptr + width * height);
```

`subarray` creates a view on the same buffer, not a copy. The cell at `(x, y)` is
`cells[y * width + x]`, the same indexing as in C++. The draw function clears the canvas, then
calls `fillRect` for each live cell, using the canvas CSS `color` so that the grid follows the
page theme.

## What is still copied

"Zero-copy" describes the language boundary only. Inside C++, `life_step` writes the next
generation to `next_cells`, because neighbor counts need the current one intact. It then copies
the result back:

```cpp
std::memcpy(cells, next_cells, sizeof cells);
```

Swapping two pointers would avoid this 3,072-byte copy, but the visible grid would change address
at every generation. The copy keeps it fixed.

The view is also rebuilt at each draw. This costs little, and it avoids holding a stale view if
memory growth were enabled later: growing the memory replaces the underlying buffer.

[C++ source and Makefile on GitHub](https://github.com/dansylvain/dansylvain.com/tree/main/wasm/life)
