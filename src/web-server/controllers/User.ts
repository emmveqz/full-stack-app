
import type {
  IGetRequestParams,
} from "./User.types"
import type {
  IUser,
} from "../models/User"
import type {
  ICreateUserProps,
} from "../services/User.types"
import {
  findUser,
  updateUser,
  createUser,
} from "../services/User"
import {
  createMerchant,
} from "../services/Merchant"

//

export const Get = async (reqParams: IGetRequestParams): Promise<IUser|Error> => {
	if (!reqParams.email || !reqParams.name) {
		return new Error("mandatory fields missing")
	}

	try {
		let user = await findUser(reqParams.email)

    if (!user) {
      user = await createUser(reqParams as ICreateUserProps)
    }
  
    if (user instanceof Error) {
      return user
    }
  
		if (!user.merchant_id) {
      console.log("creating merchant", user)
      const merchant = await createMerchant(user)
      console.log("merchant created", merchant)

			if (merchant instanceof Error) {
        return merchant
      }

      user.merchant_id = merchant.merchant_id
			user = await updateUser(user)
		}

		return user
	}
	catch (ex) {
		return new Error((ex as Error).message)
	}
}
