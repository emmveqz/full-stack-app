
import type {
  ICreateMerchantProps,
} from "./Merchant.types"
import {
  payengineApiEndpoint,
  payengineAuthConfig,
} from "../config"
import {
  HttpMethod,
} from "../enums"
import type {
  IMerchant,
} from "../models/Merchant"
import type {
  IHttpResponse,
} from "../types/utils"
import {
  httpRequest,
} from "../utils"

//

export const createMerchant = async ({ name, email: emailDirty }: ICreateMerchantProps): Promise<IMerchant|Error> => {
  let result: IMerchant|Error|undefined
  let response: IHttpResponse|undefined
  const email = emailDirty.toLowerCase()
  const data = JSON.stringify({ name, email })

  try {
    response = await httpRequest(`${payengineApiEndpoint}/api/merchant`, {
      ...payengineAuthConfig,
      data,
      method: HttpMethod.POST,
    })
  }
  catch (ex) {
    result = new Error((ex as Error).message)
  }

  if (response?.body && (response.body as Record<string, any>).data?.id) {
    result = {
      merchant_id: (response.body as Record<string, any>).data.id
    }
  }
  else if (!result) {
    console.log("createMerchant error:", response)
    result = new Error("could not get merchant id")
  }

  return result
}
