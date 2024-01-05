export default defineNuxtConfig({
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
