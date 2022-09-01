<script setup lang="ts">
const name = ref("")
const email = ref("")
const message = ref("")
const _show = ref(false)
const toast = ref()
const onSubmit = () => {
    const { data } = useFetch("/api/contact?name=" + name.value + "&email=" + email.value + "&message=" + message.value)
    toast.value = data
    _show.value = true
}
</script>
<template>
    
    <div col center font-mono font-bold w-72 mt-16 m-auto bg-gray-200 p-8 rounded-lg shadow-accent shadow-md>
        <label for="contact-name" text-accent my-2>Name</label>
        <input id="contact-name" type="text" v-model="name" text-center bg-success rounded-lg p-1 text-accent no-outline
            w-full my-2 />
        <label for=" contact-email" text-accent my-2>Email</label>
        <input type="email" v-model="email" text-center bg-success rounded-lg p-1 text-accent w-full my-2 />
        <label for="contact-message" text-accent my-2>Message
        </label> <textarea rows="4" v-model="message" text-center bg-success rounded-lg p-1 text-accent w-full my-2 />
        <button @click.prevent="onSubmit" btn-post>Submit</button>
    </div>

    <Toast bg="success" toast="Email sent successfully!" :timeout="7" v-if="_show" />
</template>