<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { useStore } from "~/store";
import { Ref } from 'vue'

const {
    user,
    getAccessTokenSilently,
    isAuthenticated,
    loginWithRedirect,
    logout
} = useAuth0();

const { setUser, setToken } = useStore();
const payload = ref(null) as Ref<any>
const toggle = ref(false);

onMounted(async () => {
    if (isAuthenticated) {
        const token = await getAccessTokenSilently()
        setToken(token);
        const { data } = useFetch('/api/authorize', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        payload.value = unref(data);
        setUser(user.value);
    }
}
);
</script>
<template>
    <div v-if="!isAuthenticated">
        <Ico icon="mdi-account-circle" @click="loginWithRedirect()" cp x2 m-2 />
    </div>
    <div v-else>
        <div col center>
            <img :src="user.picture" avatar rf cp @click="toggle = !toggle" m-2 :class="toggle ? 'x6' : 'x2'" />
        </div>
        <RouterLink to="/" title="Chat">
            <Ico icon="mdi-chat-outline" br fixed v-if="toggle" text-secondary dark:text-primary text-2xl mb-40 mr-4 cp
                scale fade-in-right title="Chat" />
        </RouterLink>
        <RouterLink m-4 to="/profile" title="Profile">
            <Ico icon="mdi-account-circle" br fixed v-if="toggle" text-secondary dark:text-primary text-2xl mb-32 mr-4
                cp scale fade-in-right title="Profile"
                
                />
        </RouterLink>
        <RouterLink to="/" title="Logout">
            <Ico icon="mdi-logout" br fixed v-if="toggle" text-red-500 text-2xl mb-6 mr-4 cp scale fade-in-up
                title="Logout" @click="logout()" />
        </RouterLink>
    </div>
</template>