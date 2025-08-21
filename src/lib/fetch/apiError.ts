// lib/errors.ts
export class ApiError<D = Record<string, never>> extends Error {
  public readonly status: number;
  public readonly data: D;

  constructor(status: number, message: string, data: D) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export class FetchCoreError<E = { message?: string }> extends Error {
  public readonly status: number;
  public readonly payload?: E;

  constructor(status: number, message: string, payload?: E) {
    super(message);
    Object.setPrototypeOf(this, FetchCoreError.prototype);
    this.name = 'FetchCoreError';
    this.status = status;
    this.payload = payload;
  }
}