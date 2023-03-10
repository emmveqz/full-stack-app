
import type {
  ApiResponseStatus,
  HttpMethod,
} from "../enums"

//

export type IHttpConfig = {
  asJson?: boolean,
  data?: string,
  headers?: { [header: string]: string },
  method?: HttpMethod,
}

export type IHttpResponse = {
  body?: string | Record<string, unknown>,
  ok: boolean,
  status: number,
}

export type IApiResponse<T> = {
	data?: T,
	msg?: string,
	status: ApiResponseStatus,
}
