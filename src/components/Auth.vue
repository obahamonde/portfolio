<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { useStore } from "~/store";

const {
    user,
    getAccessTokenSilently,
    isAuthenticated,
    loginWithRedirect,
    logout
} = useAuth0();

const { setUser, setToken } = useStore();

const router = useRouter();
const $isFetching = ref(false);
const $error = ref(null);
const $data = ref();
const toggle = ref(false);

onMounted(async () => {
    if (isAuthenticated) {
        const token_ = await getAccessTokenSilently()
        const { isFetching, error, data } = useFetch('/api/authorize', {
            headers: {
                Authorization: `Bearer ${token_}`,
            },
        });
        $isFetching.value = unref(isFetching);
        $error.value = unref(error);
        $data.value = unref(data);
        setUser(user.value);
        setToken(token_);
        router.beforeEach(
            async (to, from, next) => {
                from.query.token = token_;
                to.query.token = token_;
                next();
            }

        );
    }

}
);
const useChat = ()=>{
    console.log("Todo: useChat")
}


</script>



<template>
    <div v-if="!isAuthenticated">
        <Ico icon="mdi-account-circle" @click="loginWithRedirect()" cp x2 m-2 />
    </div>
    <div v-else>
        <div v-if="$error">
            <p>{{ $error }}</p>
        </div>
        <div v-else-if="$isFetching">
            <Loading />
        </div>
        <div v-else col center>
          
                <img :src="user.picture" avatar rf cp @click="toggle = !toggle" m-2 :class="toggle ? 'x6' : 'x2'" />
         
        </div>
        <RouterLink to="/" title="Chat">
        <Ico icon="mdi-chat-outline" br fixed v-if="toggle" text-secondary dark:text-primary text-2xl mb-40 mr-4 cp scale fade-in-right title="Chat" @click="useChat" />
        </RouterLink>
        <RouterLink m-4 to="/profile" title="Profile">
       <Ico icon="mdi-account-circle" br fixed v-if="toggle" text-secondary dark:text-primary text-2xl mb-32 mr-4 cp scale fade-in-right title="Profile" /> 
       </RouterLink>
       <RouterLink to="/" title="Logout">
       <Ico icon="mdi-logout" br fixed v-if="toggle" text-red-500 text-2xl mb-6 mr-4 cp scale fade-in-up title="Logout" @click="logout()" />
         </RouterLink>
    </div>



</template>