
import path from "path"

//

export const HTTP_PORT = parseInt(process.env.SERVER_APP_PORT || "0", 10) || 80

export const PUBLIC_DIR = path.resolve(__dirname,	"../public")
