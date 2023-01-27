import knex from "knex"
/**
 */
import axios from "axios"

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

export type IUser = {
  id?: number,
  name: string,
  email: string,
  merchant_id?: string,
}

//

const payengineApiEndpoint = process.env.PAYENGINE_API_ENDPOINT

const payengineAuthConfig = {
  headers: {
    'accept': "application/json",
    'Authorization': `Basic ${process.env.PAYENGINE_API_SECRET}`,
    'Content-Type': "application/json",
  },
}

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10) || 0,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
})

//

export const httpRequest = async (url: string, config?: IHttpConfig): Promise<IHttpResponse> => {
  const method = config?.method ?? HttpMethod.GET
  let ok: boolean = false,
    status: number = 500,
    body: IHttpResponse["body"]

  /**
   * @ToDo Implement.
   */

  try {
    const resp = await axios({
      ...config,
      method,
      url,
    })

    body = resp.data
    ok = resp.statusText.toLowerCase() === "ok"
    status = resp.status
  }
  catch (ex) {
  }

  return {
    body,
    ok,
    status,
  }
}

export const findUser = async (email: string): Promise<IUser|undefined> => {
  let result: IUser|undefined

  try {
    result = await db("users")
      .where({
        email: email.toLowerCase(),
      })
      .first()
  }
  catch (ex) {
  }

  return result
}

export const createUser = async ({ id, ...user }: IUser): Promise<IUser|Error> => {
  try {
    const rows = await db("users")
      .insert([
        user,
      ], ["id"]);

    (user as IUser).id = rows[0].id
  }
  catch (ex) {
    new Error((ex as Error).message)
  }

  return user
}

export const updateUser = async ({ id, ...user }: IUser): Promise<IUser|Error> => {
  try {
    await db("users")
      .where({ id })
      .update(user)
    ;

    (user as IUser).id = id
  }
  catch (ex) {
    new Error((ex as Error).message)
  }

  return user
}

export const createMerchant = async ({ name, email: emailDirty, ...user }: IUser): Promise<IUser|Error> => {
  let result: IUser|Error|undefined
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
      ...user,
      email,
      name,
      merchant_id: (response.body as Record<string, any>).data.id
    }
  }
  else if (!result) {
    result = new Error("could not get merchant id")
  }

  return result
}
