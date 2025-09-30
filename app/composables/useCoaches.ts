import type { Coach } from "~/interfaces/coach";
import type { PaginatedResponse } from "~/interfaces/pagination";
import type { BackendError } from "~/interfaces/validation";

export const useCoaches = () => {
  const list = async (page = 1, pageSize = 10) => {
    const response = await $fetch<{ coaches: Coach[]; pagination: any }>('/api/coaches', {
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

  const get = (id: number) => $fetch<Coach>(`/api/coaches/${id}`);

  const create = async (payload: Partial<Coach>) => {
    try {
      return await $fetch<Coach>('/api/coaches', {
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

  const update = async (id: number, payload: Partial<Coach>) => {
    try {
      return await $fetch<Coach>(`/api/coaches/${id}`, {
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
    $fetch(`/api/coaches/${id}`, {
      method: "DELETE",
    });

  return { list, get, create, update, remove };
};
