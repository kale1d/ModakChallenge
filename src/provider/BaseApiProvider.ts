// eslint-disable-next-line no-undef
type Response = globalThis.Response;
// eslint-disable-next-line no-undef
type RequestInit = globalThis.RequestInit;

type Body = Record<string, unknown> | null | undefined;

interface HTTPError extends Error {
  data?: {
    status?: number;
  };
}

export class BaseApiProvider {
  baseUrl = '';

  constructor({ apiUrl }: { apiUrl: string }) {
    this.baseUrl = apiUrl;
  }

  responseParser = async (response: Response) => {
    let content: Record<string, unknown> | undefined;

    if (
      response.status !== 200 &&
      response.status !== 201 &&
      response.status !== 204
    ) {
      try {
        content = await response.json();
        return { error: { data: { status: response.status } }, ...content };
      } catch (error) {
        return { error: { data: { status: response.status } } };
      }
    }

    try {
      content = await response.json();
      return content;
    } catch (error) {
      return content
        ? { message: content, status: response.status }
        : { status: response.status, data: {} };
    }
  };

  errorHandler = (error: HTTPError) => {
    const status = error?.data?.status || undefined;
    return {
      data: undefined,
      headers: new Headers(),
      error: true,
      status,
      errorMessage: error?.data || error.message || error,
    };
  };

  generateFetchConfig = async (method: string, body: Body) => {
    if (!method) {
      throw new Error('The Method is required to make a request');
    }
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && { body: JSON.stringify(body) }),
    };
  };

  handleRequest = async <T>(route: string, config: RequestInit) => {
    const response = await fetch(`${this.baseUrl}${route}`, config);
    const data = (await this.responseParser(response)) as T;
    return { data, response };
  };

  handlePayload = <T>({ data, response }: { data: T; response: Response }) => ({
    data,
    status: response.status,
    error: response.status >= 400,
    headers: response.headers,
  });

  makeRequest = async <T>({
    method,
    route,
    body,
  }: {
    method: string;
    route: string;
    body?: Body;
  }) => {
    try {
      const config = await this.generateFetchConfig(method, body);
      const payload = await this.handleRequest<T>(route, config);

      return this.handlePayload<T>(payload);
    } catch (error) {
      return this.errorHandler(error as Error);
    }
  };

  get = async <T>(route: string) =>
    this.makeRequest<T>({ method: 'get', route });
}
