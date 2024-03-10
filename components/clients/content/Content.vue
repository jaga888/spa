<template>
  <div class="senex__column senex__column--empty" v-if="!activeCompany?.id && !isNewCompany">
    <div class="senex__body">
      <div class="senex__sketch">
        <p>Choose a client from the left pane.</p>
        <div class="senex__sketch__arrow senex__sketch__arrow--purple-curved-down-left" style="height:100px;"></div>
      </div>
    </div>
  </div>

  <div class="senex__column senex__column--content senex__column--company" v-if="activeCompany?.id || isNewCompany">
    <div class="senex__header">
      <div class="senex__header__top senex__strip">
        <div class="senex__strip__left">
          <div class="senex__icon is-leftmost-column senex__button__back" style="display: none">
            <i class="fa fa-arrow-left"></i> Back
          </div>
        </div>

        <div class="senex__strip__center">
          <div class="senex__text">Client Company</div>
        </div>

        <div class="senex__strip__right">
          <div class="senex__icon is-rightmost-column senex__button__forward" style="display: none">
            Info <i class="fa fa-arrow-right"></i>
          </div>
        </div>
      </div>

      <div class="senex__header__middle">
        <div class="senex__header__left">
          <div class="senex__header__title">{{ activeCompany?.name }}</div>
        </div>
      </div>

      <div class="senex__header__bottom">
        <div class="senex__header__left">
          <ul class="senex__detail-menu">
            <li :class="{
                  'senex__detail-menu__item--active': activeContentTab === activeContentTabProperties || (isNewCompany && activeContentTab !== activeContentTabUsers)
                }"
                @click="setActiveContentTab(activeContentTabProperties)"
                class="senex__detail-menu__item senex__detail-menu__item--tab">
              Properties
            </li>
            <li :class="{'senex__detail-menu__item--active': activeContentTab === activeContentTabUsers}"
                @click="setActiveContentTab('users')"
                class="senex__detail-menu__item senex__detail-menu__item--tab">
              Users
            </li>
            <li class="senex__detail-menu__item senex__detail-menu__item--right senex__detail-menu__item--tab">
              <ManageExport/>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="senex__body">
      <ul class="senex__list senex__list--selectable list properties-list" id="tab-content-wrapper">
        <Properties v-if="activeContentTab === activeContentTabProperties"/>
        <Users v-if="activeContentTab === activeContentTabUsers"/>
      </ul>
    </div>

    <div class="senex__footer senex__form senex__strip">
      <div class="senex__strip__left">
        <div class="senex__form__field">
          <div class="senex__form__field-add-on">
            <FilterIcon/>
          </div>
          <input type="text"
                 class="senex__form__input client-mgmt-property-search"
                 name="properties-filter"
                 id="properties_filter"
                 v-if="activeContentTab === activeContentTabProperties"
                 v-model="searchProperty"
                 @input="setPropertyFilter(searchProperty)"
                 placeholder="Filter properties..."/>
          <input type="text"
                 class="senex__form__input client-mgmt-user-search"
                 id="users_filter"
                 v-if="activeContentTab === activeContentTabUsers"
                 v-model="searchUser"
                 @input="setUserFilter(searchUser)"
                 placeholder="Filter users..."/>
          <label for="properties_filter" v-if="activeContentTab === activeContentTabProperties"></label>
          <label for="users_filter" v-if="activeContentTab === activeContentTabUsers"></label>
          <div class="senex__form__field-add-on senex__form__field-add-on--button">
            <button class="remove_filter_icon senex__clients__remove-search-properties"
                    :disabled="
                      (activeContentTab === activeContentTabProperties && searchProperty === '') || (activeContentTab === activeContentTabUsers && searchUser === '')
                    "
                    @click="clearFilter">
              <CancelIcon stroke="#2c3e50"/>
            </button>
          </div>
        </div>
      </div>

      <div class="senex__strip__right" v-if="activeContentTab === activeContentTabProperties">
        <Button v-if="activeContentTab === activeContentTabProperties" class="senex__clients__add-property"
                :disabled="isNewProperty"
                @click.prevent="setIsNewProperty">
          Add Property
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCompanyStore} from "~/store/company";
import ManageExport from "~/components/blocks/ManageExport.vue";
import {useClientStore} from "~/store/client";
import Properties from "~/components/clients/content/Properties.vue";
import FilterIcon from "~/components/icons/FilterIcon.vue";
import CancelIcon from "~/components/icons/CancelIcon.vue";
import {usePropertyStore} from "~/store/property";
import Users from "~/components/clients/content/Users.vue";
import {useUserStore} from "~/store/user";

const {
  activeCompany,
  isNewCompany
} = storeToRefs(useCompanyStore());
const {
  activeContentTab,
  activeContentTabProperties,
  activeContentTabUsers
} = storeToRefs(useClientStore());
const {setActiveContentTab} = useClientStore();
const {isNewProperty} = storeToRefs(usePropertyStore());
const {
  setPropertyFilter,
  setIsNewProperty
} = usePropertyStore();
const {setUserFilter} = useUserStore();
const searchProperty = ref("");
const searchUser = ref("");

watch(activeCompany, async () => {
  setActiveContentTab(activeContentTabProperties.value);
});

const clearFilter = () => {
  activeContentTab.value === activeContentTabProperties.value ? searchProperty.value = "" : searchUser.value = "";

  activeContentTab.value === activeContentTabProperties.value
      ? setPropertyFilter(searchProperty.value)
      : setUserFilter(searchUser.value);
};
</script>
