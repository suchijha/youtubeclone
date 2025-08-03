import { createChannel,getAllChannels,getChannelById,updateChannel,deleteChannel } from "../controller/channel.controller.js";
import express from "express"
import JWTverify from "../middleware/JWTverify.js";

const router = express.Router();

router.get('/',JWTverify,getAllChannels);
router.get('/:id',getChannelById);
router.post('/',JWTverify,createChannel)
router.put('/:id',updateChannel);
router.delete('/:id',deleteChannel);


export default router;