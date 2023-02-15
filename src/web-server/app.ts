import express from "express"
import bodyParser from "body-parser"
import {
  HTTP_PORT,
} from "./config"
import {
  ApiResponseStatus,
} from "./enums"
import {
  router as userRouter,
} from "./routes/User"
import {
  findFilePath,
  getApiResponse,
} from "./utils"

//

const server = express()
server.use( bodyParser.json() )

server.use("/api/user", userRouter)

server.get("/api*", (req, resp) => {
	resp.json( getApiResponse(ApiResponseStatus.Error, null, "not implemented yet") )
})

server.post("/api*", (req, resp) => {
	resp.json( getApiResponse(ApiResponseStatus.Error, null, "not implemented yet") )
})

server.get("/*", async (req, resp) => {
	resp.sendFile( await findFilePath(req.url) )
})

server
	.listen(HTTP_PORT, "0.0.0.0", () => {
		console.log("started server on ", HTTP_PORT)
	})