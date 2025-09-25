import type { Club } from "~/interfaces/club";
import type { PaginatedResponse } from "~/interfaces/pagination";
import { buildApiUrl, buildApiUrlWithId, API_CONFIG } from "~/config/api";

export const useClubs = () => {
  const list = async (page = 1, pageSize = 10) => {
    const response = await $fetch<{ clubs: Club[]; pagination: any }>(buildApiUrl(API_CONFIG.ENDPOINTS.CLUBS), {
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

  const get = (id: string) => $fetch<Club>(`/api/clubs/${id}`);

  const create = (payload: Partial<Club>) =>
    $fetch<Club>('/api/clubs', {
      method: "POST",
      body: payload,
    });

  const update = (id: string, payload: Partial<Club>) =>
    $fetch<Club>(`/api/clubs/${id}`, {
      method: "PUT",
      body: payload,
    });

  const remove = (id: string) =>
    $fetch(`/api/clubs/${id}`, {
      method: "DELETE",
    });

  return { list, get, create, update, remove };
};
