<template>
  <div class="senex__body user-information">
    <form class="senex__form senex__clients__info-form" method="post" action="/">
      <BaseFieldset
          v-model:firstName="user.first_name"
          v-model:lastName="user.last_name"
          v-model:email="user.email"
          :validation="validation"
      />

      <SignatureFieldset :signatures="user.signatures"/>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/user";
import type {User} from "~/services/user/types";
import BaseFieldset from "~/components/clients/inspector/user/tabs/information/fieldset/BaseFieldset.vue";
import SignatureFieldset from "~/components/clients/inspector/user/tabs/information/fieldset/SignatureFieldset.vue";
import {email, helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {userService} from "~/services/user/service";

const {
  activeUser,
  saveUser,
  isDirty,
} = storeToRefs(useUserStore());

const {
  setSaveUser,
  setIsDirty
} = useUserStore();

const user = ref<User>(<User>{});

const rules = {
  first_name: {
    required: helpers.withMessage("The first name field is required", required),
    $autoDirty: true,
    $lazy: true,
  },
  last_name: {
    required: helpers.withMessage("The last name field is required", required),
    $autoDirty: true,
    $lazy: true,
  },
  email: {
    required: helpers.withMessage("The email field is required", required),
    email: helpers.withMessage('Invalid email format', email),
    $autoDirty: true,
    $lazy: true,
  },
};

const validation = useVuelidate(
    rules,
    user
);

watch(activeUser, async () => {
  console.log(activeUser.value);
  if (activeUser.value?.id) {
    try {
      if (!isDirty.value) {
        user.value = (await userService.getUser(activeUser.value.id, {tab: "info"}));

        console.log(user.value);

        validation.value.$reset();
      } else {
        setIsDirty(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

setIsDirty(false);

if (activeUser.value?.id) {
  try {
    user.value = (await userService.getUser(activeUser.value.id, {tab: "info"}));

    console.log(user.value);

    validation.value.$reset();
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
  if (!isDirty.value && activeUser.value) {
    user.value = (await userService.getUser(activeUser.value.id, {tab: "info"}));

    console.log(user.value);

    validation.value.$reset();
  }
});
</script>
