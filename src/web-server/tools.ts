/**
 * @ToDo Import http library.
 */

//

enum HttpMethod {
  GET = "get",
  POST = "post",
}

type IHttpConfig = {
  asJson?: boolean,
  data?: string,
  headers?: { [header: string]: string },
  method?: HttpMethod,
}

type IHttpResponse = {
  body?: string | Record<string, unknown>,
  ok: boolean,
  status: number,
}

//

export const httpRequest = async (url: string, config?: IHttpConfig): Promise<IHttpResponse> => {
  const method = config?.method ?? HttpMethod.GET
  let ok: boolean, status: number

  /**
   * @ToDo Implement.
   */

  return {
    ok,
    status,
  }
}
