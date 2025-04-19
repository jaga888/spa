<template>
  <span>
    <input type="checkbox"
           name="policies[]"
           class="senex__form__checkbox"
           :id="'form_company_policy_' + policy.id"
           :value="policy.id"
           v-model="policyIds"
           @change="setDirty($event)">
    <label :for="'form_company_policy_' + policy.id" :title="policy.description">
      {{
        policy.name
            ? policy.name
            : policy.identifier
                .replaceAll("_", " ")
                .toLowerCase()
                .replace(/(?<= )[^\s]|^./g, a => a.toUpperCase())
      }}
    </label>
    <br>
  </span>
</template>

<script setup lang="ts">
import {useCompanyStore} from "~/store/company";
import type {PolicyList} from "~/services/policy/types";
import type {PropType} from "vue";

const policyIds = defineModel<Array<Number>>("policyIds", {
  default: []
});

defineProps({
  policy: {
    type: Object as PropType<PolicyList>,
    default: {}
  },
});

const {setIsDirty} = useCompanyStore();

const setDirty = ($event: any, element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true);
};
</script>
