<template>
  <div class="senex__body user-permissions">
    <form class="senex__form senex__clients__permissions-form" method="post" action="/">
      <fieldset class="senex__form__fieldset">
        <div class="senex__form__header">Properties</div>
        <div class="senex__form__text">Select the properties available in Senex Client for this user.</div>

        <div class="senex__form__text">
          <a class="senex__script__select-all-button senex__clients__select-all-properties"
             @click.prevent="selectAll"
          >Select all</a> |
          <a class="senex__script__select-none-button senex__clients__select-none-properties"
             @click.prevent="selectNone"
          >Select none</a>
        </div>

        <div class="senex__form__block">
          <Property v-for="property in properties" :property="property" v-model:propertyIds="user.property_ids">
            {{ property.short_name}}
          </Property>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/user";
import type {UserPermissions} from "~/services/user/types";
import {userService} from "~/services/user/service";
import Property from "~/components/clients/inspector/user/tabs/permissions/Property.vue";
import type {PropertyList} from "~/services/property/types";
import {propertyService} from "~/services/property/service";
import {useCompanyStore} from "~/store/company";

const {
  activeUser,
  saveUser,
  isDirty,
} = storeToRefs(useUserStore());

const {
  setSaveUser,
  setIsDirty
} = useUserStore();

const user = ref<UserPermissions>(<UserPermissions>{});

const properties = ref<PropertyList[]>([]);

const {activeCompany} = storeToRefs(useCompanyStore());

watch(activeUser, async () => {
  console.log(activeUser.value);
  if (activeUser.value?.id && activeCompany.value?.id) {
    try {
      if (!isDirty.value) {
        user.value = (await userService.getUserPermissions(activeUser.value.id, {tab: "permissions"}));

        console.log(user.value);

        properties.value = (await propertyService.getProperties({
          sort: "name",
          "filter[company_id]": activeCompany.value.id
        }));

        console.log(properties.value);
      } else {
        setIsDirty(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

setIsDirty(false);

if (activeUser.value?.id && activeCompany.value?.id) {
  try {
      user.value = (await userService.getUserPermissions(activeUser.value.id, {tab: "permissions"}));

      console.log(user.value);

      properties.value = (await propertyService.getProperties({
        sort: "name",
        "filter[company_id]": activeCompany.value.id
      }));

      console.log(properties.value);
  } catch (error) {
    console.log(error);
  }
}

watch(saveUser, async () => {
  if (saveUser.value) {
    console.log(user.value);
    setSaveUser(false);
  }
});

watch(isDirty, async () => {
  console.log(isDirty.value);
  if (!isDirty.value && activeUser.value && activeCompany.value?.id) {
    user.value = (await userService.getUserPermissions(activeUser.value.id, {tab: "permissions"}));

    console.log(user.value);

    properties.value = (await propertyService.getProperties({
      sort: "name",
      "filter[company_id]": activeCompany.value.id
    }));

    console.log(properties.value);
  }
});

const selectAll = () => {
  properties.value.forEach((property) => {
    if (!user.value.property_ids.includes(property.id)) {
      user.value.property_ids.push(property.id);
    }
  });
  setIsDirty(true);
}

const selectNone = () => {
  user.value.property_ids = [];
  setIsDirty(true);
}
</script>
