
import {
	promises as fs,
	constants as fsConstants,
} from "fs"
import path from "path"
import {
  PUBLIC_DIR,
} from "../config"
import type {
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
