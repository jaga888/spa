<template>
  <span>
    <div class="wrap-policies-svg">
        <ApproveIcon v-if="!isExcluded"/>

        <RejectIcon v-if="isExcluded"/>
    </div>
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
import ApproveIcon from "~/components/icons/ApproveIcon.vue";
import RejectIcon from "~/components/icons/RejectIcon.vue";

const props = defineProps({
  policyIds: {
    type: Array<Number>,
    default: []
  },
  policy: {
    type: Object as PropType<PolicyList>,
    default: {}
  },
  policies: {
    type: Array<PolicyList>,
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

const policyFilter = ref<Array<PolicyList>>([])

const isExcluded = computed((): boolean => {
  policyFilter.value = props.policies.filter(
      (currentPolicy) => props.policy.identifier === currentPolicy.identifier
  );
  return policyFilter.value.length > 0 && policyFilter.value[0].pivot?.exclude;
});
</script>
