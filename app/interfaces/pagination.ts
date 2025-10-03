export interface PaginationMeta {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage?: number | null;
    prevPage?: number | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationMeta;
}
