
import axios from "axios"
import {
  Request,
  Response,
} from "express"
import {
	promises as fs,
	constants as fsConstants,
} from "fs"
import path from "path"
import {
  PUBLIC_DIR,
} from "../config"
import {
  ApiResponseStatus,
} from "../enums"
import {
  HttpMethod,
} from "../enums"
import {
  IApiResponse,
  IHttpResponse,
  IHttpConfig,
} from "../types/utils"

//

export const getApiResponse = <T>(status: ApiResponseStatus, data?: T, msg?: string): IApiResponse<T> => {
	return {
		data,
		msg,
		status,
	}
}

export const callMethod = async <T>(promise: Promise<T|Error>, req: Request, resp: Response) => {
	const result = await promise

	if (result instanceof Error) {
		resp.json( getApiResponse(ApiResponseStatus.Error, null, result.message) )
		return
	}

	resp.json( getApiResponse(ApiResponseStatus.Success, result) )
}

/**
 * @param uriPath
 * @returns Full path to the requested file when found, 404 file path otherwise.
 */
export const findFilePath = async (uriPath: string): Promise<string> => {
	const fileName = uriPath === "/"
		? "index.html"
		: (uriPath[0] === "/" ? uriPath.substr(1) : uriPath)

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

export const httpRequest = async (url: string, config?: IHttpConfig): Promise<IHttpResponse> => {
  const method = config?.method ?? HttpMethod.GET
  let ok: boolean = false,
    status: number = 500,
    body: IHttpResponse["body"]

  /**
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
    console.log(ex)
  }

  return {
    body,
    ok,
    status,
  }
}
