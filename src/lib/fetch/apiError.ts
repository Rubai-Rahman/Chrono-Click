// lib/errors.ts
export class ApiError<D = Record<string, never>> extends Error {
  public readonly status: number;
  public readonly data: D;
  public readonly timestamp: Date;

  constructor(status: number, message: string, data: D) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.timestamp = new Date();
  }

  /**
   * Extract a user-friendly error message from the error data
   */
  getUserMessage(): string {
    if (this.data && typeof this.data === 'object' && this.data !== null) {
      const possibleMessage = (this.data as Record<string, unknown>)['message'];
      if (typeof possibleMessage === 'string') {
        return possibleMessage;
      }
    }
    return this.message || 'An error occurred';
  }

  /**
   * Check if this is a client error (4xx status)
   */
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  /**
   * Check if this is a server error (5xx status)
   */
  isServerError(): boolean {
    return this.status >= 500;
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
