import {defineStore} from 'pinia';

interface UserPayloadInterface {
    email: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        user: {
            id: null,
            first_name: null,
            last_name: null
        }
    }),
    actions: {
        async authenticateUser({email, password}: UserPayloadInterface) {
            // useFetch from nuxt 3
            const {data, pending}: any = await useFetch('http://localhost:8000/api/admin/login', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: {
                    email,
                    password,
                },
            });
            this.loading = pending;

            if (data.value) {
                const token = useCookie('token'); // useCookie new hook in nuxt 3
                token.value = data?.value?.token; // set token to cookie
                this.authenticated = true; // set authenticated  state value to true
                this.user = data?.value?.user;
            }
        },
        logUserOut() {
            const token = useCookie('token'); // useCookie new hook in nuxt 3
            this.authenticated = false; // set authenticated  state value to false
            token.value = null; // clear the token cookie
        },
    },
});
