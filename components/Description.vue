<template>
    <div class="h-full bg-stone-950 rounded-lg p-4">
        <p class="ml-2 text-xl sm:text-3xl text-left font-semibold">{{ props.description.name }}</p>
        <div class="text-xs text-stone-400 text-left m-2">
            <p>Last updated : {{ props.description.last_updated }}</p>
            <p>Start Date : {{ props.description.start_date }}</p>
            <p>Contributors : {{ props.description.contributors }}</p>
        </div>
        <div class="flex items-center my-4 mx-2 text-xs">
            <div class="flex items-center justify-center my-auto w-36 h-36 h-full border border-stone-400">
            <p class="text-center py-1"><a :href="props.description.github_link" target="_blank">View on Github</a></p>
            </div>
        </div>
        <div class="group">
            <div class="m-2 flex p-5 overflow-x-auto border border-stone-400">
                <div v-if="props.description.screenshot_one !== ''">
                    <img class="max-w-[250px] border border-stone-400 max-h-[150px] min-w-[250px] min-h-[150px] mr-2" :src=props.description.screenshot_one>
                </div>
                <div v-else class="max-w-[250px] border border-stone-400 items-center flex text-xs max-h-[150px] min-w-[250px] min-h-[150px] mr-2">
                    <div class="mx-auto">
                        <p>Screenshot unavailable.</p>
                    </div>
                </div>
                <div v-if="props.description.screenshot_two !== ''">
                    <img class="max-w-[250px] border border-stone-400 max-h-[150px] min-w-[250px] min-h-[150px] mr-2" :src=props.description.screenshot_two>
                </div>
            </div>
            <p class="m-2 text-stone-900 group-hover:text-stone-200 transition duration 500ms ease-in-out text-xs text-center">Use your Left and Right Arrow Keys to scroll</p>
        </div>
        <p class="my-auto text-sm mb-4 mt-2 mx-2">
            {{ props.description.summary }}
        </p>
        <p class="font-bold text-sm m-2">Stack</p>
        <div class="flex flex-wrap m-2 text-sm">
            <p class="px-2 py-1 bg-black/30 mr-2 mb-2">NestJS</p>
            <p class="px-2 py-1 bg-black/30 mr-2 mb-2">Typescript</p>
            <p class="px-2 py-1 bg-black/30 mr-2 mb-2">PostgreSQL</p>
            <p class="px-2 py-1 bg-black/30 mr-2 mb-2">Prisma</p>
            <p class="px-2 py-1 bg-black/30 mr-2 mb-2">Vue.js</p>
            <p class="px-2 py-1 bg-black/30 mr-2 mb-2">TailwindCSS</p>
            <p class="px-2 py-1 bg-black/30 mr-2 mb-2">Docker</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props:any = defineProps({
    description: Object
})

</script>