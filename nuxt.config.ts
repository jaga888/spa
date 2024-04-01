export default defineNuxtConfig({
    $development: undefined,
    $env: undefined,
    runtimeConfig: {
        public: {
            HOST_API: process.env.HOST_API
        }
    },
    $meta: undefined,
    $production: undefined,
    $test: undefined,
    ssr: false,
    app: {
        head: {
            title: "Senex",
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: "@use \"/assets/scss/senex.scss\" as *;"
                }
            }
        }
    },
    modules: [
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
        "@sidebase/nuxt-auth",
        "@vueuse/nuxt",
        "@nuxtjs/mdc",
    ],
    auth: {
        provider: {
            type: "local",
            "sessionDataType": {
                id: "number",
                first_name: "string",
                last_name: "string"
            },
            token: {
                maxAgeInSeconds: 20000,
            }
        },
        baseURL: process.env.HOST_API,
        globalAppMiddleware: true

    },
    devtools: {
        enabled: true
    },
    tailwindcss: {
        configPath: "tailwind.config.js",
        exposeConfig: false,
        injectPosition: 0,
    }
});
