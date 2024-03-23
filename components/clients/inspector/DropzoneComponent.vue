<template>
  <div class="senex__body entity-files">
    <div class="senex__form__header">Files</div>
    <div ref="dropRef" class="dropzone senex__files__zone senex__files__target" :id="props.entity + '-zone-files'">
      <CloudUploadIcon/>
      <br>
      Drop files here.
    </div>

    <div class="dropzone preview-container"></div>

    <div class="senex__list" :id="props.entity + '-files'">
      <p v-if="!files.length">No attachments</p>
      <File v-for="file in sortedFiles" :file="file"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropzone from "dropzone";
import CloudUploadIcon from "~/components/icons/CloudUploadIcon.vue";
import type {FileList} from "~/services/file/types";
import File from "./File.vue";

const props = defineProps({
  files: {
    type: Array<FileList>,
    default: []
  },
  id: {
    type: Number,
    default: 0
  },
  entity: {
    type: String,
    default: "company"
  },
});

const dropRef = ref<HTMLDivElement>(<HTMLDivElement>{});
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
`;
const {token} = useAuth();
const config = useRuntimeConfig();

onMounted(() => {
  if (token.value !== null) {
    new Dropzone(dropRef.value, {
      url: config.public.HOST_API + "/files/",
      headers: {
        Authorization: token.value
      },
      previewTemplate: customPreview,
      previewsContainer: dropRef.value.parentElement?.querySelector("#" + props.entity + "-files"),
      sending: (file, xhr, formData) => {
        formData.append("scoped_type", props.entity);
        formData.append("scoped_id", props.id + "");
      },
      addedfile: () => {
        console.log("addedfile");
      },
      success: ({xhr}) => {
        if (xhr) {
          let file = JSON.parse(xhr.response);

          props.files.push(file);
        }
      },
      error: () => {
        console.log("error");
      },
    });

    if (dropRef.value.querySelector(".dz-default")) {
      dropRef.value.querySelector(".dz-default").innerHTML = "";
    }
  }
});

const sortedFiles = computed(() => {
  return props.files.sort((firstFile, secondFile) => {
    if (firstFile.created_at < secondFile.created_at) {
      return 1;
    }
    if (firstFile.created_at > secondFile.created_at) {
      return -1;
    }

    return 0;
  });
});
</script>

<style>
#company-zone-files {
  cursor: pointer;
}
#property-zone-files {
  cursor: pointer;
}
</style>
