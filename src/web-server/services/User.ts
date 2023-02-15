
import {
  db,
} from "./db"
import type {
  ICreateUserProps,
  IUserMerchant,
} from "./User.types"

//

export const findUser = async (email: string): Promise<IUserMerchant|void|Error> => {
  let result: IUserMerchant|undefined

  try {
    result = await db("users")
      .where({
        email: email.toLowerCase(),
      })
      .first()
  }
  catch (ex) {
    return new Error((ex as Error).message)
  }

  return result
}

export const createUser = async (user: ICreateUserProps): Promise<IUserMerchant|Error> => {
  try {
    const rows = await db("users")
      .insert([
        user,
      ], ["id"]);

    return {
      id: rows[0].id,
      ...user,
    }
  }
  catch (ex) {
    return new Error((ex as Error).message)
  }
}

export const updateUser = async (user: IUserMerchant): Promise<IUserMerchant|Error> => {
  const {
    id,
    ...updatedUser
  } = user

  try {
    await db("users")
      .where({ id })
      .update(updatedUser)
  }
  catch (ex) {
    return new Error((ex as Error).message)
  }

  return user
}
