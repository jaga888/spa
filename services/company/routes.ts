export const routes = {
    get: '/companies',
    getById: (id: number) => '/companies/' + id,
    getFees: (id: number) => '/companies/' + id + '/fees/',
    getActive: (id: number) => '/companies/'+ id + '/active/',
    create: () => '/companies',
    update: (id: number) => '/companies/' + id,
}
