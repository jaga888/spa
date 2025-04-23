export const routes = {
    get: '/units',
    getById: (id: number) => '/units/' + id,
    create: () => '/units',
    update: (id: number) => '/units/' + id,
}
