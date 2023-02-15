
import path from "path"

//

export const HTTP_PORT = parseInt(process.env.SERVER_APP_PORT || "0", 10) || 80

export const PUBLIC_DIR = path.resolve(__dirname,	"../public")

export const DB_HOST = process.env.DB_HOST

export const DB_PORT = parseInt(process.env.DB_PORT as string, 10) || 0

export const DB_USER = process.env.DB_USER

export const DB_NAME = process.env.DB_NAME

export const DB_PASSWORD = process.env.DB_PASSWORD


export const payengineApiEndpoint = process.env.PAYENGINE_API_ENDPOINT

export const payengineAuthConfig = {
  headers: {
    'accept': "application/json",
    'Authorization': `Basic ${process.env.PAYENGINE_API_SECRET}`,
    'Content-Type': "application/json",
  },
}
