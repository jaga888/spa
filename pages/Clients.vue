<template>
  <div class="high90__columns" data-high90-columns>
    <div id="senex-company-sidebar"
         class="high90__columns__column"
         data-high90-column="sidebar"
         data-high90-column-width="1">
      <Sidebar />
    </div>

    <div id="senex-company-content"
         class="high90__columns__column"
         data-high90-column="content"
         data-high90-column-width="1">
      <Content />
    </div>

    <div id="senex-company-inspector"
         class="high90__columns__column"
         data-high90-column="inspector"
         data-high90-column-width="1">
      <CompanyInspector />
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
import Sidebar from "~/components/clients/sidebar/Sidebar.vue";
import Content from "~/components/clients/content/Content.vue";
import CompanyInspector from "~/components/clients/inspector/company/CompanyInspector.vue";

definePageMeta({
  layout: 'default',
})
</script>
