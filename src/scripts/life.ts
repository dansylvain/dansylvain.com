interface LifeModule {
  HEAPU8: Uint8Array;
  _life_width(): number;
  _life_height(): number;
  _life_cells(): number;
  _life_init(): void;
  _life_step(): void;
}

function byTestId<T extends HTMLElement>(id: string): T {
  const el = document.querySelector<T>(`[data-testid="${id}"]`);
  if (!el) {
    throw new Error(`Missing element with data-testid="${id}"`);
  }
  return el;
}

const canvas = byTestId<HTMLCanvasElement>('life-canvas');
const toggleBtn = byTestId<HTMLButtonElement>('life-toggle');
const stepBtn = byTestId<HTMLButtonElement>('life-step');
const resetBtn = byTestId<HTMLButtonElement>('life-reset');
const generationEl = byTestId<HTMLElement>('life-generation');
const statusEl = byTestId<HTMLElement>('life-status');

const rawCtx = canvas.getContext('2d');
if (!rawCtx) {
  throw new Error('2D canvas context unavailable');
}
const ctx: CanvasRenderingContext2D = rawCtx;

const STEP_INTERVAL_MS = 120;

async function loadModule(): Promise<LifeModule> {
  try {
    const url = new URL('/demos/life/life.mjs', window.location.origin).href;
    const { default: createModule } = (await import(/* @vite-ignore */ url)) as {
      default: () => Promise<LifeModule>;
    };
    return await createModule();
  } catch (err) {
    statusEl.textContent = 'The WebAssembly module could not be loaded.';
    throw err;
  }
}

const wasm = await loadModule();
wasm._life_init();

const width = wasm._life_width();
const height = wasm._life_height();
const cellW = canvas.width / width;
const cellH = canvas.height / height;

let generation = 0;
let running = false;
let rafId: number | null = null;
let lastStepTime = 0;

function updateGeneration(): void {
  generationEl.textContent = String(generation);
}

function draw(): void {
  const ptr = wasm._life_cells();
  const cells = wasm.HEAPU8.subarray(ptr, ptr + width * height);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getComputedStyle(canvas).color;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (cells[y * width + x] !== 0) {
        ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
      }
    }
  }
}

function stepOnce(): void {
  wasm._life_step();
  generation += 1;
  updateGeneration();
  draw();
}

function loop(now: number): void {
  if (!running) {
    rafId = null;
    return;
  }

  if (now - lastStepTime >= STEP_INTERVAL_MS) {
    lastStepTime = now;
    stepOnce();
  }

  rafId = requestAnimationFrame(loop);
}

function setRunning(nextRunning: boolean): void {
  running = nextRunning;
  toggleBtn.textContent = running ? 'Pause' : 'Play';

  if (running) {
    lastStepTime = performance.now();
    if (rafId === null) {
      rafId = requestAnimationFrame(loop);
    }
  } else if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function reset(): void {
  setRunning(false);
  wasm._life_init();
  generation = 0;
  updateGeneration();
  draw();
}

toggleBtn.addEventListener('click', () => {
  setRunning(!running);
});

stepBtn.addEventListener('click', () => {
  stepOnce();
});

resetBtn.addEventListener('click', () => {
  reset();
});

const observer = new MutationObserver(() => {
  draw();
});
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme'],
});

const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
colorSchemeMedia.addEventListener('change', () => {
  draw();
});

toggleBtn.disabled = false;
stepBtn.disabled = false;
resetBtn.disabled = false;
statusEl.textContent = '';

reset();

export {};
