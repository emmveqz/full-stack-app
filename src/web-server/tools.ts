import knex from "knex"
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
  }
  catch (ex) {
  }

  return {
    body,
    ok,
    status,
  }
}
