<template>
  <div class="senex__body property-information">
    <form class="senex__form senex__clients__info-form" method="post">
      <BaseFieldset
          v-model:legalName="property.legal_name"
          v-model:name="property.name"
          v-model:shortName="property.short_name"
          v-model:clientPropertyId="property.client_property_id"
          :dirtyPropertyColumns="dirtyPropertyColumns"
          :validation="validation"
      />

      <LocationFieldset
          v-model:address="property.address"
          v-model:courtId="property.court_id"
          v-model:defaultUnitCity="property.default_unit_city"
          v-model:defaultUnitState="property.default_unit_state"
          v-model:defaultUnitZip="property.default_unit_zip"
          v-model:useDefaultUnitAddress="useDefaultUnitAddress"
          :dirtyPropertyColumns="dirtyPropertyColumns"
          :validation="validation"
      />

      <ContactFieldset
          v-model:phone="property.phone"
          v-model:fax="property.fax"
          v-model:email="property.email"
          :dirtyPropertyColumns="dirtyPropertyColumns"
          :validation="validation"
      />

      <AddressFieldset
          v-model:address="property.address"
          v-model:paymentAddress="property.payment_address"
          v-model:invoiceAddress="property.invoice_address"
          v-model:invoiceAddress2="property.invoice_address2"
          v-model:invoiceEmail="property.invoice_email"
          v-model:useSameAsPropertyAddressForInvoiceAddress="useSameAsPropertyAddressForInvoiceAddress"
          v-model:useSameAsPropertyAddressForPaymentAddress="useSameAsPropertyAddressForPaymentAddress"
          :dirtyPropertyColumns="dirtyPropertyColumns"
          :validation="validation"
      />

      <EmailFieldset
          v-model:notificationEmail="property.notification_email"
          v-model:documentEmail="property.document_email"
          :dirtyPropertyColumns="dirtyPropertyColumns"
          :validation="validation"
      />

      <PropertyManagerFieldset
          v-model:managerName="property.manager_name"
          v-model:managerCell="property.manager_cell"
          v-model:managerEmail="property.manager_email"
          :dirtyPropertyColumns="dirtyPropertyColumns"
          :validation="validation"
      />

      <PoliciesFieldset
          v-model:policyIds="property.policy_ids"
          v-model:lateAfterDom="property.late_after_dom"
          v-model:noticeRentTrigger="property.notice_rent_trigger"
          v-model:useCompanyFilingThreshold="property.use_company_filing_threshold"
          v-model:udFilingThreshold="property.ud_filing_threshold"
          :companyPolicies="property.company.policies"
          :companyudFilingThreshold="property.company.ud_filing_threshold"
          :excludedPolicyIds="excludedPolicyIds"
          :dirtyPropertyColumns="dirtyPropertyColumns"
          :validation="validation"
      />

      <OtherFieldset
          v-model:pmSoftwareId="property.pm_software_id"
          :unitCount="property.unit_count"
          :validation="validation"
      />

      <ActivateFieldset :active="property.active"/>
    </form>
  </div>
</template>

<script setup lang="ts">
import {propertyService} from "~/services/property/service";
import {usePropertyStore} from "~/store/property";
import type {
  ActiveProperty,
  Property,
  PropertyEmail,
} from "~/services/property/types";
import BaseFieldset
  from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/BaseFieldset.vue";
import AddressFieldset
  from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/AddressFieldset.vue";
import ContactFieldset
  from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/ContactFieldset.vue";
import EmailFieldset
  from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/EmailFieldset.vue";
import OtherFieldset
  from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/OtherFieldset.vue";
import PoliciesFieldset
  from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/PoliciesFieldset.vue";
import ActivateFieldset
  from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/ActivateFieldset.vue";
import {email, helpers, maxValue, minValue, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import type {Firm} from "~/services/firm/types";
import LocationFieldset
  from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/LocationFieldset.vue";
import PropertyManagerFieldset
  from "~/components/management/clients/inspector/property/Tabs/Information/fieldset/PropertyManagerFieldset.vue";
import {useCompanyStore} from "~/store/company";

const {
  activeProperty,
  saveProperty,
  isDirty,
  isNewProperty,
} = storeToRefs(usePropertyStore());

const {
  activeCompany,
} = storeToRefs(useCompanyStore());

const {
  setSaveProperty,
  setIsDirty,
  setActiveProperty,
  setRefreshProperties
} = usePropertyStore();

const property = ref<Property>(<Property>{
  id: undefined,
  name: "",
  legal_name: "",
  active: false,
  address: {
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  client_property_id: "",
  company: activeCompany.value,
  company_id: activeCompany.value?.id,
  court_id: 1,
  default_unit_city: "",
  default_unit_state: "",
  default_unit_zip: "",
  document_email: "",
  email: "",
  fax: "",
  late_after_dom: 5,
  invoice_address: {
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  invoice_address2: "",
  invoice_email: "",
  manager_cell: "",
  manager_email: "",
  manager_name: "",
  notice_rent_trigger: 100,
  notification_email: "",
  payment_address: {
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  phone: "",
  pm_software_id: 6,
  policy_ids: [],
  short_name: "",
  use_company_filing_threshold: false,
  ud_filing_threshold: 500,
  policies: [],
  unit_count: 0,
});

const setDeFaultValues = () => {
  if (!property.value.address) {
    property.value.address = {
      address: "",
      city: "",
      state: "",
      zip: "",
    };
  }

  if (!property.value.invoice_address) {
    property.value.invoice_address = {
      address: "",
      city: "",
      state: "",
      zip: "",
    };
  }

  if (!property.value.payment_address) {
    property.value.payment_address = {
      address: "",
      city: "",
      state: "",
      zip: "",
    };
  }
};

const dirtyPropertyColumns = ref({
  legalName: false,
  name: false,
  shortName: false,
  address: {
    address: false,
    city: false,
    state: false,
    zip: false,
  },
  defaultUnitCity: false,
  defaultUnitState: false,
  defaultUnitZip: false,
  phone: false,
  fax: false,
  email: false,
  invoiceAddress: {
    address: false,
    city: false,
    state: false,
    zip: false,
  },
  invoiceAddress2: false,
  invoiceEmail: false,
  paymentAddress: {
    address: false,
    city: false,
    state: false,
    zip: false,
  },
  notificationEmail: false,
  documentEmail: false,
  managerName: false,
  managerCell: false,
  managerEmail: false,
  lateAfterDom: false,
  noticeRentTrigger: false,
  useCompanyFilingThreshold: false,
  udFilingThreshold: false,
  pmSoftwareId: false,
});

const documentEmail = ref<PropertyEmail>({
  email: ""
});

const notificationEmail = ref<PropertyEmail>({
  email: ""
});

const validationDocumentEmail = useVuelidate(
    {
      email: {email}
    },
    documentEmail
);

const validationNotificationEmail = useVuelidate(
    {
      email: {email}
    },
    notificationEmail
);

const eachDocumentEmail = (value: string): boolean => {
  let customValidationEmail = true;

  value.split(";").forEach((element) => {
    documentEmail.value = {
      email: element
    };

    if (validationDocumentEmail.value.email.email.$invalid) {
      customValidationEmail = false;
    }
  });

  return customValidationEmail;
};

const eachNotificationEmail = (value: string): boolean => {
  let customValidationEmail = true;

  value.split(";").forEach((element) => {
    notificationEmail.value = {
      email: element
    };

    if (validationNotificationEmail.value.email.email.$invalid) {
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
  court_id: {
    required: helpers.withMessage("The field is required", required),
    $lazy: true,
  },
  notification_email: {
    eachEmail: helpers.withMessage("Invalid email format", eachDocumentEmail),
    $lazy: true,
  },
  document_email: {
    eachEmail: helpers.withMessage("Invalid email format", eachNotificationEmail),
    $lazy: true,
  },
  manager_email: {
    email: helpers.withMessage("Invalid email format", email),
    $lazy: true,
  },
  late_after_dom: {
    required: helpers.withMessage("The field is required", required),
    maxValue: helpers.withMessage("The field must have a max value 15", maxValue(15)),
    minValue: helpers.withMessage("The field must have a min value 0", minValue(0)),
    $lazy: true,
  },
  notice_rent_trigger: {
    required: helpers.withMessage("The field is required", required),
    minValue: helpers.withMessage("The field must have a min value 0", minValue(0)),
    $lazy: true,
  },
};

const validation = useVuelidate(
    rules,
    property
);

const excludedPolicyIds = ref<Array<Number>>([]);

const useDefaultUnitAddress = ref<boolean>(false);
const useSameAsPropertyAddressForInvoiceAddress = ref<boolean>(false);
const useSameAsPropertyAddressForPaymentAddress = ref<boolean>(false);

watch(activeProperty, async () => {
  if (activeProperty.value?.id) {
    try {
      if (!isDirty.value) {
        property.value = (await propertyService.getProperty(activeProperty.value.id, {tab: "info"}));

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

watch(isNewProperty, async () => {
  if (isNewProperty.value && activeCompany.value) {
    property.value = {
      id: undefined,
      name: "",
      legal_name: "",
      active: false,
      address: {
        address: "",
        city: "",
        state: "",
        zip: "",
      },
      client_property_id: "",
      company: activeCompany.value,
      company_id: activeCompany.value.id,
      court_id: 1,
      default_unit_city: "",
      default_unit_state: "",
      default_unit_zip: "",
      document_email: "",
      email: "",
      fax: "",
      late_after_dom: 5,
      invoice_address: {
        address: "",
        city: "",
        state: "",
        zip: "",
      },
      invoice_address2: "",
      invoice_email: "",
      manager_cell: "",
      manager_email: "",
      manager_name: "",
      notice_rent_trigger: 100,
      notification_email: "",
      payment_address: {
        address: "",
        city: "",
        state: "",
        zip: "",
      },
      phone: "",
      pm_software_id: 6,
      policy_ids: [],
      short_name: "",
      use_company_filing_threshold: false,
      ud_filing_threshold: 500,
      policies: [],
      unit_count: 0,
    };

    validation.value.$reset();

    setIsDirty(false);
  }
});

if (activeProperty.value?.id) {
  try {
    if (!isDirty.value) {
      property.value = (await propertyService.getProperty(activeProperty.value.id));

      setDeFaultValues();

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
    const isFormCorrect = await validation.value.$validate();
    if (isFormCorrect) {
      if (property.value.invoice_address && (!property.value.invoice_address.address
          || !property.value.invoice_address.address
          || !property.value.invoice_address.address
          || !property.value.invoice_address.address)) {
        property.value.invoice_address = undefined;
      }

      if (property.value.payment_address && (!property.value.payment_address.address
          || !property.value.payment_address.address
          || !property.value.payment_address.address
          || !property.value.payment_address.address)) {
        property.value.payment_address = undefined;
      }

      if (useDefaultUnitAddress) {
        property.value.default_unit_city = property.value.address.city;
        property.value.default_unit_state = property.value.address.state;
        property.value.default_unit_zip = property.value.address.zip;
      }

      if (useSameAsPropertyAddressForInvoiceAddress) {
        property.value.invoice_address = property.value.address;
      }

      if (useSameAsPropertyAddressForPaymentAddress) {
        property.value.payment_address = property.value.address;
      }

      if (property.value.id) {
        try {
          (await propertyService.updateProperty(property.value.id, property.value));
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          property.value = (await propertyService.createProperty(property.value));

          setDeFaultValues();

          setActiveProperty(<ActiveProperty>{
            id: property.value.id ?? 0,
            short_name: property.value.short_name,
          });

        } catch (error) {
          console.log(error);
        }
      }

      validation.value.$reset();

      setRefreshProperties();

      setIsDirty(false);
    }

    setSaveProperty(false);
  }
});

watch(isDirty, async () => {
  if (!isDirty.value) {
    if (activeProperty.value) {
      property.value = (await propertyService.getProperty(activeProperty.value.id, {tab: "info"}));

      setDeFaultValues();

      validation.value.$reset();
    }

    validation.value.$reset();

    dirtyPropertyColumns.value = {
      legalName: false,
      name: false,
      shortName: false,
      address: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      defaultUnitCity: false,
      defaultUnitState: false,
      defaultUnitZip: false,
      phone: false,
      fax: false,
      email: false,
      invoiceAddress: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      invoiceAddress2: false,
      invoiceEmail: false,
      paymentAddress: {
        address: false,
        city: false,
        state: false,
        zip: false,
      },
      notificationEmail: false,
      documentEmail: false,
      managerName: false,
      managerCell: false,
      managerEmail: false,
      lateAfterDom: false,
      noticeRentTrigger: false,
      useCompanyFilingThreshold: false,
      udFilingThreshold: false,
      pmSoftwareId: false,
    };
  }
});

onMounted(() => {
  property.value.policies.forEach((currentPolicy) => {
    if (currentPolicy.pivot?.exclude) {
      excludedPolicyIds.value.push(currentPolicy.id);
    }
  });
});
</script>
