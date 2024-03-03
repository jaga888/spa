<template>
  <span class="pr-1">Export</span>
  <CaretDown />
  <ul class="senex__detail-menu__sub-menu">
    <li class="senex__detail-menu__sub-menu-item">
      <a href="#" target="_blank"><PrintIcon class="absolute left-2"/>Print</a>
    </li>
    <li class="senex__detail-menu__sub-menu-item">
      <a href="#"><PDFIcon :fill="'white'" class="absolute left-2"/>Save PDF</a>
    </li>
    <li class="senex__detail-menu__sub-menu-item">
      <a href="#"><CSVIcon class="absolute left-2"/>Save CSV</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import CaretDown from "~/components/icons/CaretDown.vue";
import PrintIcon from "~/components/icons/PrintIcon.vue";
import PDFIcon from "~/components/icons/File/PDFIcon.vue";
import CSVIcon from "~/components/icons/CSVIcon.vue";
</script>
