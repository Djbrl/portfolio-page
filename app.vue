<template>
  <div class="min-h-screen bg-stone-900 min-w-[412px]">
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
          <span class="text-stone-400 text-xl  blinking-cursor pt-[7px]">|</span>
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
const currentFile = ref('')
const currentDirectory = ref('')
const showProjects = ref(false)
const showEdu = ref(false)
const showTQB = ref(false)
const showOther = ref(false)
const showMinishell = ref(false)
const showIRC = ref(false)
const showTranscendence = ref(false)

const goHome = () => {
  window.location.href = 'http://localhost:3000'
}

const beforeEnter = (el:any) => {
  el.style.opacity = '0';
};

const enter = (el:any, done:any) => {
  el.offsetHeight; // trigger reflow
  el.style.transition = 'opacity 300ms';
  el.style.opacity = '0.5';
  done();
};

const leave = (el:any, done:any) => {
  el.offsetHeight; // trigger reflow

  el.style.transition = 'opacity 300ms';
  el.style.opacity = '0';
  done();
};

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