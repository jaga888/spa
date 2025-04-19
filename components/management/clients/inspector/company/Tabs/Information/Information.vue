<template>
  <div class="senex__body company-information">
    <form class="senex__form senex__clients__info-form" method="post">
      <BaseFieldset
          v-model:legalName="company.legal_name"
          v-model:name="company.name"
          v-model:shortName="company.short_name"
          :dirtyCompanyColumns="dirtyCompanyColumns"
          :validation="validation"
      />

      <AddressFieldset
          v-model:address="company.address"
          v-model:invoiceAddress="company.invoice_address"
          v-model:invoiceAddress2="company.invoice_address2"
          v-model:invoiceEmail="company.invoice_email"
          :dirtyCompanyColumns="dirtyCompanyColumns"
          :validation="validation"
      />

      <ContactFieldset
          v-model:contactEmail="company.contact_email"
          v-model:contactName="company.contact_name"
          v-model:contactPhone="company.contact_phone"
          :dirtyCompanyColumns="dirtyCompanyColumns"
          :validation="validation"
      />

      <PoliciesFieldset v-model:policyIds="company.policy_ids"/>

      <OtherFieldset
          v-model:pmSoftwareId="company.pm_software_id"
          v-model:url="company.url"
          v-model:udFilingThreshold="company.ud_filing_threshold"
          :dirtyCompanyColumns="dirtyCompanyColumns"
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
import AddressFieldset
  from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/AddressFieldset.vue";
import ContactFieldset
  from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/ContactFieldset.vue";
import OtherFieldset
  from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/OtherFieldset.vue";
import PoliciesFieldset
  from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/PoliciesFieldset.vue";
import ActivateFieldset
  from "~/components/management/clients/inspector/company/Tabs/Information/fieldset/ActivateFieldset.vue";
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
  setActiveCompany,
  setIsDirty,
  setRefreshCompanies
} = useCompanyStore();

const company = ref<Company>({
  name: "",
  legal_name: "",
  active: true,
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
  pm_software_id: 6,
  policy_ids: [],
  short_name: "",
  ud_filing_threshold: 0,
  url: "",
});

const invoiceEmail = ref<CompanyInvoiceEmail>({email: ""});
const validationEmailInvoice = useVuelidate(
    {
      email: {email}
    },
    invoiceEmail
);

const eachEmail = (value: string): boolean => {
  let customValidationEmail = true;

  value.split(";").forEach((element) => {
    invoiceEmail.value = {
      email: element
    };

    if (validationEmailInvoice.value.email.email.$invalid) {
      customValidationEmail = false;
    }
  });

  return customValidationEmail;
};

const rules = {
  legal_name: {
    required: helpers.withMessage("The legal name field is required", required),
    $lazy: true,
  },
  name: {
    required: helpers.withMessage("The name field is required", required),
    $lazy: true,
  },
  short_name: {
    required: helpers.withMessage("The short name field is required", required),
    $lazy: true,
  },
  address: {
    address: {
      required: helpers.withMessage("The address field is required", required),
      $lazy: true,
    },
    city: {
      required: helpers.withMessage("The city field is required", required),
      $lazy: true,
    },
    state: {
      required: helpers.withMessage("Required", required),
      $lazy: true,
    },
    zip: {
      required: helpers.withMessage("The field is required", required),
      $lazy: true,
    },
  },
  invoice_email: {
    eachEmail: helpers.withMessage("Invalid email format", eachEmail),
    $autoDirty: true,
    $lazy: true,
  },
  contact_email: {
    email: helpers.withMessage("Invalid email format", email),
    $autoDirty: true,
    $lazy: true,
  },
  ud_filing_threshold: {
    required: helpers.withMessage("The field ud filing threshold is required", required),
    minValue: helpers.withMessage("The field must have a min value 0", minValue(0)),
    dirty: false
  },
};

const validation = useVuelidate<Company>(
    rules,
    company
);

const dirtyCompanyColumns = ref({
  legalName: false,
  name: false,
  shortName: false,
  address: {
    address: false,
    city: false,
    state: false,
    zip: false,
  },
  invoice_address: {
    address: false,
    city: false,
    state: false,
    zip: false,
  },
  invoice_address2: false,
  invoice_email: false,
  contact_email: false,
  contact_name: false,
  contact_phone: false,
  url: false,
  ud_filing_threshold: false
});

const setDeFaultValues = () => {
  if (!company.value.address) {
    company.value.address = {
      address: "",
      city: "",
      state: "",
      zip: "",
    };
  }

  if (!company.value.invoice_address) {
    company.value.invoice_address = {
      address: "",
      city: "",
      state: "",
      zip: "",
    };
  }
};

watch(activeCompany, async () => {
  if (activeCompany.value?.id) {
    try {
      if (!isDirty.value) {
        company.value = (await companyService.getCompany(activeCompany.value.id, {tab: "info"}));

        setDeFaultValues();

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
      address: {
        address: "",
        city: "",
        state: "",
        zip: "",
      },
      active: true,
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
      pm_software_id: 6,
      policy_ids: [],
      short_name: "",
      ud_filing_threshold: 0,
      url: "",
    };

    validation.value.$reset();

    setIsDirty(false);
  }
});

watch(saveCompany, async () => {
  if (saveCompany.value) {
    const isFormCorrect = await validation.value.$validate();

    if (isFormCorrect) {
      if (company.value.invoice_address && (!company.value.invoice_address.address
          || !company.value.invoice_address.address
          || !company.value.invoice_address.address
          || !company.value.invoice_address.address)) {
        company.value.invoice_address = undefined;
      }

      if (company.value.id) {
        try {
          company.value = (await companyService.updateCompany(company.value.id, company.value));

          setDeFaultValues();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          company.value = (await companyService.createCompany(company.value));

          setDeFaultValues();

          setActiveCompany({
            id: company.value.id ?? 0,
            name: company.value.name,
            legal_name: company.value.legal_name,
            active: company.value.active,
            ud_filing_threshold: company.value.ud_filing_threshold,
          });

          setRefreshCompanies();
        } catch (error) {
          console.log(error);
        }
      }

      validation.value.$reset();
      setIsDirty(false);
    }

    setSaveCompany(false);
  }
});

watch(isDirty, async () => {
  if (!isDirty.value) {
    if (activeCompany.value) {
      company.value = (await companyService.getCompany(activeCompany.value.id, {tab: "info"}));

      setDeFaultValues();
    } else {
      company.value = {
        id: undefined,
        name: "",
        legal_name: "",
        address: {
          address: "",
          city: "",
          state: "",
          zip: "",
        },
        active: true,
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
        pm_software_id: 6,
        policy_ids: [],
        short_name: "",
        ud_filing_threshold: 0,
        url: "",
      };
    }

    validation.value.$reset();
  }

  if (!isDirty.value) {
    dirtyCompanyColumns.value = {
      legalName: false,
      name: false,
      shortName: false,
      address: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      invoice_address: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      invoice_address2: false,
      invoice_email: false,
      contact_email: false,
      contact_name: false,
      contact_phone: false,
      url: false,
      ud_filing_threshold: false
    };
  }
});

if (activeCompany.value?.id) {
  try {
    if (!isDirty.value) {
      company.value = (await companyService.getCompany(activeCompany.value.id, {tab: "info"}));

      setDeFaultValues();

      validation.value.$reset();
    } else {
      setIsDirty(false);
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
