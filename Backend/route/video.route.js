import { getAllVideos, getVideoById, getVideoByChannelId, getVideoByCategory, searchVideosByTitle, uploadVideo, updateVideo, deleteVideo } from "../controller/video.controller.js";
import express from 'express'
import JWTverify from "../middleware/JWTverify.js";

const router = express.Router();

router.get('/', JWTverify, getAllVideos)
router.get('/category/:category', JWTverify, getVideoByCategory)
router.get('/search', JWTverify, searchVideosByTitle)
router.get('/channel/:channelId',JWTverify,getVideoByChannelId)
router.get('/:id', JWTverify, getVideoById);

router.post('/', JWTverify, uploadVideo);
router.put('/:id', JWTverify, updateVideo)
router.delete('/:id', JWTverify, deleteVideo)


export default router;