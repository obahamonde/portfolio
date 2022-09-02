<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import useAuth from '~/composables/auth'
const uploads = reactive([])
const { getAccessTokenSilently, isAuthenticated } = useAuth0();
const { isFetching, data, error } = useAuth(getAccessTokenSilently)('/upload').json()

watchEffect(() => {
    uploads.value = data
})

const upload = () => {
    const { data } = useAuth(getAccessTokenSilently)('/upload').json()
    return data
}

const handleUpload = ()=>{
    data.value = upload()
}


const deleteUpload = async (id: string) => {
    useAuth(getAccessTokenSilently)('/upload/' + id).json()
    uploads.value = uploads.value.filter((upload: any) => upload.id !== id)         
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
            <div v-else grid4 mt-8>
                <div v-for="upload in unref(uploads.value)">
                    <div col center>
                        <div row><a :href="upload.url" row>
                                <p text-xs>{{ upload.filename.length > 10 ? upload.filename.substring(0, 10):
                                        upload.filename
                                }} </p>
                            </a>
                            <Ico m-1 cp icon="mdi-delete"   @click="deleteUpload(upload.id)" />
                        </div>
                        <Ico icon="mdi-file" x4 />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>