export default defineNuxtConfig({
    $development: undefined, $env: undefined, $meta: undefined, $production: undefined, $test: undefined,
    app: {
        head: {
            title: 'Senex',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "/assets/scss/senex.scss" as *;'
                }
            }
        }
    },
    devtools: {enabled: true}
})
