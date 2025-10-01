import type { Club } from "~/interfaces/club";
import type { PaginatedResponse } from "~/interfaces/pagination";
import type { BackendError } from "~/interfaces/validation";

export const useClubs = () => {
  const list = async (page = 1, pageSize = 20) => {
    const response = await $fetch<{ clubs: Club[]; pagination: any }>('/api/clubs', {
      query: { page, pageSize },
    });

    // Transformar la respuesta para que coincida con la interfaz esperada
    return {
      data: response.clubs.map(club => ({
        ...club,
        // Convertir presupuesto de string a number para el frontend
        presupuesto: typeof club.presupuesto === 'string' ? parseFloat(club.presupuesto) : club.presupuesto,
        // Asegurar que jugadores sea siempre un array
        jugadores: Array.isArray(club.jugadores) ? club.jugadores :
          typeof club.jugadores === 'string' ? [club.jugadores] : [],
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
    } as PaginatedResponse<Club>;
  };

  const get = async (id: number) => {
    const club = await $fetch<Club>(`/api/clubs/${id}`);
    return {
      ...club,
      // Convertir presupuesto de string a number para el frontend
      presupuesto: typeof club.presupuesto === 'string' ? parseFloat(club.presupuesto) : club.presupuesto,
      // Asegurar que jugadores sea siempre un array
      jugadores: Array.isArray(club.jugadores) ? club.jugadores :
        typeof club.jugadores === 'string' ? [club.jugadores] : [],
    };
  };

  const create = async (payload: Partial<Club>) => {
    try {
      return await $fetch<Club>('/api/clubs', {
        method: "POST",
        body: payload,
      });
    } catch (error: any) {
      // Re-lanzar el error tal cual viene del backend
      throw error;
    }
  };

  const update = async (id: number, payload: Partial<Club>) => {
    try {
      return await $fetch<Club>(`/api/clubs/${id}`, {
        method: "PUT",
        body: payload,
      });
    } catch (error: any) {
      // Re-lanzar el error tal cual viene del backend
      throw error;
    }
  };

  const remove = (id: number) =>
    $fetch<void>(`/api/clubs/${id}`, {
      method: "DELETE",
    });

  return { list, get, create, update, remove };
};
