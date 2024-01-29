<template>
    <div>
      <p v-if="props.sectionFolder" @click="toggleSection" class="hover:cursor-pointer inline-block hover:text-stone-400 text-xl sm:text-2xl text-left font-semibold mb-2">
        {{ props.sectionFolder }}/
      </p>
      <div v-if="props.currentDirectory === props.sectionFolder" class="flex flex-col sm:border-l border-stone-400 py-2 mb-2">
        <ProjectEntry v-if="currentDirectory === 'education'" v-for="[edu, toggle] in Object.entries(eduRecord)" :project="edu" :toggleProject="toggleProject" :currentFile="props.currentFile" :currentDirectory="props.currentDirectory" :toggle="toggle" :key="edu" />
        <ProjectEntry v-else-if="currentDirectory === 'other'" v-for="[project, toggle] in Object.entries(otherRecord)" :project="project" :toggleProject="toggleProject" :currentFile="props.currentFile" :currentDirectory="props.currentDirectory" :toggle="toggle" :key="project" />
        <ProjectEntry v-else v-for="[other, toggle] in Object.entries(projectsRecord)" :project="other" :toggleProject="toggleProject" :currentFile="props.currentFile" :toggle="toggle" :key="other" :currentDirectory="props.currentDirectory"/>
        <GithubEntry v-if="currentDirectory === 'projects'"/>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits();
  
  const props = defineProps({
    currentDirectory: String,
    currentFile: String,
    showTQB: Boolean,
    showMinishell: Boolean,
    showIRC: Boolean,
    showTranscendence: Boolean,
    sectionFolder: String,
  });
  
  const projectsRecord: Record<string, string> = {
    'the-quest-board': 'showTQB',
    'minishell': 'showMinishell',
    'ft_irc': 'showIRC',
    'transcendence': 'showTranscendence',
  };

  const eduRecord: Record<string, string> = {
    '42 Paris': 'show42',
    'UVSQ': 'showUVSQ',
  };

  const otherRecord: Record<string, string> = {
    'Game Art': 'showAS'
  };
  
  const toggleSection = () => {
    if (props.currentDirectory === props.sectionFolder) {
      emit('updateCurrentDirectory', '');
    } else {
      emit('updateCurrentDirectory', props.sectionFolder);
    }
    emit('updateFile', '')
  };
  
  const toggleProject = (project: string, toggle: string) => {
    if (toggle === 'showTQB') {
      emit('updateShowTQB', !props.showTQB);
    } else if (toggle === 'showMinishell') {
      emit('updateShowMinishell', !props.showMinishell);
    } else if (toggle === 'showIRC') {
      emit('updateShowIRC', !props.showIRC);
    } else if (toggle === 'showTranscendence') {
      emit('updateShowTranscendence', !props.showTranscendence);
    } else if (toggle === 'show42') {
      window.open('https://42.fr/le-programme/methode-travail/', '_blank') 
    } else if (toggle === 'showUVSQ') {
      window.open('https://www.uvsq.fr/but-genie-electrique-et-informatique-industrielle-geii', '_blank')
    } else if (toggle === 'showAS') {
      window.open('https://artstation.com/djbrl', '_blank')
    } else {
      return;
    }
  
    if (props.currentFile === project) {
      emit('updateFile', '');
    } else {
      emit('updateFile', project);
    }
  };
  </script>
  