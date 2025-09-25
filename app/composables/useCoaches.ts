import type { Coach } from "~/interfaces/coach";
import type { PaginatedResponse } from "~/interfaces/pagination";
import { buildApiUrl, buildApiUrlWithId, API_CONFIG } from "~/config/api";

export const useCoaches = () => {
  const list = async (page = 1, pageSize = 10) => {
    const response = await $fetch<{ coaches: Coach[]; pagination: any }>(buildApiUrl(API_CONFIG.ENDPOINTS.COACHES), {
      query: { page, pageSize },
    });

    // Transformar la respuesta para que coincida con la interfaz esperada
    return {
      data: response.coaches,
      pagination: {
        currentPage: response.pagination.current_page,
        pageSize: response.pagination.per_page,
        totalItems: response.pagination.total_items,
        totalPages: response.pagination.total_pages,
        hasNextPage: response.pagination.has_next_page,
        hasPreviousPage: response.pagination.has_prev_page,
      },
    } as PaginatedResponse<Coach>;
  };

  const get = (id: number) => $fetch<Coach>(buildApiUrlWithId(API_CONFIG.ENDPOINTS.COACHES, id));

  const create = (payload: Partial<Coach>) =>
    $fetch<Coach>(buildApiUrl(API_CONFIG.ENDPOINTS.COACHES), {
      method: "POST",
      body: payload,
    });

  const update = (id: number, payload: Partial<Coach>) =>
    $fetch<Coach>(buildApiUrlWithId(API_CONFIG.ENDPOINTS.COACHES, id), {
      method: "PUT",
      body: payload,
    });

  const remove = (id: number) =>
    $fetch(buildApiUrlWithId(API_CONFIG.ENDPOINTS.COACHES, id), {
      method: "DELETE",
    });

  return { list, get, create, update, remove };
};
