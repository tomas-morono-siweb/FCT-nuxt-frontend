import type { Player } from "~/interfaces/player";
import type { PaginatedResponse } from "~/interfaces/pagination";
import type { BackendError } from "~/interfaces/validation";

export const usePlayers = () => {
  const list = async (nombre?: string, page = 1, pageSize = 20) => {
    const response = await $fetch<{ players: Player[]; pagination: any }>('/api/players', {
      query: { nombre, page, pageSize },
    });

    // Transformar la respuesta para que coincida con la interfaz esperada
    return {
      data: response.players.map(player => ({
        ...player,
        // Convertir salario de string a number para el frontend
        salario: typeof player.salario === 'string' ? parseFloat(player.salario) : player.salario,
      })),
      pagination: {
        currentPage: response.pagination.current_page,
        pageSize: response.pagination.per_page,
        totalItems: response.pagination.total_items,
        totalPages: response.pagination.total_pages,
        hasNextPage: response.pagination.has_next_page,
        hasPreviousPage: response.pagination.has_prev_page,
        nextPage: response.pagination.next_page,
        prevPage: response.pagination.prev_page,
      },
    } as PaginatedResponse<Player>;
  };

  const get = async (id: number) => {
    const player = await $fetch<Player>(`/api/players/${id}`);
    return {
      ...player,
      // Convertir salario de string a number para el frontend
      salario: typeof player.salario === 'string' ? parseFloat(player.salario) : player.salario,
    };
  };

  const create = async (payload: Partial<Player>) => {
    try {
      return await $fetch<Player>('/api/players', {
        method: "POST",
        body: payload,
      });
    } catch (error: any) {
      // Manejar errores del backend
      if (error.data?.error) {
        throw {
          error: error.data.error,
          statusCode: error.statusCode || 400
        } as BackendError;
      }
      throw error;
    }
  };

  const update = async (id: number, payload: Partial<Player>) => {
    try {
      return await $fetch<Player>(`/api/players/${id}`, {
        method: "PUT",
        body: payload,
      });
    } catch (error: any) {
      // Manejar errores del backend
      if (error.data?.error) {
        throw {
          error: error.data.error,
          statusCode: error.statusCode || 400
        } as BackendError;
      }
      throw error;
    }
  };

  const remove = (id: number) =>
    $fetch(`/api/players/${id}`, {
      method: "DELETE",
    });

  return { list, get, create, update, remove };
};
