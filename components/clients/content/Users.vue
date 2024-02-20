<template>
  <li class="senex__list__item senex__list__item--no-users" v-if="!users.length || isNewCompany">
    <div class="senex__list__item-text">No users.</div>
  </li>
  <li class="senex__list__item" v-for="user in users" v-if="!isNewCompany"
      @click="setActiveUser(user)"
      :class="{'senex__list__item--active': activeUser?.id === user.id}">
    <div class="senex__list__item-title">{{ user.first_name }} {{ user.last_name }}</div>
  </li>
</template>

<script setup lang="ts">
import {userService} from "~/services/user/service";
import type {UserList} from "~/services/user/types";
import {useCompanyStore} from "~/store/company";
import {useDebounceFn} from "@vueuse/core";
import {useUserStore} from "~/store/user"

const {activeCompany, isNewCompany} = storeToRefs(useCompanyStore())
const users = ref<UserList[]>([])
const {filter, activeUser} = storeToRefs(useUserStore())
const {setActiveUser} = useUserStore()

if (activeCompany.value?.id) {
  try {
    users.value = (await userService.getUsers({
      sort: 'first_name,last_name',
      'filter[company_id]': activeCompany.value?.id
    }))

    console.log(users.value)
  } catch (error) {
    console.log(error)
  }
}

const debouncedFn = useDebounceFn(async () => {
  users.value = (await userService.getUsers({
    sort: 'first_name,last_name',
    'filter[company_id]': activeCompany.value?.id,
    'filter[full_name]': filter.value,
  }))

  console.log(users.value)
}, 200)

watch(filter,  () => {
  if (!isNewCompany.value) {
    try {
      debouncedFn();
    } catch (response) {
      console.log(response)
    }
  }
})

</script>
