<template>
  <div class="high90__columns" data-high90-columns>
    <div id="senex-company-sidebar"
         class="high90__columns__column"
         data-high90-column="sidebar"
         data-high90-column-width="1">
      <Sidebar/>
    </div>

    <div id="senex-company-content"
         class="high90__columns__column"
         data-high90-column="content"
         data-high90-column-width="1">
      <Content/>
    </div>

    <div id="senex-company-inspector"
         class="high90__columns__column"
         data-high90-column="inspector"
         data-high90-column-width="1"
         v-if="activeInspector === activeInspectorCompany"
    >
      <CompanyInspector/>
    </div>

    <div id="senex-property-inspector"
         class="high90__columns__column"
         data-high90-column="inspector"
         data-high90-column-width="1"
         v-if="activeInspector === activeInspectorProperty"
    >

      <PropertyInspector/>
    </div>
    <div id="senex-user-inspector"
         class="high90__columns__column"
         data-high90-column="inspector"
         data-high90-column-width="1"
         style="display: none"
         v-if="activeInspector === activeInspectorUser"
    >
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "~/components/clients/sidebar/Sidebar.vue";
import Content from "~/components/clients/content/Content.vue";
import CompanyInspector from "~/components/clients/inspector/company/CompanyInspector.vue";
import {useClientStore} from "~/store/client";
import {usePropertyStore} from "~/store/property";
import {useCompanyStore} from "~/store/company";
import {useUserStore} from "~/store/user";
import PropertyInspector from "~/components/clients/inspector/Property/PropertyInspector.vue";

const {
  activeInspector,
  activeInspectorCompany,
  activeInspectorProperty,
  activeInspectorUser,
} = storeToRefs(useClientStore());

const {
  activeCompany,
  isNewCompany,
} = storeToRefs(useCompanyStore());

const {
  activeProperty,
} = storeToRefs(usePropertyStore());

const {
  activeUser,
} = storeToRefs(useUserStore());

const {setActiveInspector} = useClientStore();

definePageMeta({
  layout: "default",
});

watch(activeCompany, async () => {
  if (activeCompany.value) {
    setActiveInspector(activeInspectorCompany.value);
  }
});

watch(isNewCompany, async () => {
  if (isNewCompany.value) {
    setActiveInspector(activeInspectorCompany.value);
  }
});

watch(activeProperty, async () => {
  if (activeProperty.value) {
    setActiveInspector(activeInspectorProperty.value);
  }
});

watch(activeUser, async () => {
  if (activeUser.value) {
    setActiveInspector(activeInspectorUser.value);
  }
});
</script>
