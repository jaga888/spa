<template>
  <form class="senex__form" method="POST" action="#" @submit.prevent="formSubmit">
    <div class="senex__form__block">
      <div class="senex__form__header">Login</div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field">
            <input id="form-login-email"
                   type="email"
                   class="senex__form__input"
                   name="email"
                   v-model="user.email"
                   autocomplete="off">
          </div>
          <label class="senex__form__label" for="form-login-email">Email</label>
          <span class="help-block">
              <strong></strong>
          </span>
        </div>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <div class="senex__form__field">
            <input id="form-login-password"
                   type="password"
                   class="senex__form__input"
                   name="password"
                   v-model="user.password">
          </div>
          <label class="senex__form__label" for="form-login-email">Password</label>
          <span class="help-block">
              <strong></strong>
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
import { useAuth } from '~/composables/auth';

const { login } = useAuth();
const user = ref({
  email: '',
  password: ''
});

const errors = ref({
  email: {
    isError: false,
    message: ''
  },
  password: {
    isError: false,
    message: ''
  },
});

const formSubmit = async () => {
  //  const {data} = useFetch('http://localhost:8000/api/admin/login', {
  //   method: 'post',
  //   body: user.value
  // });
  const a = login(user.value);
  console.log(a);
};
</script>