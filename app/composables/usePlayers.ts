import type { Player } from "~/interfaces/player";
import type { PaginatedResponse } from "~/interfaces/pagination";
import { buildApiUrl, buildApiUrlWithId, API_CONFIG } from "~/config/api";

export const usePlayers = () => {
  const list = async (nombre?: string, page = 1, pageSize = 10) => {
    const response = await $fetch<{ players: Player[]; pagination: any }>(buildApiUrl(API_CONFIG.ENDPOINTS.PLAYERS), {
      query: { nombre, page, pageSize },
    });

    // Transformar la respuesta para que coincida con la interfaz esperada
    return {
      data: response.players,
      pagination: {
        currentPage: response.pagination.current_page,
        pageSize: response.pagination.per_page,
        totalItems: response.pagination.total_items,
        totalPages: response.pagination.total_pages,
        hasNextPage: response.pagination.has_next_page,
        hasPreviousPage: response.pagination.has_prev_page,
      },
    } as PaginatedResponse<Player>;
  };

  const get = (id: number) => $fetch<Player>(`/api/players/${id}`);

  const create = (payload: Partial<Player>) =>
    $fetch<Player>('/api/players', {
      method: "POST",
      body: payload,
    });

  const update = (id: number, payload: Partial<Player>) =>
    $fetch<Player>(`/api/players/${id}`, {
      method: "PUT",
      body: payload,
    });

  const remove = (id: number) =>
    $fetch(`/api/players/${id}`, {
      method: "DELETE",
    });

  return { list, get, create, update, remove };
};
