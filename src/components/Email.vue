<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { useAuth } from "~/composables/auth";
const { user, getAccessTokenSilently } = useAuth0();
const addAccount = () => {
    alert("foo")
}
</script>
<template>
    <div row start hover:underline cp>
        <div row center mt-8 text-xs @click="addAccount">
            <Ico icon="mdi-email"  cp x2 m-2 text-lg />Register in Ngage
        </div>
    </div>

</template>