<template>
  <!-- Copies the address instead of opening a mail app; the tooltip says what a click does, then confirms it. -->
  <button class="copy-email" :class="{ copied }" type="button" :aria-label="`${email} — ${copyLabel}`" @click="copy" @mouseleave="reset" @blur="reset">
    <slot>{{ email }}</slot>
    <span class="copy-email-tip" aria-hidden="true">{{ copied ? copiedLabel : copyLabel }}</span>
    <span class="sr-only" role="status">{{ copied ? copiedLabel : '' }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ email: string; copyLabel: string; copiedLabel: string }>();

const copied = ref(false);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

const writeToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // Older browsers, or a page without clipboard permission: fall back to a hidden selection.
  }
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.append(field);
  field.select();
  document.execCommand('copy');
  field.remove();
};

const copy = async () => {
  await writeToClipboard(props.email);
  copied.value = true;
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => { copied.value = false; }, 1800);
};

// Leaving the button returns the tooltip to "copy" for the next hover.
const reset = () => {
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => { copied.value = false; }, 250);
};

onBeforeUnmount(() => clearTimeout(resetTimer));
</script>

<style>
.copy-email {
  position:relative;
  display:inline-flex;
  align-items:center;
  gap:inherit;
  padding:0;
  border:0;
  background:none;
  color:inherit;
  font:inherit;
  letter-spacing:inherit;
  text-align:inherit;
  text-transform:inherit;
  cursor:pointer;
}

.copy-email-tip {
  position:absolute;
  bottom:calc(100% + 9px);
  left:50%;
  z-index:5;
  padding:6px 9px;
  border-radius:7px;
  background:var(--ink);
  color:var(--page);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:-.005em;
  line-height:1;
  text-transform:none;
  white-space:nowrap;
  opacity:0;
  pointer-events:none;
  transform:translate(-50%,4px);
  transition:opacity .16s ease,transform .16s ease;
}

.copy-email-tip::after {
  position:absolute;
  top:100%;
  left:50%;
  border:5px solid transparent;
  border-top-color:var(--ink);
  content:'';
  transform:translateX(-50%);
}

.copy-email:hover .copy-email-tip,
.copy-email:focus-visible .copy-email-tip,
.copy-email.copied .copy-email-tip {
  opacity:1;
  transform:translate(-50%,0);
}

@media (prefers-reduced-motion:reduce) {
  .copy-email-tip {
    transition:none;
  }
}
</style>
