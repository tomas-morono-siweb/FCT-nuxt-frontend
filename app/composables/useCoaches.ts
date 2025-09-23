import type { Coach } from '~/interfaces/coach'
export const useCoaches = () => {
    const list = (q?: string, page = 1, pageSize = 10) => $fetch<Coach[]>('/api/coaches', { query: { q, page, pageSize } })
    const get = (id: number) => $fetch<Coach>(`/api/coaches/${id}`)
    const create = (payload: Partial<Coach>) => $fetch<Coach>('/api/coaches', { method: 'POST', body: payload })
    const update = (id: number, payload: Partial<Coach>) => $fetch<Coach>(`/api/coaches/${id}`, { method: 'PUT', body: payload })
    const remove = (id: number) => $fetch(`/api/coaches/${id}`, { method: 'DELETE' })
    return { list, get, create, update, remove }
}