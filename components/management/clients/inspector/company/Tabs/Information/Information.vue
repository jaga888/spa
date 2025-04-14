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
          v-model:invoiceAddress="company.invoice_address"
          v-model:invoiceAddress2="company.invoice_address2"
          v-model:invoiceEmail="company.invoice_email"
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
import type {Company, CompanyInvoiceEmail} from "~/services/company/types";
import BaseFieldset from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/BaseFieldset.vue";
import AddressFieldset from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/AddressFieldset.vue";
import ContactFieldset from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/ContactFieldset.vue";
import OtherFieldset from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/OtherFieldset.vue";
import PoliciesFieldset from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/PoliciesFieldset.vue";
import ActivateFieldset from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/ActivateFieldset.vue";
import {email, helpers, minValue, required} from "@vuelidate/validators";
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
  name: "",
  legal_name: "",
  active: false,
  address: {
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  contact_email: "",
  contact_name: "",
  contact_phone: "",
  invoice_address: {
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  invoice_address2: "",
  invoice_email: "",
  pm_software_id: 0,
  policy_ids: [],
  short_name: "",
  ud_filing_threshold: 0,
  url: "",
});

const invoiceEmail = ref<CompanyInvoiceEmail>({email: ''})
const validationEmailInvoice = useVuelidate(
    {
      email: {email}
    },
    invoiceEmail
);

const eachEmail = (value: string): boolean => {
  let customValidationEmail = true;

  value.split(';').forEach((element) => {
    invoiceEmail.value = {
      email: element
    };

    if (validationEmailInvoice.value.email.email.$invalid) {
      customValidationEmail = false;
    }
  })

  return customValidationEmail;
}

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
    address: {
      required: helpers.withMessage("The address field is required", required),
      $autoDirty: true,
      $lazy: true,
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
  },
  invoice_address: {
    address: {
      dirty: false
    },
    city: {
      dirty: false
    },
    state: {
      dirty: false
    },
    zip: {
      dirty: false
    },
  },
  invoice_address2: {
    dirty: false
  },
  invoice_email: {
    eachEmail: helpers.withMessage('Invalid email format', eachEmail),
    $autoDirty: true,
    $lazy: true,
  },
  contact_email: {
    email: helpers.withMessage('Invalid email format', email),
    $autoDirty: true,
    $lazy: true,
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

// const emails = ref<Array<CompanyInvoiceEmail>>([]);
//
const emails = computed(() => {
  return company.value.invoice_email.split(';').map((element) => {
    return {email: element};
  })
})



watch(activeCompany, async () => {
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
});

watch(isNewCompany, async () => {
  if (isNewCompany.value) {
    company.value = {
      id: undefined,
      name: "",
      legal_name: "",
      mailing_address: {
        id: undefined,
        address: '',
        city: '',
        state: '',
        zip: '',
      },
      active: false,
      contact_email: "",
      contact_name: "",
      contact_phone: "",
      invoice_address: {
        id: undefined,
        address: '',
        city: '',
        state: '',
        zip: '',
      },
      invoice_address2: "",
      invoice_email: "",
      pm_software_id: 0,
      policy_ids: [],
      short_name: "",
      ud_filing_threshold: 0,
      url: "",
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
    console.log(validation.value);
    console.log(validation.value.$invalid);
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
