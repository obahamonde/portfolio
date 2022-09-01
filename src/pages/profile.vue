<script setup lang="ts">
import useAuth from '~/composables/auth';
import { useAuth0 } from '@auth0/auth0-vue';
const { getAccessTokenSilently } = useAuth0();
const url = ref('login')
const { isFetching, error, data } = useAuth(getAccessTokenSilently)(url).json()
</script>

<template>
    <div v-if="data" col center>
        <img :src="data.picture" x8 rf mt-16 />
        <h1>{{data.nickname || data.name}}</h1>
        <p>{{data.email}}</p>
    </div>
    <div v-else-if="error">
        <p>{{ error }}</p>
    </div>
    <div v-else-if="isFetching">
        <p>
            <Loading />
        </p>
    </div>
</template>