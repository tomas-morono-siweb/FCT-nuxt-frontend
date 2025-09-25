import type { Player } from "~/interfaces/player";
import type { PaginatedResponse } from "~/interfaces/pagination";
import { buildApiUrl, buildApiUrlWithId, API_CONFIG } from "~/config/api";

export const usePlayers = () => {
  const list = (nombre?: string, page = 1, pageSize = 10) =>
    $fetch<PaginatedResponse<Player>>(buildApiUrl(API_CONFIG.ENDPOINTS.PLAYERS), {
      query: { nombre, page, pageSize }
    });

  const get = (id: number) =>
    $fetch<Player>(buildApiUrlWithId(API_CONFIG.ENDPOINTS.PLAYERS, id));

  const create = (payload: Partial<Player>) =>
    $fetch<Player>(buildApiUrl(API_CONFIG.ENDPOINTS.PLAYERS), {
      method: "POST",
      body: payload
    });

  const update = (id: number, payload: Partial<Player>) =>
    $fetch<Player>(buildApiUrlWithId(API_CONFIG.ENDPOINTS.PLAYERS, id), {
      method: "PUT",
      body: payload
    });

  const remove = (id: number) =>
    $fetch(buildApiUrlWithId(API_CONFIG.ENDPOINTS.PLAYERS, id), {
      method: "DELETE"
    });

  return { list, get, create, update, remove };
};
