<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Policies</legend>
    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__policies" id="company_policies_wrapper">
            <div :class="{'policies_container_1': policies.length > 5, 'policies_container': policies.length < 6}">
              <span
                  v-for="policy in policies.length > 5 ? policies.slice(0, Math.round(policies.length / 2)) : policies">
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
            </div>
            <div class="policies_container_2" v-if="policies.length > 5">
              <span
                  v-for="policy in policies.length > 5 ? policies.slice(Math.round(policies.length / 2)) : policies">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {useCompanyStore} from "~/store/company";
import {policyService} from "~/services/policy/service";
import type {PolicyList} from "~/services/policy/types";

const props = defineProps({
  policyIds: {
    type: Array<Number>,
    default: []
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

const {activeCompany} = storeToRefs(useCompanyStore());

const policies = ref<PolicyList[]>([]);

if (activeCompany.value?.id) {
  try {
    policies.value = (await policyService.getPolicies({
      "filter[is_published]": 1,
      sort: "sort"
    }));

    console.log(policies.value);
  } catch (error) {
    console.log(error);
  }
}
</script>
