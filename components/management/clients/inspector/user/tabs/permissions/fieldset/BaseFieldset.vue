<template>
  <fieldset class="senex__form__fieldset">
    <div class="senex__form__header">Name</div>

    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.first_name.$dirty}">
            <input
                type="text"
                name="first_name"
                class="senex__form__input"
                placeholder="First Name..."
                id="form_user_first_name"
                @input="$emit('update:firstName', ($event.target as HTMLInputElement).value)"
                :value="firstName"
                @keyup="setDirty(validation.first_name)"
                autocomplete="true"
            />
          </div>

          <span class="error" style="color: red" v-if="validation.first_name.required.$invalid">
            {{ validation.first_name.required.$message }}
          </span><br v-if="validation.first_name.required.$invalid">
          <label class="senex__form__label" for="form_user_first_name">First Name</label>
        </div>

        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.last_name.$dirty}">
            <input
                type="text"
                name="last_name"
                class="senex__form__input"
                placeholder="Last Name..."
                id="form_user_last_name"
                @input="$emit('update:lastName', ($event.target as HTMLInputElement).value)"
                :value="lastName"
                @keyup="setDirty(validation.last_name)"
                autocomplete="true"
            />
          </div>

          <span class="error" style="color: red" v-if="validation.last_name.required.$invalid">
            {{ validation.last_name.required.$message }}
          </span><br v-if="validation.last_name.required.$invalid">
          <label class="senex__form__label" for="form_user_last_name">Last Name</label>
        </div>
      </div>
    </div>

    <div class="senex__form__header">Email</div>

    <div class="senex__form__block">
      <div class="senex__form__text">
        The email address will be used for password notifications, so please make sure it is correct!
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field" :class="{'senex__form__field--dirty': validation.email.$dirty}">
            <input
                type="text"
                name="email"
                class="senex__form__input"
                placeholder="Email..."
                id="form_user_email"
                @input="$emit('update:email', ($event.target as HTMLInputElement).value)"
                :value="email"
                @keyup="setDirty(validation.email)"
                autocomplete="true"
            />
          </div>

          <span class="error" style="color: red" v-if="validation.email.required.$invalid">
            {{ validation.email.required.$message }}
          </span><br v-if="validation.email.required.$invalid">
          <span class="error" style="color: red" v-if="validation.email.email.$invalid">
            {{ validation.email.email.$message }}
          </span><br v-if="validation.email.email.$invalid">
          <label class="senex__form__label" for="form_user_email">Email</label>
        </div>
      </div>

    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/user";
import type {Validation} from "@vuelidate/core";
import type {User} from "~/services/user/types";

defineProps({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  validation: {
    type: Object as PropType<Validation<User>>,
    default: <Validation<User>>{}
  },
})

const {setIsDirty} = useUserStore();

const setDirty = (element: { $touch: any; } | undefined = undefined) => {
  if (element) {
    element.$touch();
  }

  setIsDirty(true)
}
</script>
