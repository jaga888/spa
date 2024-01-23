<template>
  <div class="high90__columns" data-high90-columns>
    <div id="senex-company-sidebar"
         class="high90__columns__column"
         data-high90-column="sidebar"
         data-high90-column-width="1">
      <Sidebar @chosen-company="companyAssign"/>
    </div>

    <div id="senex-company-content"
         class="high90__columns__column"
         data-high90-column="content"
         data-high90-column-width="1">
      <Content :activeCompanyId="activeCompanyId"/>
    </div>

    <div id="senex-company-inspector"
         class="high90__columns__column"
         data-high90-column="inspector"
         data-high90-column-width="1">
    </div>

    <div id="senex-property-inspector"
         class="high90__columns__column"
         data-high90-column="inspector"
         data-high90-column-width="1"
         style="display: none">
    </div>
    <div id="senex-user-inspector"
         class="high90__columns__column"
         data-high90-column="inspector"
         data-high90-column-width="1"
         style="display: none">
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "~/components/clients/Sidebar.vue";
import Content from "~/components/clients/Content.vue";
import { defineProps, ref, watch } from 'vue';

definePageMeta({
  layout: 'default',
});

// const props = defineProps({
//   companyId: {
//     default: 0,
//     type: Number,
//   },
// });

const activeCompanyId = ref(0);


const companyAssign = (id: number) => {
  activeCompanyId.value = id;
}
</script>
