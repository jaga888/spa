<template>
  <div class="high90__columns" data-high90-columns>
    <div id="senex-company-sidebar"
         class="high90__columns__column"
         data-high90-column="sidebar"
         data-high90-column-width="1"
    >
      <Sidebar/>
    </div>

    <div id="senex-company-content"
         class="high90__columns__column"
         data-high90-column="content"
         data-high90-column-width="1"
    >
      <Content/>
    </div>

    <Inspector class="high90__columns__column" data-high90-column="inspector" data-high90-column-width="1"/>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "~/components/clients/sidebar/Sidebar.vue";
import Content from "~/components/clients/content/Content.vue";
import Inspector from "~/components/clients/inspector/Inspector.vue";

definePageMeta({
  layout: "default",
});
</script>
