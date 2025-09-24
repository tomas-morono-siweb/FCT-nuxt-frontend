import type { Coach } from "~/interfaces/coach";
import { buildApiUrl, buildApiUrlWithId, API_CONFIG } from "~/config/api";

export const useCoaches = () => {
  const list = (q?: string, page = 1, pageSize = 10) =>
    $fetch<Coach[]>(buildApiUrl(API_CONFIG.ENDPOINTS.COACHES), {
      query: { q, page, pageSize }
    });

  const get = (id: number) =>
    $fetch<Coach>(buildApiUrlWithId(API_CONFIG.ENDPOINTS.COACHES, id));

  const create = (payload: Partial<Coach>) =>
    $fetch<Coach>(buildApiUrl(API_CONFIG.ENDPOINTS.COACHES), {
      method: "POST",
      body: payload
    });

  const update = (id: number, payload: Partial<Coach>) =>
    $fetch<Coach>(buildApiUrlWithId(API_CONFIG.ENDPOINTS.COACHES, id), {
      method: "PUT",
      body: payload
    });

  const remove = (id: number) =>
    $fetch(buildApiUrlWithId(API_CONFIG.ENDPOINTS.COACHES, id), {
      method: "DELETE"
    });

  return { list, get, create, update, remove };
};
