<template>
    <div class="h-[80vh] max-h-[800px] min-h-[300px] text-stone-100 md:flex md:justify-center">
      <div class="flex w-full h-full my-auto mx-auto border border-stone-700 rounded-lg">
        <div class="w-2/5 px-4 py-5 border-r border-stone-700">
          <SectionFolder
            v-for="section in sections"
            :sectionFolder="section"
            :currentDirectory="props.currentDirectory"
            :currentFile="props.currentFile"
            :showTQB="props.showTQB"
            :showMinishell="props.showMinishell"
            :showIRC="props.showIRC"
            :showTranscendence="props.showTranscendence"
            @updateCurrentDirectory="updateCurrentDirectory"
            @updateFile="updateFile"
            @updateShowTQB="updateShowTQB"
            @updateShowMinishell="updateShowMinishell"
            @updateShowIRC="updateShowIRC"
            @updateShowTranscendence="updateShowTranscendence"
          />
        </div>
        <div class="w-3/5 overflow-y-auto flex items-center">
          <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div :key="props.currentFile" v-if="props.currentFile !== '' && descriptions && descriptions[props.currentFile]" class="p-5 h-full mx-auto transition-opacity duration-300 ease-in-out">
              <Description :description="descriptions[props.currentFile]"/>
            </div>
            <div v-else class="p-5 mx-auto transition-opacity duration-300 ease-in-out">
                <p class="text-center rounded-lg p-3 bg-stone-800 text-xs">No file selected.</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

    const props:any = defineProps({
      showProjects: Boolean,
      showEdu: Boolean,
      showTQB: Boolean,
      showOther: Boolean,
      showMinishell: Boolean,
      showIRC: Boolean,
      showTranscendence: Boolean,
    
      currentDirectory: String,
      currentFile: String,
    });
    
    const descriptions = ref()
    const sections = ['projects', 'education', 'other'];
    const beforeEnter = (el:any) => {
      el.style.opacity = '0';
    };
    
    onBeforeMount(async () => {
      try {
        const response = await fetch('/descriptions.json'); // Replace with the correct path
        descriptions.value = await response.json();
      } catch (error) {
        console.error('Error reading descriptions:', error);
      }
    });

    const enter = (el:any, done:any) => {
      el.offsetHeight; // trigger reflow
      el.style.transition = 'opacity 300ms';
      el.style.opacity = '1';
      done();
    };
    
    const leave = (el:any, done:any) => {
      el.offsetHeight; // trigger reflow
    
      el.style.transition = 'opacity 300ms';
      el.style.opacity = '0';
      done();
    };
    
    const emit = defineEmits()

    const updateCurrentDirectory = (value: string) => {
      emit('update:currentDirectory', value);
    };
    
    const updateFile = (value: string) => {
      emit('update:currentFile', value);
    };

    const updateShowTQB = (value: boolean) => {
      emit('update:showTQB', value);
    };
    
    const updateShowMinishell = (value: boolean) => {
      emit('update:showMinishell', value);
    };
    
    const updateShowIRC = (value: boolean) => {
      emit('update:showIRC', value);
    };
    
    const updateShowTranscendence = (value: boolean) => {
      emit('update:showTranscendence', value);
    };

  </script>
  