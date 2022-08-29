<script setup lang="ts">
import { Ref } from 'vue';
const fileUrls: Ref<any[]> = ref([])
const handleUpload = (payload: any) => {
    fileUrls.value.push(payload)
}
</script>

<template>
    <Upload @upload="handleUpload" />
    <div grid3 v-if="unref(fileUrls).length>0">
    <div v-for="fileUrl in unref(fileUrls)" >
        <img :src="fileUrl" />
    </div>
</div>
</template>