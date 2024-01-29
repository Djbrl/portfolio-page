<template>
    <p
        v-if="props.project?.length > 1"
        @click="props.toggleProject(props.project, props.toggle)"
        class="sm:ml-4 mb-1 inline-block text-stone-200 hover:cursor-pointer hover:text-stone-300 transition duration-300 ease-in-out font-semibold text-xs my-1 sm:my-0 md:text-sm lg:text-xl"
    >
        <span v-if="props.currentFile === props.project" class="pl-1 pr-2 py-1">
            <span class="text-stone-200">
                +
            </span>
            {{ props.project }}
        </span>
        <div v-else class="group">
            <span class="pl-1 pr-2 pb-1">
                <span class="text-stone-700 group-hover:text-stone-200">
                    +
                </span>
                {{ props.project }}
                <span v-if="currentDirectory === 'education' || currentDirectory === 'other'" class="mx-1 hidden group-hover:inline-block">
                    &#8599;
                </span>
            </span>
        </div>
    </p>
</template>

<script setup lang="ts">
    const props:any = defineProps({
        toggleProject: Function,
        project: String,
        toggle: String,
        currentFile: String,
        currentDirectory: String,
    })
</script>