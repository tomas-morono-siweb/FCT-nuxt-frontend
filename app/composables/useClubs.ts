import type { Club } from "~/interfaces/club";
import type { PaginatedResponse } from "~/interfaces/pagination";
import { buildApiUrl, buildApiUrlWithId, API_CONFIG } from "~/config/api";

export const useClubs = () => {
  const list = (q?: string, page = 1, pageSize = 10) =>
    $fetch<PaginatedResponse<Club>>(buildApiUrl(API_CONFIG.ENDPOINTS.CLUBS), {
      query: { q, page, pageSize }
    });

  const get = (id: string) =>
    $fetch<Club>(buildApiUrlWithId(API_CONFIG.ENDPOINTS.CLUBS, id));

  const create = (payload: Partial<Club>) =>
    $fetch<Club>(buildApiUrl(API_CONFIG.ENDPOINTS.CLUBS), {
      method: "POST",
      body: payload
    });

  const update = (id: string, payload: Partial<Club>) =>
    $fetch<Club>(buildApiUrlWithId(API_CONFIG.ENDPOINTS.CLUBS, id), {
      method: "PUT",
      body: payload
    });

  const remove = (id: string) =>
    $fetch(buildApiUrlWithId(API_CONFIG.ENDPOINTS.CLUBS, id), {
      method: "DELETE"
    });

  return { list, get, create, update, remove };
};
