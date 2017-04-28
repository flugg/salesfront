export interface PaginationResponse {
  data: any;
  cursor: {
    next: string | null;
  };
}