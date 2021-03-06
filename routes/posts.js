const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');

router.get('/', postController.getAll);
router.post('/', postController.create);
router.get('/:post_id', postController.getById);
router.post('/:post_id/comment', postController.addNewComment);
router.post('/:post_id/comment/delete', postController.deleteComment);
router.post('/:post_id/like', postController.like);
router.post('/:post_id/unlike', postController.unlike);
router.delete('/:post_id/delete', postController.deletePost);
router.put('/:post_id/update', postController.updatePost);
module.exports = router;