<template>
  <div class="senex__column senex__column--empty" v-if="!activeCompany?.id && !isNewCompany">
    <div class="senex__body">
      <div class="senex__sketch" style="position: absolute; right: 0;">
        <div class="senex__sketch__arrow  senex__sketch__arrow--purple-straight-up-up-right"></div>
        <p style="clear: both" class="senex__sketch__message">Need more help?</p>
      </div>
    </div>
  </div>

  <div id="company-information" class="senex__column senex__column--inspector senex__column--company"
       v-if="activeCompany?.id || isNewCompany">
    <div class="senex__header">
      <div class="senex__header__top senex__strip">
        <div class="senex__strip__left">
          <div class="senex__icon is-leftmost-column senex__button__back" style="display: none">
            <i class="fa fa-arrow-left"></i> Back
          </div>
        </div>
      </div>

      <div class="senex__header__middle"></div>

      <div class="senex__header__bottom">
        <div class="senex__header__left">
          <ul class="senex__detail-menu">
            <li class="senex__detail-menu__item senex__detail-menu__item--tab"
                :class="{'senex__detail-menu__item--active': activeTab === 'information'}"
                @click="setActiveTab('information')">
              Information
            </li>
            <li class="senex__detail-menu__item senex__detail-menu__item--tab ml-1.5"
                :class="{'senex__detail-menu__item--active': activeTab === 'fees'}"
                @click="setActiveTab('fees')">
              Fees
            </li>
            <li class="senex__detail-menu__item senex__detail-menu__item--tab ml-1.5"
                :class="{'senex__detail-menu__item--active': activeTab === 'files'}"
                @click="setActiveTab('files')">
              Files
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Information />
    <Fees />

    <div class="senex__footer">
      <div class="senex__strip__left">
        <CompanyButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCompanyStore} from "~/store/company";
import Information from "~/components/clients/inspector/company/Information.vue";
import Fees from "~/components/clients/inspector/company/Fees.vue";

const {activeCompany, isNewCompany, activeTab} = storeToRefs(useCompanyStore())
const {setActiveTab} = useCompanyStore()

watch(activeCompany, async () => {
  setActiveTab('information')
})
</script>
