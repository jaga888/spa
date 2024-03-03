<template>
  <div class="senex__list__item">
    <a target="_blank" :href="'/admin/files/' + file.uuid">
      <div class="senex__list__item-icon">
        <component :is="icon.name"
                   :currentColor="icon.color"
                   :width="icon.width"
                   :height="icon.height"
                   style="margin-top: 5px"/>
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
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {FileList} from "~/services/file/types";
import WordIcon from "~/components/icons/File/WordIcon.vue";
import ExcelIcon from "~/components/icons/File/ExcelIcon.vue";
import TextIcon from "~/components/icons/File/TextIcon.vue";
import PictureIcon from "~/components/icons/File/PictureIcon.vue";
import PDFIcon from "~/components/icons/File/PDFIcon.vue";
import ArchiveIcon from "~/components/icons/File/ArchiveIcon.vue";
import FileIcon from "~/components/icons/File/FileIcon.vue";

const props = defineProps({
  file: {
    type: Object as PropType<FileList>,
    default: <FileList>{}
  },
});

const icon = computed(() => {
  switch (props.file.mime_type) {
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":

      return {
        name: WordIcon,
        color: "#3498db",
        width: "2em",
        height: "2.25em",
      };
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":

      return {
        name: ExcelIcon,
        color: "#3498db",
        width: "2em",
        height: "2.25em",
      };
    case "text/csv":
    case "text/plain":
    case "text/markdown":

      return {
        name: TextIcon,
        color: "#3498db",
        width: "2.25em",
        height: "2.25em",
      };
    case "image/bmp":
    case "image/jpeg":
    case "image/png":
    case "image/gif":
    case "image/tiff":

      return {
        name: PictureIcon,
        color: "#3498db",
        width: "2em",
        height: "2.25em",
      };
    case "application/pdf":

      return {
        name: PDFIcon,
        color: "#3498db",
        width: "2.25em",
        height: "2.5em",
      };
    case "application/zip":
    case "application/x-7z-compressed":
    case "application/vnd.rar":

      return {
        name: ArchiveIcon,
        color: "#3498db",
        width: "2.25em",
        height: "2.25em",
      };
    default:

      return {
        name: FileIcon,
        color: "#3498db",
        width: "2.5em",
        height: "2.5em",
      };
  }
});
</script>
