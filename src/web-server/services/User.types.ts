
import type {
  IUser,
} from "../models/User"
import type {
  IMerchant,
} from "../models/Merchant"
import type {
  OmitProp, INullableProps,
} from "../types/utils"

//

export type IUserMerchant = IUser & INullableProps<IMerchant>

export type ICreateUserProps = OmitProp<IUserMerchant, "id">
