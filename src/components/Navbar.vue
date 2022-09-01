<script setup lang="ts">
const links = ref([

    {
        text: 'Home',
        to: '/',
        icon: 'mdi-home',
    },  
    {
        text: 'About',
        to: '/about',
        icon: 'mdi-information',
    },
    {
        text: 'Contact',
        to: '/contact',
        icon: 'mdi-email',

    }
])

const now = ref(useNow())

</script>
<template>

   
<nav tr fixed w-auto row items-center justify-end pr-4 animate-slide-in-down backdrop-blur-lg text-black dark:text-white shadow-md shadow-info dark:shadow-light>
    <div v-for="link in links"  >
        <RouterLink :to="link.to" row center w-12 p-2 :title="link.text"  >
            <div>
                <Ico :icon="link.icon" aria-hidden="true"></Ico>
            </div>
        </RouterLink>
    </div>
    <button icon-btn @click="toggleDark()">
      <div dark:i-carbon-moon i-carbon-sun text-accent dark:text-primary ml-4 />
    </button>
</nav>
<h1 right-4 mt-1 font-mono font-extrabold fixed>{{now.toLocaleString()}}</h1>
</template>
<style scoped>
.router-link-active {
    @apply bg-primary dark:bg-accent;
    @apply shadow-md shadow-info dark:shadow-light r;
}
</style>