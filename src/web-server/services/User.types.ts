
import type {
  INullableProps,
  OmitProp,
} from "@emmveqz/utils/dist/types/utils"
import type {
  IUser,
} from "../models/User"
import type {
  IMerchant,
} from "../models/Merchant"

//

export type IUserMerchant = IUser & INullableProps<IMerchant>

export type ICreateUserProps = OmitProp<IUserMerchant, "id">
