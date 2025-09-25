import type { Club } from "~/interfaces/club";
import type { PaginatedResponse } from "~/interfaces/pagination";
import { buildApiUrl, buildApiUrlWithId, API_CONFIG } from "~/config/api";

export const useClubs = () => {
  const list = async (page = 1, pageSize = 10) => {
    const response = await $fetch<{ clubs: Club[] }>(buildApiUrl(API_CONFIG.ENDPOINTS.CLUBS), {
      query: { page, pageSize },
    });

    // La API de clubs no devuelve paginación, solo un array
    // Simulamos la paginación en el frontend si es necesario
    let filteredClubs = response.clubs;

    // Sin filtrado - la API maneja todo

    // Paginación manual
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedClubs = filteredClubs.slice(startIndex, endIndex);

    return {
      data: paginatedClubs,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalItems: filteredClubs.length,
        totalPages: Math.ceil(filteredClubs.length / pageSize),
        hasNextPage: endIndex < filteredClubs.length,
        hasPreviousPage: startIndex > 0,
      },
    } as PaginatedResponse<Club>;
  };

  const get = (id: string) => $fetch<Club>(buildApiUrlWithId(API_CONFIG.ENDPOINTS.CLUBS, id));

  const create = (payload: Partial<Club>) =>
    $fetch<Club>(buildApiUrl(API_CONFIG.ENDPOINTS.CLUBS), {
      method: "POST",
      body: payload,
    });

  const update = (id: string, payload: Partial<Club>) =>
    $fetch<Club>(buildApiUrlWithId(API_CONFIG.ENDPOINTS.CLUBS, id), {
      method: "PUT",
      body: payload,
    });

  const remove = (id: string) =>
    $fetch(buildApiUrlWithId(API_CONFIG.ENDPOINTS.CLUBS, id), {
      method: "DELETE",
    });

  return { list, get, create, update, remove };
};
