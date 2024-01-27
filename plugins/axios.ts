import axios, {type AxiosRequestConfig, type AxiosResponse, type AxiosInstance} from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const defaultUrl = config.public.HOST_API

    const { token } = useAuth()

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

    const getResponseData = <T>(response: AxiosResponse<T>): T => response.data

    const getHttpWrapper = (axiosInstance: AxiosInstance) => {
        return {
            get: <Res>(url: string, config?: AxiosRequestConfig) =>
                axiosInstance.get<Res>(url, config).then(getResponseData),
            post: <Res, Req = unknown>(url: string, body?: Req) =>
                axiosInstance.post<Res>(url, body).then(getResponseData),
            patch: <Res, Req = unknown>(url: string, body?: Req) =>
                axiosInstance.patch<Res>(url, body).then(getResponseData),
            delete: <Res = void, Req = unknown>(url: string, params?: Req) =>
                axiosInstance.delete<Res>(url, { params: { ids: params } }).then(getResponseData),
            put: <Res, Req = unknown>(url: string, body?: Req) =>
                axiosInstance.put<Res>(url, body).then(getResponseData),
        };
    };
    const httpRequest = () => getHttpWrapper(api)

    return {
        provide: {
            api: httpRequest,
            apiHeaders: api.defaults.headers,
        },
    };
});


