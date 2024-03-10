<template>
  <div class="senex__body property-information">
    <form class="senex__form senex__clients__info-form" method="post">
      <BaseFieldset
          v-model:legalName="property.legal_name"
          v-model:name="property.name"
          v-model:shortName="property.short_name"
          :validation="validation"
      />

      <AddressFieldset
          v-model:address="property.address"
          v-model:city="property.city"
          v-model:state="property.state"
          v-model:zip="property.zip"
          v-model:invoiceAddress="property.invoice_address"
          v-model:invoiceAddress2="property.invoice_address2"
          v-model:invoiceCity="property.invoice_city"
          v-model:invoiceEmail="property.invoice_email"
          v-model:invoiceState="property.invoice_state"
          v-model:invoiceZip="property.invoice_zip"
          :validation="validation"
      />

      <ContactFieldset
          v-model:contactEmail="property.contact_email"
          v-model:contactName="property.contact_name"
          v-model:contactPhone="property.contact_phone"
          :validation="validation"
      />

      <PoliciesFieldset v-model:policyIds="property.policy_ids"/>

      <OtherFieldset
          v-model:pmSoftwareId="property.pm_software_id"
          v-model:url="property.url"
          v-model:udFilingThreshold="property.ud_filing_threshold"
          :validation="validation"
      />

      <ActivateFieldset :active="property.active"/>
    </form>
  </div>
</template>

<script setup lang="ts">
import {propertyService} from "~/services/property/service";
import {usePropertyStore} from "~/store/property";
import type {Property} from "~/services/property/types";
import BaseFieldset from "~/components/clients/inspector/proeprty/fieldset/BaseFieldset.vue";
import AddressFieldset from "~/components/clients/inspector/proeprty/fieldset/AddressFieldset.vue";
import ContactFieldset from "~/components/clients/inspector/proeprty/fieldset/ContactFieldset.vue";
import OtherFieldset from "~/components/clients/inspector/proeprty/fieldset/OtherFieldset.vue";
import PoliciesFieldset from "~/components/clients/inspector/proeprty/fieldset/PoliciesFieldset.vue";
import ActivateFieldset from "~/components/clients/inspector/proeprty/fieldset/ActivateFieldset.vue";
import {helpers, minValue, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import type {CompanyList} from "~/services/company/types";
import type {Firm} from "~/services/firm/types";

const {
  activeProperty,
  saveProperty,
  isDirty,
  isNewProperty,
} = storeToRefs(usePropertyStore());
const {
  setSaveProperty,
  setIsDirty
} = usePropertyStore();
const property = ref<Property>({
  id: undefined,
  name: "",
  legal_name: "",
  active: false,
  address: "",
  city: "",
  client_property_id: "",
  company: <CompanyList>{},
  company_id: 0,
  court_id: 0,
  default_unit_city: "",
  default_unit_state: "",
  default_unit_zip: "",
  document_email: "",
  email: "",
  fax: "",
  firm: <Firm>{},
  late_after_dom: 5,
  invoice_address: "",
  invoice_address2: "",
  invoice_city: "",
  invoice_email: "",
  invoice_state: "",
  invoice_zip: "",
  manager_cell: "",
  manager_email: "",
  manager_name: "",
  notice_rent_trigger: 0,
  notification_email: "",
  payment_address: "",
  payment_city: "",
  payment_state: "",
  payment_zip: "",
  phone: "",
  pm_software_id: 0,
  policy_ids: [],
  short_name: "",
  state: "",
  ud_filing_threshold: 0,
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
  pm_software_id: {
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
    property
);

watch(activeProperty, async () => {
  console.log(activeProperty.value);
  if (activeProperty.value?.id) {
    try {
      if (!isDirty.value) {
        property.value = (await propertyService.getProperty(activeProperty.value.id, {tab: "info"}));

        validation.value.$reset();

        console.log(property.value);
      } else {
        setIsDirty(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

watch(isNewProperty, async () => {
  if (isNewProperty.value) {
    property.value = {
      id: undefined,
      name: "",
      legal_name: "",
      active: false,
      address: "",
      city: "",
      client_property_id: "",
      company: <CompanyList>{},
      company_id: 0,
      court_id: 0,
      default_unit_city: "",
      default_unit_state: "",
      default_unit_zip: "",
      document_email: "",
      email: "",
      fax: "",
      firm: <Firm>{},
      late_after_dom: 5,
      invoice_address: "",
      invoice_address2: "",
      invoice_city: "",
      invoice_email: "",
      invoice_state: "",
      invoice_zip: "",
      manager_cell: "",
      manager_email: "",
      manager_name: "",
      notice_rent_trigger: 0,
      notification_email: "",
      payment_address: "",
      payment_city: "",
      payment_state: "",
      payment_zip: "",
      phone: "",
      pm_software_id: 0,
      policy_ids: [],
      short_name: "",
      state: "",
      ud_filing_threshold: 0,
      zip: "",
    };

    validation.value.$reset();
  }
});

if (activeProperty.value?.id) {
  try {
    if (!isDirty.value) {
      property.value = (await propertyService.getProperty(activeProperty.value.id, {tab: "info"}));

      console.log(property.value);

      validation.value.$reset();
    } else {
      setIsDirty(false);
    }
  } catch (error) {
    console.log(error);
  }
}

watch(saveProperty, async () => {
  if (saveProperty.value) {
    console.log(property.value.policy_ids);
    setSaveProperty(false);
  }
});

watch(isDirty, async () => {
  console.log(isDirty.value);
  if (!isDirty.value && activeProperty.value) {
    property.value = (await propertyService.getProperty(activeProperty.value.id, {tab: "info"}));

    console.log(property.value);

    validation.value.$reset();
  }
});
</script>
