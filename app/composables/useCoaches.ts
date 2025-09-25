import type { Coach } from "~/interfaces/coach";
import type { PaginatedResponse } from "~/interfaces/pagination";
import { buildApiUrl, buildApiUrlWithId, API_CONFIG } from "~/config/api";

export const useCoaches = () => {
  const list = async (page = 1, pageSize = 10) => {
    const response = await $fetch<{ coaches: Coach[] }>(buildApiUrl(API_CONFIG.ENDPOINTS.COACHES), {
      query: { page, pageSize },
    });

    // La API de coaches no devuelve paginación, solo un array
    // Simulamos la paginación en el frontend si es necesario
    let filteredCoaches = response.coaches;

    // Sin filtrado - la API maneja todo

    // Paginación manual
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCoaches = filteredCoaches.slice(startIndex, endIndex);

    return {
      data: paginatedCoaches,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalItems: filteredCoaches.length,
        totalPages: Math.ceil(filteredCoaches.length / pageSize),
        hasNextPage: endIndex < filteredCoaches.length,
        hasPreviousPage: startIndex > 0,
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
