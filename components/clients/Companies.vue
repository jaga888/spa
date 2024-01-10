<template>
  <div id="companies-wrapper" class="senex__list senex__list--selectable" data-company-id="">
    <div
        v-for="company in companies"
        class="senex__list__item senex__list__item--company senex__files__target company-wrapper"
        data-company-id="808"
        data-company-name="AAA12"
    >
      <div class="senex__list__item-title">AAA12</div>
      <div class="senex__list__item-subtitle">Legal Name</div>
      <div class="senex__list__item-text"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const companies = ref([]);

</script>
