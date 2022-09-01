
<script setup lang="ts">
  const el = ref<HTMLElement | null>(null)
const { style } = useDraggable(el, {
    initialValue: { x: 660, y: 500 },
})
import { useAuth0 } from '@auth0/auth0-vue';
import { Ref } from 'vue';
const files = ref([]) as Ref<File[]>;
const filesPreview = ref([]) as Ref<any[]>;
const { getAccessTokenSilently, isAuthenticated } = useAuth0();
const timeout = ref(7);
const _show = ref(false);
const emit = defineEmits(['upload']);
const urls = ref([])
const onFileChange = (e: any) => {
  files.value = Array.from(e.target.files);
  files.value.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      filesPreview.value.push(
        {
          name: file.name,
          size: file.size,
          type: file.type,
          src: reader.result,
        },
      );
    };
    reader.readAsDataURL(file);
  });
};
const onSubmit = async (e: any) => {
  e.preventDefault();
  files.value.forEach(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = useFetch('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    }).json()
    urls.value = response.data as any;
    _show.value = true;
    emit('upload', urls.value);
    filesPreview.value = [];

  });
};
const onDragOver = (e: any) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
};
const onDragLeave = (e: any) => {
  e.preventDefault();
};
const onDrop = (e: any) => {
  e.preventDefault();
  files.value = Array.from(e.dataTransfer.files);
  files.value.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      filesPreview.value.push(
        {
          name: file.name,
          size: file.size,
          type: file.type,
          src: reader.result,
        },
      );
    };
    reader.readAsDataURL(file);
  });
};
</script>
<template>
    <div p-4 bg-gray-500 z-50 r shadow-success shadow-md cursor-move ref="el" :style="style" style="position: fixed;">
  <div v-if="isAuthenticated">
    <div>
      <form @submit.prevent="onSubmit">
        <div row>
          <label @dragover.prevent="onDragOver" row center cp hover:underline r bg-success dark:bg-green-500 pl-4 @dragleave.prevent="onDragLeave" @drop.prevent="onDrop" for="files">{{
              filesPreview.length > 0 ? files.reduce((acc, file) => acc + file.size / 1024, 0).toFixed(2) +
                ' KB' :
                'Upload files'
          }}
            <input type="file" id="files" hidden @change="onFileChange" multiple accept="image/*" />
          <div v-if="filesPreview.length > 0" p-1 row center>
            <label for="submit" @click="onSubmit" btn-post mx-2>Submit</label>
            <input type="submit" id="submit" hidden  />
            <Ico icon="mdi-delete" @click="filesPreview = []" cp x1 scale text-warning hover:text-danger ml-2 mb-12 />
          </div>
          <div v-else class="p-4" row center>
            <Ico icon="mdi-upload" cp x1 scale text-info dark:text-white  />
          </div>
      
          </label>
        </div>
      </form>
      <div>
        <ul grid grid-cols-4>
          <li v-for="(file, index) in filesPreview" bg-transparent p-2 col center m-4 rounded-lg shadow>
            <button @click="filesPreview.splice(index, 1)">
              <Ico icon="mdi-delete" cp x1 scale hover:text-danger />
            </button>
            <img :src="file.src"  />
            <div text-xs font-sans>{{ file.name }}</div>
            <h2 text-xs font-serif>{{ (file.size / 1024).toFixed(2) }} KB</h2>
            <h3 text-xs font-mono>{{ file.type }}</h3>

          </li>
        </ul>
      </div>
    </div>
    <div v-if="_show">
    <Toast bg="success" toast="Files Uploaded successfully!" :timeout="timeout"  />
    </div></div>
    <div v-else>
      <div center>
        <Loading />
        </div>
    </div></div>
</template>