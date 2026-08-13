<template>
  <div ref="container" class="dot-solid" role="img" :aria-label="label">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps<{ label: string }>();

const container = ref<HTMLElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);

let animationFrame: number | null = null;
let resizeObserver: ResizeObserver | null = null;
let angle = 0;

const points: Array<[number, number, number, boolean]> = [];
const rings = 20;
const around = rings * 2;

for (let i = 0; i <= rings; i += 1) {
  const latitude = -Math.PI / 2 + (Math.PI * i) / rings;
  const count = Math.max(1, Math.round(around * Math.cos(latitude)));

  for (let j = 0; j < count; j += 1) {
    const longitude = (2 * Math.PI * j) / count;
    points.push([
      Math.cos(latitude) * Math.sin(longitude),
      Math.sin(latitude),
      Math.cos(latitude) * Math.cos(longitude),
      (longitude > 0.65 && longitude < 1.35) || latitude > 1.16,
    ]);
  }
}

const render = () => {
  if (!container.value || !canvas.value) return;

  const context = canvas.value.getContext('2d');
  if (!context) return;

  const bounds = container.value.getBoundingClientRect();
  const width = Math.max(1, bounds.width);
  const height = Math.max(1, bounds.height);
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  if (canvas.value.width !== Math.round(width * pixelRatio) || canvas.value.height !== Math.round(height * pixelRatio)) {
    canvas.value.width = Math.round(width * pixelRatio);
    canvas.value.height = Math.round(height * pixelRatio);
    canvas.value.style.width = `${width}px`;
    canvas.value.style.height = `${height}px`;
  }

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, width, height);

  const tilt = 0.42;
  const tiltCosine = Math.cos(tilt);
  const tiltSine = Math.sin(tilt);
  const rotationSine = Math.sin(angle);
  const rotationCosine = Math.cos(angle);
  const radius = Math.min(width, height) * 0.405;
  const centerX = width / 2;
  const centerY = height / 2;

  for (const [pointX, pointY, pointZ, isAccent] of points) {
    const x = pointX * rotationCosine + pointZ * rotationSine;
    const z = pointZ * rotationCosine - pointX * rotationSine;
    const y = pointY * tiltCosine - z * tiltSine;
    const depth = Math.max(0, Math.min(1, (pointY * tiltSine + z * tiltCosine + 1) / 2));

    context.globalAlpha = 0.1 + 0.8 * depth;
    context.fillStyle = isAccent ? '#ff3b12' : '#111110';
    context.beginPath();
    context.arc(centerX + x * radius, centerY - y * radius, 0.4 + 2.1 * depth, 0, Math.PI * 2);
    context.fill();
  }

  context.globalAlpha = 1;
};

const animate = () => {
  render();
  angle += 0.006;
  animationFrame = window.requestAnimationFrame(animate);
};

onMounted(() => {
  if (!container.value) return;

  resizeObserver = new ResizeObserver(render);
  resizeObserver.observe(container.value);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) render();
  else animate();
});

onBeforeUnmount(() => {
  if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
  resizeObserver?.disconnect();
});
</script>

<style scoped>
.dot-solid {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #e9e6df;
}

canvas {
  display: block;
}
</style>
