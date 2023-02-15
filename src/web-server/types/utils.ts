
import type {
  ApiResponseStatus,
  HttpMethod,
} from "../enums"

//

export type OmitProp<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type INullableProps<T> = {
	[prop in keyof T]?: T[prop]
}

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
