import React from "react"
import type {
  ApiResponseStatus,
} from "../../enums"

//

export type IProps = {
}

type IFieldsNames =
  | "name"
  | "email"

export type IFieldsMap = {
  [name in IFieldsNames]?: string
}

export type IBLResult = {
  errors: IFieldsMap,
  merchantId?: string,
  message?: string,
  onFieldChanged: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  submitForm: () => void,
}

export type IUser = {
  id: number,
  name: string,
  email: string,
  merchant_id: string,
}

/**
 * @todo Maybe migrate this to `@emmveqz/utils`
 */
export type IApiResponse<T> = {
	data?: T,
	msg?: string,
	status: ApiResponseStatus,
}