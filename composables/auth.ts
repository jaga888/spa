// import { router } from '../router';
// import { readonly, ref } from 'vue';
// import Api from '../services/api';

import type {DeepReadonly} from "vue";

export interface User {
  email: string;
  name: string;
}

const user = ref(<User>{});

export const useAuth = () => {
  const login = async (form: object) => {
    const [data] = await Promise.all([$fetch('http://localhost:8000/api/admin/login', {
      method: 'post',
      body: form
    })]);
    console.log(11)
    if (data.token) {
      localStorage.setItem('accessToken', data.token);
    } else {
      console.log(data);
    }
  };
  return {
    authState: readonly({
      user: user,
    }),
    login,
    // logout,
  };
};
