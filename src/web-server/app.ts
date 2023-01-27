import express from "express"
import bodyParser from "body-parser"
import {
	promises as fs,
	constants as fsConstants,
} from "fs"
import path from "path"
import {
	createMerchant,
	createUser,
	findUser,
  httpRequest,
	IUser,
	updateUser,
} from "./tools"

//

const HTTP_PORT		= parseInt(process.env.SERVER_APP_PORT || "0", 10) || 80
const PUBLIC_DIR	= path.resolve(__dirname,	"./public")

//

type IApiResponse<T> = {
	data?: T,
	msg?: string,
	status: ApiResponseStatus,
}

type IRequestMerchantParams = {
	email?: string,
	name?: string,
}

enum ApiResponseStatus {
	Unknown,
	Success,
	Info,
	Warning,
	Error,
}

//

const getApiResponse = <T>(status: ApiResponseStatus, data?: T, msg?: string): IApiResponse<T> => {
	return {
		data,
		msg,
		status,
	}
}

const parseParams = (urlParams: any): any => {
  /**
   * @ToDo Implement.
   */
}

const getMerchant = async (reqParams: IRequestMerchantParams): Promise<IUser|Error> => {
	if (!reqParams.email || !reqParams.name) {
		return new Error("mandatory fields missing")
	}

	try {
		let user: IUser|Error|undefined = await findUser(reqParams.email)

		if (!user?.merchant_id) {
			user = await createMerchant(user ? user : reqParams as IUser)

			if ( !(user instanceof Error) ) {
				user = user.id
					? await updateUser(user)
					: await createUser(user)
			}
		}

		return user
	}
	catch (ex) {
		return new Error((ex as Error).message)
	}
}

const requestFile = async (url: string): Promise<string> => {
	const fileName = url === "/"
		? "index.html"
		: (url[0] === "/" ? url.substr(1) : url)

	const fullFileName = path.resolve(PUBLIC_DIR, fileName)

	try {
		await fs.access(fullFileName, fsConstants.F_OK)
		return fullFileName
	}
	catch (err) {
		console.log(err)
		return path.resolve(PUBLIC_DIR, "404.html")
	}
}

const server = express()
server.use( bodyParser.json() )

server.post("/api/getmerchant(/)?", async (req, resp) => {
	const result = await getMerchant(req.body)

	if (result instanceof Error) {
		resp.json( getApiResponse(ApiResponseStatus.Error, null, result.message) )
		return
	}

	resp.json( getApiResponse(ApiResponseStatus.Success, result) )
})

server.get("/api*", async (req, resp) => {
	resp.json( getApiResponse(ApiResponseStatus.Error, null, "not implemented yet") )
})

server.get("/*", async (req, resp) => {
	resp.sendFile( await requestFile(req.url) )
})

server
	.listen(HTTP_PORT, "0.0.0.0", () => {
		console.log("started server on ", HTTP_PORT)
	})