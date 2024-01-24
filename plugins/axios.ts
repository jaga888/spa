import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    const defaultUrl = "http://localhost:8000";

    const { token } = useAuth();

    let api = axios.create({
        baseURL: defaultUrl,
        headers: {
            common: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token.value
            },
        },
    });

    return {
        provide: {
            api: api,
        },
    };
});
