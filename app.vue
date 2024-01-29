<template>
  <div v-if="loading" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-stone-900">
    <div class="text-stone-200 text-center">
      <p @click="goHome" class="text-stone-200 hover:cursor-pointer hover:text-stone-400 transition duration-300 ease-in-out font-bold text-xl">
        ./djibril-sy/<span class="text-stone-500">portfolio</span><span class="text-stone-400 text-xl blinking-cursor">|</span>

      </p>
      <!-- Add your loading bar here -->
        <p class="text-stone-300 text-xs font-bold mt-4">{{ loadingPercentage.toFixed(1) }}%</p>
    </div>
  </div>
  <div v-else class="min-h-screen bg-stone-900 min-w-[412px]">
    <!-- Loading Screen -->
    <header class="w-full">
      <div class="flex">
        <p @click="goHome" class="pl-4 sm:pl-16 text-stone-200 hover:cursor-pointer hover:text-stone-400 transition duration-300 ease-in-out font-bold text-xl pt-2">
          ./djibril-sy/
        </p>
        <div class="group flex hover:cursor-default">
          <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <p v-if="currentDirectory === 'projects'" class="opacity-0 group-hover:opacity-50 text-stone-200 transition-opacity duration-300 ease-in-out font-semibold text-xl pt-2">{{ currentDirectory }}/{{ currentFile }}</p>
            <p v-else-if="currentDirectory === 'education'" class="opacity-0 group-hover:opacity-50 text-stone-200 transition-opacity duration-300 ease-in-out font-semibold text-xl pt-2">{{ currentDirectory }}/{{ currentFile }}</p>
            <p v-else-if="currentDirectory === 'other'" class="opacity-0 group-hover:opacity-50 text-stone-200 transition-opacity duration-300 ease-in-out font-semibold text-xl pt-2">{{ currentDirectory }}/{{ currentFile }}</p>
            <p v-else class="opacity-0 group-hover:opacity-50 text-stone-200 transition-opacity duration-300 ease-in-out font-semibold text-xl pt-2"></p>
          </transition>
          <span class="text-stone-400 text-xl blinking-cursor pt-[7px]">|</span>
        </div>
      </div>
      <div class="border-b border-stone-700 hover:cursor-default">
        <p @click="goHome" class="pl-4 sm:pl-16 text-stone-400 transition duration-300 ease-in-out text-xs pt-1 pb-2">
          <span class="hover:text-stone-300 transition duration-300 ease-in-out">Full-Stack Web Developer</span>
          <br>
          <span class="hover:text-stone-300 transition duration-300 ease-in-out">SWE Student @ 42 Paris</span>
          <br>
          <span class="hover:text-stone-300 transition duration-300 ease-in-out">UVSQ Bachelor Graduate</span>
        </p>
      </div>
    </header>
    
    <main class="overflow-y-auto">
    <!-- main container -->
      <div class="md:flex max-h-[1000px]">
        <section class="md:w-2/5 max-w-[400px] py-10 pl-5 pr-5 sm:pr-0">
          <AboutMe/>
        </section>
        <section class="w-full py-10 px-5">
          <ProjectsWindow v-model:showTQB="showTQB" v-model:currentDirectory="currentDirectory" v-model:currentFile="currentFile" v-model:showProjects="showProjects" v-model:showEdu="showEdu" v-model:showOther="showOther" v-model:showIRC="showIRC" v-model:showMinishell="showMinishell" v-model:showTranscendence="showTranscendence"/>
        </section>
      </div>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const currentFile = ref('');
const currentDirectory = ref('');
const showProjects = ref(false);
const showEdu = ref(false);
const showTQB = ref(false);
const showOther = ref(false);
const showMinishell = ref(false);
const showIRC = ref(false);
const showTranscendence = ref(false);
const loading = ref(true);
const loadingPercentage = ref(0);

const goHome = () => {
  window.location.href = 'http://localhost:3000';
};

const beforeEnter = (el: any) => {
  el.style.opacity = '0';
};

const enter = (el: any, done: any) => {
  el.offsetHeight;
  el.style.transition = 'opacity 400ms ease-in-out';
  el.style.opacity = '0.5';
  done();
};

const leave = (el: any, done: any) => {
  el.offsetHeight;
  el.style.transition = 'opacity 400ms ease-in-out';
  el.style.opacity = '0';

  done();
};


onMounted(() => {
  const interval = setInterval(() => {
    loadingPercentage.value += Math.random() * 5;
    if (loadingPercentage.value >= 100) {
      loadingPercentage.value = 100;
      loading.value = false;
      clearInterval(interval);
    }
  }, 90 + 10 * Math.random());
});
</script>


<style>
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .blinking-cursor {
    animation: blink 1s infinite;
  }
</style>
