<template>
  <div class="senex__body company-information">
    <form class="senex__form senex__clients__info-form" method="post">
      <fieldset class="senex__form__fieldset">
        <div class="senex__form__block">
          <div class="senex__form__header">Legal Name</div>
          <div class="senex__form__text">
            The full Legal Name of the client company.
          </div>
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.legal_name.$dirty}">
                <input id="form_company_legal_name"
                       type="text"
                       name="legal_name"
                       class="senex__form__input"
                       placeholder="Legal Name..."
                       v-model="company.legal_name"
                       @keyup="setDirty(v$.legal_name)"
                       required/>
              </div>
              <span class="error" style="color: red" v-if="v$.legal_name.required.$invalid">
                {{ v$.legal_name.required.$message }}
              </span><br  v-if="v$.legal_name.required.$invalid">
              <label class="senex__form__label" for="form_company_legal_name">Legal Name</label>
            </div>
          </div>

          <div class="senex__form__header">Name</div>
          <div class="senex__form__text">
            The name of the client.
          </div>
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.name.$dirty}">
                <input
                    id="form_company_name"
                    type="text"
                    name="name"
                    class="senex__form__input"
                    placeholder="Name..."
                    v-model="company.name"
                    @keyup="setDirty(v$.name)"
                    autocomplete="off"
                    required
                />
              </div>
              <span class="error" style="color: red" v-if="v$.name.required.$invalid">
                {{ v$.name.required.$message }}
              </span><br  v-if="v$.name.required.$invalid">
              <label class="senex__form__label" for="form_company_name">Name</label>
            </div>
          </div>

          <div class="senex__form__header">Identifier</div>
          <div class="senex__form__text">
            The short name of the client.
          </div>
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.short_name.$dirty}">
                <input
                    id="form_company_short_name"
                    type="text"
                    name="short_name"
                    class="senex__form__input"
                    placeholder="Short Name..."
                    v-model="company.short_name"
                    @keyup="setDirty(v$.short_name)"
                    required
                />
              </div>
              <span class="error" style="color: red" v-if="v$.short_name.required.$invalid">
                {{ v$.short_name.required.$message }}
              </span><br  v-if="v$.short_name.required.$invalid">
              <label class="senex__form__label" for="form_company_short_name">Identifier</label>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset class="senex__form__fieldset">
        <legend class="senex__form__legend">Address</legend>
        <div class="senex__form__block">
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.address.$dirty}">
                <input
                    id="form_company_address"
                    type="text"
                    name="address"
                    class="senex__form__input"
                    placeholder="Address..."
                    v-model="company.address"
                    @keyup="setDirty(v$.address)"
                    autocomplete="off"
                />
              </div>
              <label class="senex__form__label" for="form_company_address">Address</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item senex__form__item--flex-5">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.city.$dirty}">
                <input
                    id="form_company_city"
                    type="text"
                    name="city"
                    class="senex__form__input"
                    placeholder="City..."
                    v-model="company.city"
                    @keyup="setDirty(v$.city)"
                />
              </div>
              <span class="error" style="color: red" v-if="v$.city.required.$invalid">
                {{ v$.city.required.$message }}
              </span><br  v-if="v$.city.required.$invalid">
              <label class="senex__form__label" for="form_company_city">City</label>
            </div>

            <div class="senex__form__item senex__form__item--flex-1">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.state.$dirty}">
                <input
                    id="form_company_state"
                    type="text"
                    name="state"
                    class="senex__form__input"
                    placeholder="ST..."
                    v-model="company.state"
                    @keyup="setDirty(v$.state)"
                />
              </div>
              <span class="error" style="color: red" v-if="v$.state.required.$invalid">
                {{ v$.state.required.$message }}
              </span><br  v-if="v$.state.required.$invalid">
              <label class="senex__form__label" for="form_company_state">ST</label>
            </div>

            <div class="senex__form__item senex__form__item--flex-2">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.zip.$dirty}">
                <input
                    id="form_company_zip"
                    type="text"
                    name="zip"
                    class="senex__form__input"
                    placeholder="Zip..."
                    v-model="company.zip"
                    @keyup="setDirty(v$.zip)"
                />
              </div>
              <span class="error" style="color: red" v-if="v$.zip.required.$invalid">
                {{ v$.zip.required.$message }}
              </span><br  v-if="v$.zip.required.$invalid">
              <label class="senex__form__label" for="form_company_zip">Zip</label>
            </div>
          </div>
        </div>

        <div class="senex__form__block">
          <div class="senex__form__header">Invoice Address</div>
          <div class="senex__form__text">
            This is the address where Client Invoices should be sent.
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.invoice_address.$dirty}">
                <input
                    id="form_company_invoice_address"
                    type="text"
                    name="invoice_address"
                    class="senex__form__input"
                    placeholder="Address Line 1..."
                    v-model="company.invoice_address"
                    @keyup="setDirty(v$.invoice_address)"
                />
              </div>
              <label class="senex__form__label" for="form_company_invoice_address">Address Line 1</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.invoice_address2.$dirty}">
                <input
                    id="form_company_invoice_address2"
                    type="text"
                    name="invoice_address2"
                    class="senex__form__input"
                    placeholder="Address Line 2..."
                    v-model="company.invoice_address2"
                    @keyup="setDirty(v$.invoice_address2)"
                />
              </div>
              <label class="senex__form__label" for="form_company_invoice_address2">Address Line 2</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item senex__form__item--flex-5">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.invoice_city.$dirty}">
                <input
                    id="form_company_invoice_city"
                    type="text"
                    name="invoice_city"
                    class="senex__form__input"
                    placeholder="City..."
                    v-model="company.invoice_city"
                    @keyup="setDirty(v$.invoice_city)"
                />
              </div>
              <label class="senex__form__label" for="form_company_invoice_city">City</label>
            </div>

            <div class="senex__form__item senex__form__item--flex-1">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.address.$dirty}">
                <input
                    id="form_company_invoice_state"
                    type="text"
                    name="invoice_state"
                    class="senex__form__input"
                    placeholder="ST..."
                    v-model="company.invoice_state"
                    @change="setDirty(v$.invoice_state)"
                />
              </div>
              <label class="senex__form__label" for="form_company_invoice_state">ST</label>
            </div>

            <div class="senex__form__item senex__form__item--flex-2">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.invoice_zip.$dirty}">
                <input
                    id="form_company_invoice_zip"
                    type="text"
                    name="invoice_zip"
                    class="senex__form__input"
                    placeholder="Zip..."
                    v-model="company.invoice_zip"
                    @keyup="setDirty(v$.invoice_zip)"
                />
              </div>
              <label class="senex__form__label" for="form_company_invoice_zip">Zip</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.invoice_email.$dirty}">
                <input
                    id="form_company_invoice_email"
                    type="text"
                    name="invoice_email"
                    class="senex__form__input"
                    placeholder="Email..."
                    v-model="company.invoice_email"
                    @keyup="setDirty(v$.invoice_email)"
                />
              </div>
              <label class="senex__form__label" for="form_company_invoice_email">Email</label>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset class="senex__form__fieldset">
        <legend class="senex__form__legend">Contact</legend>
        <div class="senex__form__block">
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.contact_name.$dirty}">
                <input
                    id="form_company_contact_name"
                    type="text"
                    name="contact_name"
                    class="senex__form__input"
                    placeholder="Name..."
                    v-model="company.contact_name"
                    @keyup="setDirty(v$.contact_name)"
                />
              </div>
              <label class="senex__form__label" for="form_company_contact_name">Name</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.contact_phone.$dirty}">
                <input
                    id="form_company_contact_phone"
                    type="tel"
                    name="contact_phone"
                    class="senex__form__input"
                    v-model="company.contact_phone"
                    @change="setDirty(v$.contact_phone)"
                />
              </div>
              <label class="senex__form__label" for="form_company_contact_phone">Phone</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.contact_email.$dirty}">
                <input
                    id="form_company_contact_email"
                    type="email"
                    name="contact_email"
                    class="senex__form__input"
                    placeholder="Email..."
                    v-model="company.contact_email"
                    @keyup="setDirty(v$.contact_email)"
                />
              </div>
              <label class="senex__form__label" for="form_company_contact_email">Email</label>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset class="senex__form__fieldset">
        <legend class="senex__form__legend">Policies</legend>
        <div class="senex__form__block">
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__policies" id="company_policies_wrapper">
                <div :class="{'policies_container_1': policies.length > 5, 'policies_container': policies.length < 6}">
                  <span
                      v-for="policy in policies.length > 5 ? policies.slice(0, Math.round(policies.length / 2)) : policies">
                    <input type="checkbox" name="policies[]" class="senex__form__checkbox" v-model="company.policy_ids"
                           :id="'form_company_policy_' + policy.id" :value="policy.id" @change="setDirty()">
                    <label :for="'form_company_policy_' + policy.id" :title="policy.description">
                      {{
                        policy.name
                            ? policy.name
                            : policy.identifier
                                .replaceAll('_', ' ')
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
                    <input type="checkbox" name="policies[]" class="senex__form__checkbox" v-model="company.policy_ids"
                           :id="'form_company_policy_' + policy.id" :value="policy.id" @change="setDirty()">
                    <label :for="'form_company_policy_' + policy.id" :title="policy.description">
                      {{
                        policy.name
                            ? policy.name
                            : policy.identifier
                                .replaceAll('_', ' ')
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

      <fieldset class="senex__form__fieldset">
        <legend class="senex__form__legend">Other Information</legend>
        <div class="senex__form__block">
          <div class="senex__form__header">Property Management Software</div>
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <select name="pm_software_id" id="form_company_pm_software_id" class="senex__form__select"
                        v-model="company.pm_software_id" @change="setDirty(v$.pm_software_id)">
                  <option :value="pmSoftware.id" v-for="pmSoftware in pmSoftwares">{{ pmSoftware.name }}</option>
                </select>
              </div>
              <label class="senex__form__label" for="form_company_pm_software_id">PM Software</label>
            </div>
          </div>

          <div class="senex__form__header">Client Website</div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.url.$dirty}">
                <input
                    id="form_company_url"
                    type="text"
                    name="url"
                    class="senex__form__input"
                    placeholder="Website URL..."
                    v-model="company.url"
                    @keyup="setDirty(v$.url)"
                />
              </div>
              <label class="senex__form__label" for="form_company_url">Website URL</label>
            </div>
          </div>

          <div class="senex__form__header">UD Filing Threshold</div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field" :class="{'senex__form__field--dirty': v$.ud_filing_threshold.$dirty}">
                <input
                    id="form_company_ud_filing_threshold"
                    type="number"
                    name="ud_filing_threshold"
                    v-model="company.ud_filing_threshold"
                    class="senex__form__input"
                    placeholder="UD Filing Threshold..."
                    min="0"
                    @keyup="setDirty(v$.ud_filing_threshold)"
                />
              </div>
              <label class="senex__form__label" for="form_company_ud_filing_threshold">UD Filing Threshold</label>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset class="senex__form__fieldset">
        <legend class="senex__form__legend">Status</legend>

        <div class="senex__form__block">
          <div class="senex__form__text" id="company-active-result">
            <span v-if="company.active">
              This Client is <strong>Active</strong>. To remove it from use, while retaining all historical data, you
              may deactivate it.
            </span>
            <span v-else>This Property is <strong>Inactive</strong>.</span>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <Button id="company-active-button"
                      type="button"
                      class="senex__button"
                      :class="{
                        'senex__button--danger senex__clients__deactivate-company': company.active,
                        'senex__button--save senex__clients__activate-company': !company.active
                      }">
                {{ company.active ? 'Deactivate' : 'Activate' }}
              </Button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import {companyService} from "~/services/company/service";
import {useCompanyStore} from "~/store/company";
import type {Company} from "~/services/company/types";
import type {PmSoftwareList} from "~/services/pm_software/types";
import {pmSoftwareService} from "~/services/pm_software/service";
import {policyService} from "~/services/policy/service";
import type {PolicyList} from "~/services/policy/types";
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

const {activeCompany, saveCompany, isDirty} = storeToRefs(useCompanyStore())
const {setIsDirty} = useCompanyStore();
const company = ref<Company>({
  id: undefined,
  name: '',
  legal_name: '',
  active: false,
  address: '',
  city: '',
  contact_email: '',
  contact_name: '',
  contact_phone: '',
  invoice_address: '',
  invoice_address2: '',
  invoice_city: '',
  invoice_email: '',
  invoice_state: '',
  invoice_zip: '',
  pm_software_id: 0,
  policy_ids: [],
  short_name: '',
  state: '',
  ud_filing_threshold: 0,
  url: '',
  zip: '',
  processing_type_availabilities: [],
  files: []
})
const pmSoftwares = ref<PmSoftwareList[]>([])
const policies = ref<PolicyList[]>([])

const rules = {
  legal_name: {
    required: helpers.withMessage('The legal name field is required', required)
  },
  name: {
    required: helpers.withMessage('The name field is required', required)
  },
  short_name: {
    required: helpers.withMessage('The short name field is required', required)
  },
  address: {
    dirty: false
  },
  city: {
    required: helpers.withMessage('The city field is required', required),
    dirty: false
  },
  state: {
    required: helpers.withMessage('Required', required),
    dirty: false
  },
  zip: {
    required: helpers.withMessage('The field is required', required),
    dirty: false
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
    dirty: false
  },
};

const v$ = useVuelidate(rules, company)

watch(activeCompany, async () => {
  if (activeCompany.value?.id) {
    try {
      if (!isDirty.value) {
        company.value = (await companyService.getCompany(activeCompany.value.id, {tab: 'info'}))

        v$.value.$reset()

        console.log(company.value)
      } else {
        setIsDirty(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
})

if (activeCompany.value?.id) {
  try {
    if (!isDirty.value) {
      company.value = (await companyService.getCompany(activeCompany.value.id, {tab: 'info'}))

      console.log(company.value)
    } else {
      setIsDirty(false)
    }

    pmSoftwares.value = (await pmSoftwareService.getPmSoftwares({sort: 'order'}))

    console.log(pmSoftwares.value)

    policies.value = (await policyService.getPolicies({'filter[is_published]': 1, sort: 'sort'}))

    console.log(policies.value)
  } catch (error) {
    console.log(error)
  }
}

watch(saveCompany, async () => {
  // company.value.policies = companyPolicies.map((policyId: number) => {
  //   return {id: policyId}
  // });
  // console.log(company.value.policies)
})

const setDirty = (element: { $touch: any; }|undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true)
}

watch(isDirty, async () => {
  console.log(isDirty.value);
  if (!isDirty.value && activeCompany.value) {
    company.value = (await companyService.getCompany(activeCompany.value.id, {tab: 'info'}))

    console.log(company.value)

    v$.value.$reset()
  }
})
</script>
