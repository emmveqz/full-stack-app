import express from "express"
import {
	promises as fs,
	constants as fsConstants,
} from "fs"
import path from "path"

//

const HTTP_PORT		= parseInt(process.env.SERVER_APP_PORT || "0", 10) || 80
const PUBLIC_DIR	= path.resolve(__dirname,	"./public")
const apiKey		= "89a35b48a9b4dd75c19e0df34874d986"
const apiUrl		= `https://api.endpoint/call?apiKey=${apiKey}`

//

type IApiResponse<T> = {
	data?: T,
	msg?: string,
	status: ApiResponseStatus,
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

const getResult = async (urlParams: any): Promise<any> => {
	const parsedParams = parseParams(urlParams)

	if (parsedParams instanceof Error) {
		return parsedParams
  }

  /**
   * @ToDo Implement result.
   */
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

server.get("/api/somefunction(/)?:urlParams?", async (req, resp) => {
	const result = await getResult(req.params.urlParams)

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