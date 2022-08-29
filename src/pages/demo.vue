<script setup lang="ts">
import { Ref } from 'vue';
const fileUrls: Ref<any[]> = ref([])
const handleUpload = (payload: any) => {
    fileUrls.value.push(payload)
}
</script>

<template>
    <Upload @upload="handleUpload" />
    <div grid3>
    <div v-for="fileUrl in fileUrls" >
        <img :src="unref(fileUrl)" />
    </div>
</div>
</template>