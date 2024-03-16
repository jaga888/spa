<template>
  <span>
    <div class="wrap-policies-svg">
        <ApproveIcon v-if="!excludedPolicyIds.includes(policy.id)" @click="excludePolicy(true)" />

        <RejectIcon v-if="excludedPolicyIds.includes(policy.id)" @click="excludePolicy(false)" />
    </div>
    <input type="checkbox"
           name="policies[]"
           class="senex__form__checkbox"
           :id="'form_company_policy_' + policy.id"
           :checked="policyIds.includes(policy.id) || isDisabled"
           :disabled="isDisabled"
           :value="policy.id"
           @change="setDirty($event)"
    />
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
import {usePropertyStore} from "~/store/property";
import type {PolicyList} from "~/services/policy/types";
import type {PropType} from "vue";
import ApproveIcon from "~/components/icons/ApproveIcon.vue";
import RejectIcon from "~/components/icons/RejectIcon.vue";

const props = defineProps({
  companyPolicies: {
    type: Array<PolicyList>,
    default: []
  },
  policyIds: {
    type: Array<Number>,
    default: []
  },
  excludedPolicyIds: {
    type: Array<Number>,
    default: []
  },
  policy: {
    type: Object as PropType<PolicyList>,
    default: {}
  },
  policies: {
    type: Array<PolicyList>,
    default: []
  },
});

const {setIsDirty} = usePropertyStore();

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

const companyPolicyFilter = ref<Array<PolicyList>>([]);

const isDisabled = computed((): boolean => {
  if (props.companyPolicies) {
    companyPolicyFilter.value = props.companyPolicies.filter(
        (currentPolicy) => props.policy.identifier === currentPolicy.identifier
    );
    return companyPolicyFilter.value.length > 0;
  } else {
    return false;
  }
});

const excludePolicy = (exclude: boolean) => {
  console.log(exclude);
  if (exclude) {
    props.excludedPolicyIds.push(props.policy.id);
  } else {
    const index = props.excludedPolicyIds.indexOf(props.policy.id);

    if (index > -1) {
      props.excludedPolicyIds.splice(index, 1);
    }
  }

  setIsDirty(true);
}
</script>
