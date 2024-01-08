<template>
  <form id="form-login" class="senex__form" method="POST" action="#" @submit.prevent="formSubmit">
    <div class="senex__form__block">
      <div class="senex__form__header">Login</div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <label class="senex__form__label" for="form-login-email">Email</label>
          <div class="senex__form__field">
            <input id="form-login-email"
                   type="email"
                   class="senex__form__input"
                   :class="{
                      'border-red-500 focus:border-red-500': v$.email.$error,
                      'border-[rgb(189, 195, 199)] ': !v$.email.$invalid,
                    }"
                   name="email"
                   v-model="user.email"
                   @change="v$.email.$touch"
                   autocomplete="off">
          </div>
          <span class="help-block">
            <strong v-if="v$.email.required.$invalid">{{ v$.email.required.$message }}</strong>
            <strong v-if="v$.email.email.$invalid">{{ v$.email.email.$message }}</strong>
          </span>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <label class="senex__form__label" for="form-login-email">Password</label>
          <div class="senex__form__field relative">
            <input id="form-login-password"
                   type="password"
                   class="senex__form__input"
                   :class="{
                      'border-red-500 focus:border-red-500': v$.password.$error,
                      'border-[rgb(189, 195, 199)] ': !v$.password.$invalid,
                    }"
                   name="password"
                   @change="v$.password.$touch"
                   v-model="user.password">
          </div>
          <span class="help-block">
            <strong v-if="v$.password.required.$invalid">{{ v$.password.required.$message }}</strong>
            <strong v-if="v$.password.minLength.$invalid">{{ v$.password.minLength.$message }}</strong>
          </span>
        </div>
      </div>
    </div>

    <div class="senex__form__block">
      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <button type="submit" class="senex__button--save-fee senex__button senex__button--save">
            Login
          </button>
        </div>
        <div class="senex__form__item" style="text-align: right">
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia'; // import storeToRefs helper hook from pinia
import {useAuthStore} from '~/store/auth'; // import the auth store we just created
import {required, email, minLength, helpers} from '@vuelidate/validators';
import {useVuelidate} from '@vuelidate/core';

const {authenticateUser} = useAuthStore(); // use authenticateUser action from  auth store

const {authenticated} = storeToRefs(useAuthStore());

const user = ref({
  email: '',
  password: ''
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: minLength(6),
    },
  };
});

const v$ = useVuelidate(rules, user);

const router = useRouter();

const formSubmit = async () => {
  await v$.value.$validate();

  if (!v$.value.$error) {
    await authenticateUser(user.value); // call authenticateUser and pass the user object
    console.log('1', authenticated);
    // redirect to homepage if user is authenticated
    if (authenticated) {
      router.push('/');
    }
  }
};
</script>
