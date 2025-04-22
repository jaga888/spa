export const routes = {
    get: '/properties',
    getById: (id: number) => '/properties/' + id,
    getFees: (id: number) => '/properties/' + id + '/fees/',
    getDocs: (id: number) => '/properties/' + id + '/docs/',
    create: () => '/properties',
    update: (id: number) => '/properties/' + id,
}
