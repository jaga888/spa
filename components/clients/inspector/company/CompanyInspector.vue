<template>
  <div class="senex__column senex__column--empty" v-if="!activeCompany?.id && !isNewCompany">
    <div class="senex__body">
      <div class="senex__sketch" style="position: absolute; right: 0;">
        <div class="senex__sketch__arrow  senex__sketch__arrow--purple-straight-up-up-right"></div>
        <p style="clear: both" class="senex__sketch__message">Need more help?</p>
      </div>
    </div>
  </div>

  <div id="company-information"
       class="senex__column senex__column--inspector senex__column--company"
       v-if="activeCompany?.id || isNewCompany"
  >
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
                :class="{'senex__detail-menu__item--active': activeTab === activeTabInformation}"
                @click="activeTab = activeTabInformation">
              Information
            </li>
            <li class="senex__detail-menu__item senex__detail-menu__item--tab ml-1.5"
                :class="{'senex__detail-menu__item--active': activeTab === activeTabFees}"
                @click="activeTab = activeTabFees">
              Fees
            </li>
            <li class="senex__detail-menu__item senex__detail-menu__item--tab ml-1.5"
                :class="{'senex__detail-menu__item--active': activeTab === activeTabFiles}"
                @click="activeTab = activeTabFiles">
              Files
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Information v-if="activeTab === activeTabInformation"/>
    <Fees v-if="activeTab === activeTabFees"/>
    <Files v-if="activeTab === activeTabFiles"/>

    <div class="senex__footer" v-if="activeTab === activeTabInformation">
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
import Files from "~/components/clients/inspector/company/Files.vue";
import CompanyButton from "~/components/clients/inspector/company/CompanyButton.vue"

const {
  activeCompany,
  isNewCompany,
} = storeToRefs(useCompanyStore());

const activeTabInformation: string = "information";
const activeTabFees: string = "fees";
const activeTabFiles: string = "files";

const activeTab = ref(activeTabInformation)

watch(activeCompany, async () => {
  activeTab.value = activeTabInformation;
});
</script>
