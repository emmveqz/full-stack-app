import express from "express"
import bodyParser from "body-parser"
import {
	promises as fs,
	constants as fsConstants,
} from "fs"
import path from "path"
import {
  HTTP_PORT,
} from "./config"
import {
  ApiResponseStatus,
} from "./enums"
import {
  httpRequest,
} from "./tools"
import {
  findFilePath,
  getApiResponse,
} from "./utils"

//

const apiKey		= "89a35b48a9b4dd75c19e0df34874d986"
const apiUrl		= `https://api.endpoint/call?apiKey=${apiKey}`

//

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
	resp.sendFile( await findFilePath(req.url) )
})

server
	.listen(HTTP_PORT, "0.0.0.0", () => {
		console.log("started server on ", HTTP_PORT)
	})