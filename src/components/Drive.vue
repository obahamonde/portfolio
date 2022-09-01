<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import useAuth from '~/composables/auth'
import { Ref } from 'vue';
const uploads: Ref<any[]> = ref([])
const { getAccessTokenSilently, isAuthenticated } = useAuth0();
const { isFetching, data, error } = useAuth(getAccessTokenSilently)('/upload').json()

watchEffect(() => {
    uploads.value = unref(data)
})

const handleUpload = () => {
    const { data } = useAuth(getAccessTokenSilently)('/upload').json()
    uploads.value = unref(data)
}

const deleteUpload = async (id: string) => {
    useAuth(getAccessTokenSilently)('/upload/' + id, {
        method: 'DELETE'
    }).json()
    uploads.value.splice(uploads.value.findIndex((upload: any) => upload.id === id), 1)
}

</script>

<template>
    <div v-if="isAuthenticated">
        <Upload @upload="handleUpload" />
        <section>
            <div v-if="isFetching">
                <Loading />
            </div>
            <div v-else-if="error">
                <p>{{ error }}</p>
            </div>
            <div v-else-if="!uploads">
                <p>No uploads</p>
            </div>
            <div v-else grid4 mt-8>
                <div v-for="upload in uploads">
                    <a :href="upload.url" col center>
                        <p text-xs row >{{ upload.filename }}  <Ico m-1 icon="mdi-delete"
                            @click.prevent="deleteUpload(upload.id)"/></p>
                      <Ico icon="mdi-file" x4 />
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>