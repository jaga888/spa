<template>
  <div class="senex__body company-information">
    <form class="senex__form senex__clients__info-form" method="post">
      <!--      <input id="form_company_id"-->
      <!--             type="hidden"-->
      <!--             name="id"-->
      <!--             class="senex__form__input"-->
      <!--             value=""-->
      <!--      />-->
      <fieldset class="senex__form__fieldset">
        <div class="senex__form__block">
          <div class="senex__form__header">Legal Name</div>
          <div class="senex__form__text">
            The full Legal Name of the client company.
          </div>
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <input id="form_company_legal_name"
                       type="text"
                       name="legal_name"
                       class="senex__form__input"
                       placeholder="Legal Name..."
                       v-model="company.legal_name"
                       required
                />
              </div>
              <span class="error" style="color: red; display: none"></span>
              <label class="senex__form__label" for="form_company_legal_name">Legal Name</label>
            </div>
          </div>

          <div class="senex__form__header">Name</div>
          <div class="senex__form__text">
            The name of the client.
          </div>
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <input
                    id="form_company_name"
                    type="text"
                    name="name"
                    class="senex__form__input"
                    placeholder="Name..."
                    v-model="company.name"
                    autocomplete="off"
                    required
                />
              </div>
              <span class="error" style="color: red; display: none"></span>
              <label class="senex__form__label" for="form_company_name">Name</label>
            </div>
          </div>

          <div class="senex__form__header">Identifier</div>
          <div class="senex__form__text">
            The short name of the client.
          </div>
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <input
                    id="form_company_short_name"
                    type="text"
                    name="short_name"
                    class="senex__form__input"
                    placeholder="Short Name..."
                    v-model="company.short_name"
                    required
                />
              </div>
              <span class="error" style="color: red; display: none"></span>
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
              <div class="senex__form__field">
                <input
                    id="form_company_address"
                    type="text"
                    name="address"
                    class="senex__form__input"
                    placeholder="Address..."
                    v-model="company.address"
                    autocomplete="off"
                    required
                />
              </div>
              <span class="error" style="color: red; display: none"></span>
              <label class="senex__form__label" for="form_company_address">Address</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item senex__form__item--flex-5">
              <div class="senex__form__field">
                <input
                    id="form_company_city"
                    type="text"
                    name="city"
                    class="senex__form__input"
                    placeholder="City..."
                    v-model="company.city"
                    required
                />
              </div>
              <span class="error" style="color: red; display: none"></span>
              <label class="senex__form__label" for="form_company_city">City</label>
            </div>

            <div class="senex__form__item senex__form__item--flex-1">
              <div class="senex__form__field">
                <input
                    id="form_company_state"
                    type="text"
                    name="state"
                    class="senex__form__input"
                    placeholder="ST..."
                    v-model="company.state"
                    required
                />
              </div>
              <span class="error" style="color: red; display: none"></span>
              <label class="senex__form__label" for="form_company_state">ST</label>
            </div>

            <div class="senex__form__item senex__form__item--flex-2">
              <div class="senex__form__field">
                <input
                    id="form_company_zip"
                    type="text"
                    name="zip"
                    class="senex__form__input"
                    placeholder="Zip..."
                    v-model="company.zip"
                    required
                />
              </div>
              <span class="error" style="color: red; display: none; font-size: 13px"></span>
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
              <div class="senex__form__field">
                <input
                    id="form_company_invoice_address"
                    type="text"
                    name="invoice_address"
                    class="senex__form__input"
                    placeholder="Address Line 1..."
                    v-model="company.invoice_address"
                />
              </div>
              <label class="senex__form__label" for="form_company_invoice_address">Address Line 1</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <input
                    id="form_company_invoice_address2"
                    type="text"
                    name="invoice_address2"
                    class="senex__form__input"
                    placeholder="Address Line 2..."
                    v-model="company.invoice_address2"
                />
              </div>
              <label class="senex__form__label" for="form_company_invoice_address2">Address Line 2</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item senex__form__item--flex-5">
              <div class="senex__form__field">
                <input
                    id="form_company_invoice_city"
                    type="text"
                    name="invoice_city"
                    class="senex__form__input"
                    placeholder="City..."
                    v-model="company.invoice_city"
                />
              </div>
              <label class="senex__form__label" for="form_company_invoice_city">City</label>
            </div>

            <div class="senex__form__item senex__form__item--flex-1">
              <div class="senex__form__field">
                <input
                    id="form_company_invoice_state"
                    type="text"
                    name="invoice_state"
                    class="senex__form__input"
                    placeholder="ST..."
                    v-model="company.invoice_state"
                />
              </div>
              <label class="senex__form__label" for="form_company_invoice_state">ST</label>
            </div>

            <div class="senex__form__item senex__form__item--flex-2">
              <div class="senex__form__field">
                <input
                    id="form_company_invoice_zip"
                    type="text"
                    name="invoice_zip"
                    class="senex__form__input"
                    placeholder="Zip..."
                    v-model="company.invoice_zip"
                />
              </div>
              <label class="senex__form__label" for="form_company_invoice_zip">Zip</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <input
                    id="form_company_invoice_email"
                    type="text"
                    name="invoice_email"
                    class="senex__form__input"
                    placeholder="Email..."
                    v-model="company.invoice_email"
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
              <div class="senex__form__field">
                <input
                    id="form_company_contact_name"
                    type="text"
                    name="contact_name"
                    class="senex__form__input"
                    placeholder="Name..."
                    v-model="company.contact_name"
                />
              </div>
              <label class="senex__form__label" for="form_company_contact_name">Name</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <input
                    id="form_company_contact_phone"
                    type="tel"
                    name="contact_phone"
                    class="senex__form__input"
                    v-model="company.contact_phone"
                />
              </div>
              <label class="senex__form__label" for="form_company_contact_phone">Phone</label>
            </div>
          </div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <input
                    id="form_company_contact_email"
                    type="email"
                    name="contact_email"
                    class="senex__form__input"
                    placeholder="Email..."
                    v-model="company.contact_email"
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
                    <input type="checkbox" name="policies[]" class="senex__form__checkbox" v-model="companyPolicies"
                           :id="'form_company_policy_' + policy.id" :value="policy.id">
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
                    <input type="checkbox" name="policies[]" class="senex__form__checkbox" v-model="company.policies"
                           :id="'form_company_policy_' + policy.id" :value="policy">
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
          <div class="senex__form__header">Property Mangement Software</div>
          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <select name="pm_software_id" id="form_company_pm_software_id" class="senex__form__select"
                        v-model="company.pm_software_id">
                  <option :value="pmSoftware.id" v-for="pmSoftware in pmSoftwares">{{ pmSoftware.name }}</option>
                </select>
              </div>
              <label class="senex__form__label" for="form_company_pm_software_id">PM Software</label>
            </div>
          </div>

          <div class="senex__form__header">Client Website</div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <input
                    id="form_company_url"
                    type="text"
                    name="url"
                    class="senex__form__input"
                    placeholder="Website URL..."
                    v-model="company.url">
                />
              </div>
              <label class="senex__form__label" for="form_company_url">Website URL</label>
            </div>
          </div>

          <div class="senex__form__header">UD Filing Threshold</div>

          <div class="senex__form__item-group">
            <div class="senex__form__item">
              <div class="senex__form__field">
                <input
                    id="form_company_ud_filing_threshold"
                    type="number"
                    name="ud_filing_threshold"
                    v-model="company.ud_filing_threshold"
                    class="senex__form__input"
                    placeholder="UD Filing Threshold..."
                    required
                    min="0"
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

const {activeCompany, saveCompany} = storeToRefs(useCompanyStore())
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
  policies: [],
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

watch(activeCompany, async () => {
  if (activeCompany.value?.id) {
    try {
      company.value = (await companyService.getCompany(activeCompany.value.id))

      console.log(company.value)
    } catch (error) {
      console.log(error)
    }
  }
})

let companyPolicies: number[] = [];

if (activeCompany.value?.id) {
  try {
    company.value = (await companyService.getCompany(activeCompany.value.id, {tab: 'info'}))

    console.log(company.value)

    companyPolicies = company.value.policies.map((policy: PolicyList) => policy.id)

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
</script>
