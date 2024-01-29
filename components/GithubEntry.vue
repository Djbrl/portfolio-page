<template>
    <p @click="goGithub" class="ml-1 sm:ml-5 inline-block text-stone-200 hover:cursor-pointer transition duration-300 ease-in-out font-semibold text-xs sm:text-xl pb-2">
        <div class="group">
            <p class="flex my-auto">
                <span><span class="text-stone-700 transition duration-300 ease-in-out group-hover:text-stone-200 mr-1">+</span></span>
                <a class="my-auto w-4 h-4 sm:w-5 sm:h-5" href="https://www.github.com/djbrl" target="_blank" rel="noreferrer">
                    <picture>
                        <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github-dark.svg" />
                        <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg" />
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg" width="32" height="32" />
                    </picture>
                </a>
                <span class="mx-1 hidden group-hover:inline-block">&#8599;</span>
            </p>
        </div>
    </p>
</template>

<script setup lang="ts">
    const goGithub = () => {
        window.open('https://github.com/djbrl', '_blank')
    }
</script>