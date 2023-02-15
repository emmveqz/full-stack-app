import express from "express"
import bodyParser from "body-parser"

//

const parseParams = (urlParams: any): any => {
  /**
   * @ToDo Implement.
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
	resp.sendFile( await requestFile(req.url) )
})

server
	.listen(HTTP_PORT, "0.0.0.0", () => {
		console.log("started server on ", HTTP_PORT)
	})