export const routes = {
    get: '/companies',
    getById: (id: number) => '/companies/' + id,
    create: () => '/companies',
    update: (id: number) => '/companies/' + id,
}
