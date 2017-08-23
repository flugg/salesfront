export interface PaginationResponse {
  success?: boolean;
  status?: number;
  data: any;
  cursor: {
    next: string | null;
    current: string | null;
    count: number;
  };
}