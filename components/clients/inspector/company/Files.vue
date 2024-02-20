<template>
  <div class="senex__body company-files" v-if="activeTab === activeTabFiles">
    <div class="senex__form__header">Files</div>
    <div class="senex__files__zone senex__files__target" id="company-zone-files">

<!--      <input multiple type="file" @change="selectFile">-->
      <i class="fa fa-cloud-upload fa-2x"></i>
      Drop files here.
    </div>

    <div class="senex__list" id="company-files">

    </div>
    <div class="senex__template" id="custom-template-company" style="display: none">
      <div class="senex__list__item">
        <a target="_blank" href='#'>
          <div class="senex__list__item-icon">
          </div>
          <div class="senex__list__item-title" data-dz-name>
          </div>
          <div class="senex__list__item-subtitle">
          </div>
          <div class="senex__list__item-text">
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCompanyStore} from "~/store/company";

const {activeTab} = storeToRefs(useCompanyStore())

const activeTabFiles: string = 'files'

const selectFile = () => {
  console.log(1);
}

</script>
