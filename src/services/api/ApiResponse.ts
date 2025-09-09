export interface ApiResponse<T> {
    success: number;
    msg: string;
    code: string;
    payload: T;
  }