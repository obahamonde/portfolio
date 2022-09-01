<script setup lang="ts">
const foo = ref(0)
</script>
<template>
    <div>
        <p>{{ foo }}</p>
        <Ico icon="mdi-plus" @click="foo++" />
    </div>
</template>