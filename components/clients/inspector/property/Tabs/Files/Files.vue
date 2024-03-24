<template>
  <DropzoneComponent :files="files"
    :id="activeProperty?.id"
    :entity="'property'" />
</template>

<script setup lang="ts">
import DropzoneComponent from "~/components/clients/inspector/DropzoneComponent.vue";
import type {FileList} from "~/services/file/types";
import {fileService} from "~/services/file/service";
import {usePropertyStore} from "~/store/property";

const files = ref<FileList[]>([]);
const {activeProperty} = storeToRefs(usePropertyStore());

if (activeProperty.value) {
  try {
    files.value = (await fileService.getFiles({
      "filter[scoped_id]": activeProperty.value?.id,
      "filter[scoped_type]": "property"
    }));

    console.log(files.value);
  } catch (error) {
    console.log(error);
  }
}
</script>
