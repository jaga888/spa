<template>
  <div class="senex__body company-files">
    <div class="senex__form__header">Files</div>
    <div ref="dropRef" class="dropzone senex__files__zone senex__files__target" id="company-zone-files">
        <CloudUploadIcon />
        <br>
        Drop files here.
    </div>

    <div class="dropzone preview-container"></div>

    <div class="senex__list" id="company-files">
        <div class="senex__list__item" v-for="file in sortedFiles">
          <a target="_blank" :href="'/admin/files/' + file.uuid">
            <div class="senex__list__item-icon">
            </div>
            <div class="senex__list__item-title">
              {{ file.name }}
            </div>
            <div class="senex__list__item-subtitle">
              {{ file.description }}
            </div>
            <div class="senex__list__item-text">
              on {{ file.created_at }} by {{ file.creator.first_name }} {{ file.creator.last_name }}
            </div>
          </a>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCompanyStore} from "~/store/company";
import Dropzone from "dropzone";
import CloudUploadIcon from "~/components/icons/CloudUploadIcon.vue";
import {fileService} from "~/services/file/service";
import type {FileList} from "~/services/file/types";

const dropRef = ref(null)
const customPreview = `
  <div class="senex__template">
        <div class="senex__list__item">
          <a target="_blank" href='#'>
            <div class="senex__list__item-icon">
            </div>
            <div class="senex__list__item-title">
            </div>
            <div class="senex__list__item-subtitle">
            </div>
            <div class="senex__list__item-text">
            </div>
          </a>
        </div>
    </div>
`
const { token } = useAuth()
const config = useRuntimeConfig()
const {activeCompany} = storeToRefs(useCompanyStore())

onMounted(() => {
  if(dropRef.value !== null && token.value !== null && activeCompany.value) {
    new Dropzone(dropRef.value, {
      url: config.public.HOST_API + '/files/',
      headers: {
        Authorization: token.value
      },
      previewTemplate: customPreview,
      previewsContainer: dropRef.value.parentElement.querySelector('#company-files'),
      sending: (file, xhr, formData) => {
        formData.append("scoped_type", 'company');
        formData.append("scoped_id", activeCompany.value?.id + '');
      },
      addedfile: ({previewElement, type}) => {
        console.log('addedfile');
      },
      success: ({previewElement, xhr}) => {
        if (xhr) {
          let file = JSON.parse(xhr.response);

          files.value.push(file)
        }
      },
      error: ({previewElement}) => {
        console.log('error');
      },
    })

    if(dropRef.value.querySelector('.dz-default')) {
      dropRef.value.querySelector('.dz-default').innerHTML = ''
    }
  }
})

const files = ref<FileList[]>([])

const sortedFiles = computed(() => {
  return files.value.sort((firstFile, secondFile) => {
    console.log('firstFile', firstFile);
    console.log('secondFile', secondFile);
    if (firstFile.created_at < secondFile.created_at) {
      return 1;
    }
    if (firstFile.created_at > secondFile.created_at) {
      return -1;
    }

    return 0;
  })
})

if (activeCompany.value) {
  try {
    files.value = (await fileService.getFiles({
      // sort: '-created_at',
      'filter[scoped_id]': activeCompany.value?.id,
      'filter[scoped_type]': 'company'
    }))

    console.log(files.value)
  } catch (error) {
    console.log(error)
  }
}

const selectFile = () => {
  console.log(files);
  console.log(this);
};

</script>
