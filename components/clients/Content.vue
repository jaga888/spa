<template>
  <div class="senex__column senex__column--loading senex__column--blue" v-if="activeCompanyId"></div>

  <div class="senex__column senex__column--empty">
    <div class="senex__body">
      <div class="senex__sketch">
        <p>Choose a client from the left pane.</p>
        <div class="senex__sketch__arrow senex__sketch__arrow--purple-curved-down-left" style="height:100px;"></div>
      </div>
    </div>
  </div>

  <div class="senex__column senex__column--content senex__column--company" style="display: none">
    <div class="senex__header">
      <div class="senex__header__top senex__strip">
        <div class="senex__strip__left">
          <div class="senex__icon is-leftmost-column senex__button__back">
            <i class="fa fa-arrow-left"></i> Back
          </div>
        </div>

        <div class="senex__strip__center">
          <div class="senex__text">Client Company</div>
        </div>

        <div class="senex__strip__right">
          <div class="senex__icon is-rightmost-column senex__button__forward">
            Info <i class="fa fa-arrow-right"></i>
          </div>
        </div>
      </div>

      <div class="senex__header__middle">
        <div class="senex__header__left">
          <div class="senex__header__title"></div>
        </div>
      </div>

      <div class="senex__header__bottom">
        <div class="senex__header__left">
          <ul data-company-id=""
              data-company-name=""
              data-property-id=""
              data-user-id=""
              class="senex__detail-menu">
            <li
                class="senex__detail-menu__item senex__detail-menu__item--tab properties-tab senex__detail-menu__item--active">
              Properties
            </li>
            <li
                data-scope="users"
                class="senex__detail-menu__item senex__detail-menu__item--tab users-tab">
              Users
            </li>
            <li class="senex__detail-menu__item senex__detail-menu__item--right">
              Export <i class="fa fa-caret-down"></i>
              <ul class="senex__detail-menu__sub-menu">
                <li class="senex__detail-menu__sub-menu-item">
                  <a href="" target="_blank"><i class="fa fa-print"></i>Print</a>
                </li>
                <li class="senex__detail-menu__sub-menu-item">
                  <a href=""><i class="fa fa-file-pdf-o"></i>Save PDF</a>
                </li>
                <li class="senex__detail-menu__sub-menu-item">
                  <a href=""><i class="fa fa-table"></i>Save CSV</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="senex__body">
      <ul class="senex__list senex__list--selectable list properties-list" id="tab-content-wrapper">
      </ul>
    </div>

    <div class="senex__footer senex__form senex__strip">
      <div class="senex__strip__left">
        <div class="senex__form__field">
          <div class="senex__form__field-add-on"><i class="fa fa-filter"></i></div>
          <input type="text"
                 class="senex__form__input client-mgmt-property-search"
                 name="properties-filter"
                 id="properties_filter"
                 placeholder="Filter properties..."/>
          <input type="text"
                 class="senex__form__input client-mgmt-user-search"
                 id="users_filter"
                 style="display: none"
                 placeholder="Filter users..."/>
          <label for="properties_filter"></label>
          <label for="users_filter"></label>
          <div class="senex__form__field-add-on senex__form__field-add-on--button">
            <a class="remove_filter_icon senex__clients__remove-search-properties">
              <i class="fa fa-times"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="senex__strip__right">
        <button class="senex__button senex__clients__add-property" data-company-id="1">
          Add Property
        </button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import {useCompaniesStore} from "~/store/company";

const api = useNuxtApp().$api;

const { activeCompanyId } = storeToRefs(useCompaniesStore());

const activeCompany = async (id: number) => {
  if (id) {
    try {
      const data = (await api.get('/api/admin/companies/' + id)).data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

watch(activeCompanyId, () => {
  if (activeCompanyId.value) {
    activeCompany(activeCompanyId.value);
  }
});
</script>
