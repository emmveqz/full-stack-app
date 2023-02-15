import express from "express"
import * as User from "../controllers/User"
import {
  callMethod,
} from "../utils"

//

export const router = express.Router()

//

router.post( "(/)?", (req, resp) => callMethod(User.Get(req.body), req, resp) )
