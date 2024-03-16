<template>
  <div class="senex__body company-information">
    <form class="senex__form senex__clients__info-form" method="post">
      <BaseFieldset
          v-model:legalName="company.legal_name"
          v-model:name="company.name"
          v-model:shortName="company.short_name"
          :validation="validation"
      />

      <AddressFieldset
          v-model:address="company.address"
          v-model:city="company.city"
          v-model:state="company.state"
          v-model:zip="company.zip"
          v-model:invoiceAddress="company.invoice_address"
          v-model:invoiceAddress2="company.invoice_address2"
          v-model:invoiceCity="company.invoice_city"
          v-model:invoiceEmail="company.invoice_email"
          v-model:invoiceState="company.invoice_state"
          v-model:invoiceZip="company.invoice_zip"
          :validation="validation"
      />

      <ContactFieldset
          v-model:contactEmail="company.contact_email"
          v-model:contactName="company.contact_name"
          v-model:contactPhone="company.contact_phone"
          :validation="validation"
      />

      <PoliciesFieldset v-model:policyIds="company.policy_ids"/>

      <OtherFieldset
          v-model:pmSoftwareId="company.pm_software_id"
          v-model:url="company.url"
          v-model:udFilingThreshold="company.ud_filing_threshold"
          :validation="validation"
      />

      <ActivateFieldset :active="company.active"/>
    </form>
  </div>
</template>

<script setup lang="ts">
import {companyService} from "~/services/company/service";
import {useCompanyStore} from "~/store/company";
import type {Company} from "~/services/company/types";
import BaseFieldset from "~/components/clients/inspector/company/fieldset/BaseFieldset.vue";
import AddressFieldset from "~/components/clients/inspector/company/fieldset/AddressFieldset.vue";
import ContactFieldset from "~/components/clients/inspector/company/fieldset/ContactFieldset.vue";
import OtherFieldset from "~/components/clients/inspector/company/fieldset/OtherFieldset.vue";
import PoliciesFieldset from "~/components/clients/inspector/company/fieldset/PoliciesFieldset.vue";
import ActivateFieldset from "~/components/clients/inspector/company/fieldset/ActivateFieldset.vue";
import {helpers, minValue, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

const {
  activeCompany,
  saveCompany,
  isDirty,
  isNewCompany,
} = storeToRefs(useCompanyStore());
const {
  setSaveCompany,
  setIsDirty
} = useCompanyStore();
const company = ref<Company>({
  id: undefined,
  name: "",
  legal_name: "",
  active: false,
  address: "",
  city: "",
  contact_email: "",
  contact_name: "",
  contact_phone: "",
  invoice_address: "",
  invoice_address2: "",
  invoice_city: "",
  invoice_email: "",
  invoice_state: "",
  invoice_zip: "",
  pm_software_id: 0,
  policy_ids: [],
  short_name: "",
  state: "",
  ud_filing_threshold: 0,
  url: "",
  zip: "",
});

const rules = {
  legal_name: {
    required: helpers.withMessage("The legal name field is required", required),
    $autoDirty: true,
    $lazy: true,
  },
  name: {
    required: helpers.withMessage("The name field is required", required),
    $autoDirty: true,
    $lazy: true,
  },
  short_name: {
    required: helpers.withMessage("The short name field is required", required),
    $autoDirty: true,
    $lazy: true,
  },
  address: {
    dirty: false
  },
  city: {
    required: helpers.withMessage("The city field is required", required),
    $autoDirty: true,
    $lazy: true,
  },
  state: {
    required: helpers.withMessage("Required", required),
    $autoDirty: true,
    $lazy: true,
  },
  zip: {
    required: helpers.withMessage("The field is required", required),
    $autoDirty: true,
    $lazy: true,
  },
  invoice_address: {
    dirty: false
  },
  invoice_address2: {
    dirty: false
  },
  invoice_city: {
    dirty: false
  },
  invoice_email: {
    dirty: false
  },
  invoice_state: {
    dirty: false
  },
  invoice_zip: {
    dirty: false
  },
  contact_email: {
    dirty: false
  },
  contact_name: {
    dirty: false
  },
  contact_phone: {
    dirty: false
  },
  pm_software_id: {
    dirty: false
  },
  url: {
    dirty: false
  },
  ud_filing_threshold: {
    required: helpers.withMessage("The field ud filing threshold is required", required),
    minValue: helpers.withMessage("The field must have a min value 0", minValue(0)),
    dirty: false
  },
};

const validation = useVuelidate(
    rules,
    company
);

watch(activeCompany, async () => {
  if (activeCompany.value?.id) {
    try {
      if (!isDirty.value) {
        company.value = (await companyService.getCompany(activeCompany.value.id, {tab: "info"}));

        validation.value.$reset();

        console.log(company.value);
      } else {
        setIsDirty(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

watch(isNewCompany, async () => {
  if (isNewCompany.value) {
    company.value = {
      id: undefined,
      name: "",
      legal_name: "",
      active: false,
      address: "",
      city: "",
      contact_email: "",
      contact_name: "",
      contact_phone: "",
      invoice_address: "",
      invoice_address2: "",
      invoice_city: "",
      invoice_email: "",
      invoice_state: "",
      invoice_zip: "",
      pm_software_id: 0,
      policy_ids: [],
      short_name: "",
      state: "",
      ud_filing_threshold: 0,
      url: "",
      zip: "",
    };

    validation.value.$reset();
  }
});

if (activeCompany.value?.id) {
  try {
    if (!isDirty.value) {
      company.value = (await companyService.getCompany(activeCompany.value.id, {tab: "info"}));

      console.log(company.value);

      validation.value.$reset();
    } else {
      setIsDirty(false);
    }
  } catch (error) {
    console.log(error);
  }
}

watch(saveCompany, async () => {
  if (saveCompany.value) {
    console.log(company.value);
    setSaveCompany(false);
  }
});

watch(isDirty, async () => {
  console.log(isDirty.value);
  if (!isDirty.value && activeCompany.value) {
    company.value = (await companyService.getCompany(activeCompany.value.id, {tab: "info"}));

    console.log(company.value);

    validation.value.$reset();
  }
});
</script>
