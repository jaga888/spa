<template>
  <li class="senex__list__item"
      v-if="!isNewCompany"
      @click="setActiveUser(user)"
      :class="{'senex__list__item--active': activeUser?.id === user.id}">
    <div class="senex__list__item-title">{{ user.first_name }} {{ user.last_name }}</div>
  </li>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/user";
import {useCompanyStore} from "~/store/company";
import type {PropType} from "vue";
import type {UserList} from "~/services/user/types";

const {isNewCompany} = storeToRefs(useCompanyStore())
const {setActiveUser} = useUserStore()
const {activeUser} = storeToRefs(useUserStore())

defineProps({
  user: {
    type: Object as PropType<UserList>,
    default: <UserList>{}
  },
});
</script>
