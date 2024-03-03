<template>
  <DropzoneComponent :files="files"
    :id="activeCompany?.id"
    :entity="'company'" />
</template>

<script setup lang="ts">
import DropzoneComponent from "~/components/clients/inspector/company/DropzoneComponent.vue";
import type {FileList} from "~/services/file/types";
import {fileService} from "~/services/file/service";
import {useCompanyStore} from "~/store/company";

const files = ref<FileList[]>([]);
const {activeCompany} = storeToRefs(useCompanyStore());

if (activeCompany.value) {
  try {
    files.value = (await fileService.getFiles({
      "filter[scoped_id]": activeCompany.value?.id,
      "filter[scoped_type]": "company"
    }));

    console.log(files.value);
  } catch (error) {
    console.log(error);
  }
}
</script>
