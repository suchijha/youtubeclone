// routes/commentRoutes.js
import express from 'express';
import {
  addComment,
 
  updateComment,
  deleteComment
} from '../controller/comment.controller.js';
import JWTverify from '../middleware/JWTverify.js';

const router = express.Router();

// POST /api/comments/:videoId
router.post('/:videoId',JWTverify, addComment);



// PUT /api/comments/:videoId/:commentId
router.put('/:videoId/:commentId', JWTverify ,updateComment);

// DELETE /api/comments/:videoId/:commentId
router.delete('/:videoId/:commentId', JWTverify ,deleteComment);

export default router;
