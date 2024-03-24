<template>
  <span>
    <input type="checkbox"
           name="policies[]"
           class="senex__form__checkbox"
           :id="'form_company_policy_' + policy.id"
           :checked="policyIds.includes(policy.id)"
           :value="policy.id"
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

const props = defineProps({
  policyIds: {
    type: Array<Number>,
    default: []
  },
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

  if ($event.currentTarget) {
    let policyId = parseInt($event.target.value);

    if ($event.currentTarget.checked) {
      props.policyIds.push(policyId);
    } else {
      props.policyIds.splice(props.policyIds.indexOf(policyId), 1);
    }
  }

  setIsDirty(true);
};
</script>
