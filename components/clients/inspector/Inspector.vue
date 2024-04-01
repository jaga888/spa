<template>
  <div>
    <CompanyInspector id="senex-company-inspector" v-if="activeInspector === activeInspectorCompany"/>

    <PropertyInspector id="senex-property-inspector" v-if="activeInspector === activeInspectorProperty"/>

    <UserInspector id="senex-user-inspector" v-if="activeInspector === activeInspectorUser"/>
  </div>
</template>

<script setup lang="ts">
import CompanyInspector from "~/components/clients/inspector/company/CompanyInspector.vue";
import {useClientStore} from "~/store/client";
import {usePropertyStore} from "~/store/property";
import {useCompanyStore} from "~/store/company";
import {useUserStore} from "~/store/user";
import PropertyInspector from "~/components/clients/inspector/property/PropertyInspector.vue";
import UserInspector from "~/components/clients/inspector/user/UserInspector.vue";

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
