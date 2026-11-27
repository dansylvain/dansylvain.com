---
title: so_long
summary: A small 2D game in C using the MiniLibX graphics library (42 school project).
repo: https://github.com/dansylvain/42_so_long
tech: [C, MiniLibX, X11, Make]
order: 1
---

## The program

The player moves across a map with the arrow keys, collects every item, then reaches the exit.
The number of moves is printed in the terminal.

- Maps are described in `.ber` files.
- The map is validated before the game starts: extension, characters, line lengths, surrounding
  walls.
- A depth-first search checks that the elements are reachable.
- After a move, only the changed cells are redrawn.

## My role

Solo project, written before I started using AI assistance for code.

## Technical challenges

The crystal sprites: animating their destruction would have taken too long at the time, so I
dropped it.

## What I would do differently

I would add the destruction animation for the crystals. All the assets are ready.

## Gameplay

<figure>
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="/portfolio/so-long/still.webp" />
    <img
      src="/portfolio/so-long/gameplay.webp"
      alt="so_long game window: a hooded red character moves across a map bordered by rocks and collects purple crystals."
      width="838"
      height="348"
      loading="lazy"
      decoding="async"
      data-testid="project-capture"
    />
  </picture>
  <figcaption>Recording of the native Linux version. With reduced motion enabled, a still frame is shown.</figcaption>
</figure>
