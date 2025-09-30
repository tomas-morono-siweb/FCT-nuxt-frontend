export interface PaginationMeta {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage?: number | null; // Campo adicional de la API real
    prevPage?: number | null; // Campo adicional de la API real
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationMeta;
}
