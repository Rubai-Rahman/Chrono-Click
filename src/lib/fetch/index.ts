// Optimized server fetch API (Axios-like interceptors)
export { api, safeApi, serverFetch } from './serverFetch';
export type { ApiResult, RequestConfig } from './serverFetch';

// Client fetch API (Axios-like interceptors for client-side)
export { clientApi, safeClientApi, clientFetch } from './clientFetch';
export type { ClientApiResult, ClientRequestConfig } from './clientFetch';

// Core utilities
export { fetchCore } from './fetchCore';
export type { CoreOptions, DoFetch } from './fetchCore';

// Error handling
export { ApiError, FetchCoreError } from './apiError';