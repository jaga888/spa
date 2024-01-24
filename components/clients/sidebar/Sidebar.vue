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
              Export
              <i class="fa fa-caret-down"></i>
              <ul class="senex__detail-menu__sub-menu">
                <li class="senex__detail-menu__sub-menu-item">
                  <a href="#" target="_blank"><i class="fa fa-print"></i>Print</a>
                </li>
                <li class="senex__detail-menu__sub-menu-item">
                  <a href="#"><i class="fa fa-file-pdf-o"></i>Save PDF</a>
                </li>
                <li class="senex__detail-menu__sub-menu-item">
                  <a href="#"><i class="fa fa-table"></i>Save CSV</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="senex__body">
      <Companies />
    </div>

    <div class="senex__footer senex__form senex__strip">
      <div class="senex__strip__left">
        <div class="senex__form__field">
          <div class="senex__form__field-add-on"><i class="fa fa-filter"></i></div>
          <input type="text"
                 name="companies-filter"
                 id="companies_filter"
                 class="senex__form__input client-mgmt-company-search"
                 placeholder="Filter clients..."
                 @input="setFilter"/>
          <label for="companies_filter"></label>
          <div class="senex__form__field-add-on senex__form__field-add-on--button">
            <a class="senex__clients__remove-search-companies">
              <i class="fa fa-times" style="color: white"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="senex__stripright">
        <Button class="senex__clients__add-company" @click.prevent="setIsNewCompany">Add Client</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Companies from "~/components/clients/sidebar/Companies.vue";
import {useCompaniesStore} from "~/store/company";

const { setFilter, setIsNewCompany } = useCompaniesStore();
</script>
