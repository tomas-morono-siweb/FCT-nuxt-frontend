import type { Club } from '~/interfaces/club'
export const useClubs = () => {
    const list = (q?: string, page = 1, pageSize = 10) => $fetch<Club[]>('/api/clubs', { query: { q, page, pageSize } })
    const get = (id: number) => $fetch<Club>(`/api/clubs/${id}`)
    const create = (payload: Partial<Club>) => $fetch<Club>('/api/clubs', { method: 'POST', body: payload })
    const update = (id: number, payload: Partial<Club>) => $fetch<Club>(`/api/clubs/${id}`, { method: 'PUT', body: payload })
    const remove = (id: number) => $fetch(`/api/clubs/${id}`, { method: 'DELETE' })
    return { list, get, create, update, remove }
}