<script setup lang="ts">
import useAuth from '~/composables/auth'
import { useAuth0 } from '@auth0/auth0-vue'
import { Ref } from 'vue';
const response = ref()
const command = ref("")
const alien = ref(false)
var commands = ref([]) as Ref<string[]>

watchEffect(() => {
  if (command.value.includes("clear")) {
    commands.value = []
    command.value = ""
    response.value = []
  }
})

const { user, getAccessTokenSilently } = useAuth0()
const fetchApi = (e) => {
    commands.value = command.value.split(' ')
    const { data } = useAuth(getAccessTokenSilently)('/dev/' + commands.value.join("/")).json()
    response.value = data
    command.value = ""
}

</script>
<template>  <Alien @click="alien=!alien"  z-50 /> <label for="command"  >
    <nav z-50 font-6xl tl m-4 ml-16 fixed row v-if="alien" fade-in-down ><Ico icon="logos:html-5" x2  mx-4 scale cp /><Ico icon="logos:python" x2 text-white mx-4 scale cp/><Ico icon="logos:nodejs-icon" x2 mx-4 scale cp /><Ico icon="logos:bash-icon" x2  mx-4 scale cp /><Ico text-white icon="mdi-folder" x2  mx-4 scale cp /></nav>
        <section font-mono text-primary bl fixed bg-black cursor-text py-16 px-4 h-screen w-160>
          
            <div v-if="response" class="text-white" text-sm col start>
                <div v-for="item in unref(response) || []" :key="item">
                    {{ item.title }} - {{item.version}}
            </div>
            </div>

            <h1 row justify start mt-4 >
                {{ user.name }} :<span text-success> {{ command.split('/').join(' ') }} 
                    <strong class="blink">
                        |
                    </strong>

                    <input id="command" opacity-0 h-1 w-1 v-model="command" @keyup.enter="fetchApi"
                        @keyup.space="commands = command.split(' ')" />
                </span>
            </h1>

        </section>
    </label>
</template>
<style scoped>
.blink {
    animation: blink 1s linear infinite;

}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>