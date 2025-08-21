import { FetchCoreError } from './apiError';

export type DoFetch = (url: string, init: RequestInit) => Promise<Response>;

export type CoreOptions = {
  method?: string;
  headers?: Record<string, string>;
  /**
   * If FormData is passed, it will be forwarded as-is; otherwise, any object will be JSON.stringified.
   */
  body?: BodyInit | Record<string, unknown>;
  /**
   * 'json' (default) parses JSON responses; 'text' forces text parsing.
   */
  responseType?: 'json' | 'text';
};

/**
 * fetchCore
 * - Pure logic: builds RequestInit (stringifies body if needed), calls provided doFetch,
 *   parses response and throws FetchCoreError<E> on non-OK.
 */
export async function fetchCore<T, E = { message?: string }>(
  doFetch: DoFetch,
  url: string,
  opts: CoreOptions = {}
): Promise<T> {
  const { method = 'GET', headers = {}, body, responseType = 'json' } = opts;

  const isForm =
    typeof FormData !== 'undefined' &&
    (body instanceof FormData ||
      (body &&
        typeof body === 'object' &&
        'constructor' in body &&
        body.constructor?.name === 'FormData'));

  const finalHeaders: Record<string, string> = { ...headers };
  let finalBody: BodyInit | undefined;

  if (body !== undefined) {
    if (isForm) {
      finalBody = body as BodyInit;
      // Do not set content-type for FormData — host will set boundary
    } else {
      finalHeaders['Content-Type'] =
        finalHeaders['Content-Type'] ?? 'application/json';
      finalBody = JSON.stringify(body as Record<string, unknown>);
    }
  }

  const init: RequestInit = {
    method,
    headers: finalHeaders,
    body: finalBody,
  };

  const res = await doFetch(url, init);
  const contentType = res.headers.get('content-type') ?? '';

  if (!res.ok) {
    // Try to parse JSON error, else text
    let parsed: E | undefined;
    try {
      if (contentType.includes('application/json')) {
        parsed = (await res.json()) as E;
      } else {
        const txt = await res.text();
        if (txt) parsed = { message: txt } as unknown as E;
      }
    } catch {
      parsed = undefined;
    }

    let errMessage: string | undefined = undefined;
    if (parsed && typeof parsed === 'object' && parsed !== null) {
      const possible = (parsed as Record<string, unknown>)['message'];
      if (typeof possible === 'string') errMessage = possible;
    }

    const finalMessage = errMessage ?? res.statusText ?? 'API Error';
    throw new FetchCoreError<E>(res.status, finalMessage, parsed);
  }

  // success cases
  if (res.status === 204) {
    // no content
    return {} as T;
  }

  if (responseType === 'text' || !contentType.includes('application/json')) {
    const txt = await res.text();
    return txt as unknown as T;
  }

  const data = (await res.json()) as T;
  return data;
}
