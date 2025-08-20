// lib/dal/http/apiError.ts
export class ApiError extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
  }
}
