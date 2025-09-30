import type { Club } from "~/interfaces/club";
import type { PaginatedResponse } from "~/interfaces/pagination";

export const useClubs = () => {
  const list = async (page = 1, pageSize = 10) => {
    const response = await $fetch<{ clubs: Club[]; pagination: any }>('/api/clubs', {
      query: { page, pageSize },
    });

    // Transformar la respuesta para que coincida con la interfaz esperada
    return {
      data: response.clubs,
      pagination: {
        currentPage: response.pagination.current_page,
        pageSize: response.pagination.per_page,
        totalItems: response.pagination.total_items,
        totalPages: response.pagination.total_pages,
        hasNextPage: response.pagination.has_next_page,
        hasPreviousPage: response.pagination.has_prev_page,
      },
    } as PaginatedResponse<Club>;
  };

  const get = (id: number) => $fetch<Club>(`/api/clubs/${id}`);

  const create = (payload: Partial<Club>) =>
    $fetch<Club>('/api/clubs', {
      method: "POST",
      body: payload,
    });

  const update = (id: number, payload: Partial<Club>) =>
    $fetch<Club>(`/api/clubs/${id}`, {
      method: "PUT",
      body: payload,
    });

  const remove = (id: number) =>
    $fetch(`/api/clubs/${id}`, {
      method: "DELETE",
    });

  return { list, get, create, update, remove };
};
