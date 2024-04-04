<template xmlns="http://www.w3.org/1999/html">
  <li class="senex__list__item" @click="setActiveUser(user)">
    <div class="senex__list__item-title">
      <slot/>
    </div>
  </li>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/user";
import type {PropType} from "vue";
import type {UserList} from "~/services/user/types";

const {setActiveUser} = useUserStore();

defineProps({
  user: {
    type: Object as PropType<UserList>,
    default: <UserList>{}
  },
});
</script>
