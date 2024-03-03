<template>
  <div class="senex__column senex__column--sidebar">
    <div class="senex__header">
      <div class="senex__header__top senex__strip">
        <div class="senex__strip__left">
          <div class="senex__icon one-column-only">
            <i class="fa fa-bars"></i>
          </div>
        </div>
        <div class="senex__strip__center">
          <div class="senex__text">Management</div>
        </div>
        <div class="senex__strip__right"></div>
      </div>

      <div class="senex__header__middle">
        <div class="senex__header__left">
          <div class="senex__header__title">
            Clients & Properties
          </div>
        </div>
      </div>

      <div class="senex__header__bottom">
        <div class="senex__header__left">
          <ul class="senex__detail-menu">
            <li class="senex__detail-menu__item">&nbsp;</li>
            <li class="senex__detail-menu__item senex__detail-menu__item--right">
              <ManageExport/>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="senex__body">
      <Companies/>
    </div>

    <div class="senex__footer senex__form senex__strip">
      <div class="senex__strip__left">
        <div class="senex__form__field">
          <div class="senex__form__field-add-on">
            <FilterIcon/>
          </div>
          <input type="text"
                 v-model="search"
                 name="companies-filter"
                 id="companies_filter"
                 class="senex__form__input client-mgmt-company-search"
                 placeholder="Filter clients..."
                 @input="setFilter(search)"/>
          <label for="companies_filter"></label>
          <div class="senex__form__field-add-on senex__form__field-add-on--button">
            <button class="senex__clients__remove-search-companies"
                    :disabled="search === ''"
                    @click.prevent="clearFilter">
              <CancelIcon/>
            </button>
          </div>
        </div>
      </div>

      <div class="senex__stripright">
        <Button class="senex__clients__add-company" :disabled="isNewCompany" @click.prevent="setIsNewCompany">
          Add Client
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Companies from "~/components/clients/sidebar/Companies.vue";
import {useCompanyStore} from "~/store/company";
import CancelIcon from "~/components/icons/CancelIcon.vue";
import ManageExport from "~/components/blocks/ManageExport.vue";
import FilterIcon from "~/components/icons/FilterIcon.vue";

const search = ref("");

const {isNewCompany} = storeToRefs(useCompanyStore());

const {
  setFilter,
  setIsNewCompany
} = useCompanyStore();

const clearFilter = () => {
  search.value = "";

  setFilter(search.value);
};
</script>
