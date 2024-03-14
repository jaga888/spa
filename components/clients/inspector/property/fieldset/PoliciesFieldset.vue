<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Policies</legend>
    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__policies" id="property_policies_wrapper">
            <div :class="{'policies_container_1': policies.length > 5, 'policies_container': policies.length < 6}">
              <Policy
                  v-for="policy in policies.length > 5 ? policies.slice(0, Math.round(policies.length / 2)) : policies"
                  :policy="policy"
                  :policyIds="policyIds"
                  :policies="propertyPolicies"
              />
            </div>
            <div class="policies_container_2" v-if="policies.length > 5">
              <Policy
                  v-for="policy in policies.length > 5 ? policies.slice(Math.round(policies.length / 2)) : policies"
                  :policy="policy"
                  :policyIds="policyIds"
                  :policies="propertyPolicies"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {policyService} from "~/services/policy/service";
import type {PolicyList} from "~/services/policy/types";
import Policy from "~/components/clients/inspector/property/fieldset/Policy.vue";

defineProps({
  propertyPolicies: {
    type: Array<PolicyList>,
    default: {}
  },
  policyIds: {
    type: Array<Number>,
    default: []
  },
});

const policies = ref<PolicyList[]>([]);

try {
  policies.value = (await policyService.getPolicies({
    "filter[is_published]": 1,
    sort: "sort"
  }));

  console.log(policies.value);
} catch (error) {
  console.log(error);
}
</script>
