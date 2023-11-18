const express = require("express");
const router = express.Router();
const { protect, adminProtect } = require("../middleware/auth");
const { uploadMemoryStorage } = require("../config/attachment");

const { getAllBlogPosts, getBlogPostById, createBlogPost, saveBlogPostThumbnail, hideOrUnhideBlogPost,
    addBlogPostContent,
    addPostContentImage } = require("../controllers/blogPostController");

const firebaseStorage = require("../config/firebase");
const { ref, uploadBytesResumable } = require("firebase/storage");

/**
 * @swagger
 * /api/posts/getAllBlogPosts:
 *   get:
 *     tags: [Blog Post]
 *     operatorId: getAllBlogPosts
 *     description: Get all blog posts
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.route("/getAllBlogPosts").get(getAllBlogPosts);

/**
 * @swagger
 * /api/posts/getBlogPostById/{id}:
 *   get:
 *     tags: [Blog Post]
 *     operatorId: getBlogPostById
 *     description: Get blog post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Blog Post ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/getBlogPostById/:blogPostId").get(getBlogPostById);

/**
 * @swagger
 * /api/posts/createBlogPost:
 *   post:
 *     tags: [Blog Post]
 *     operatorId: createBlogPost
 *     description: Create blog post
 *     security:
 *       - bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               blogPostTitle:
 *                 type: string
 *               blogPostTag:
 *                 type: string
 *               blogPostDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.route("/createBlogPost").post(adminProtect, protect, createBlogPost);

/**
 * @swagger
 * /api/posts/saveBlogPostThumbnail/{id}:
 *   post:
 *     tags: [Blog Post]
 *     operatorId: saveBlogPostThumbnail
 *     description: Save blog post's thumbnail
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Blog Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - Files[]
 *             properties:
 *               Files[]:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Saved
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/saveBlogPostThumbnail/:blogPostId").post(adminProtect, protect, uploadMemoryStorage.array("Files[]"), async (req, res, next) => {
    try {
        if (req.files) {
            req.files.forEach((file) => {
                file.originalname = "blog-post_" + file.originalname + "_" + Date.now();
                req.thumbnailOriginalName = file.originalname;
                uploadBytesResumable(ref(firebaseStorage, `attachments/${file.originalname}`), file.buffer, { contentType: file.mimetype});
            });
        }

        setTimeout(() => {
            next();
        }, 5000);
    } catch (error) {
        next(error);
    }
}, saveBlogPostThumbnail);

/**
 * @swagger
 * /api/posts/hideOrUnhideBlogPost/{id}:
 *   put:
 *     tags: [Blog Post]
 *     operatorId: hideOrUnhideBlogPost
 *     description: Hide or unhide blog post
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Blog post ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/hideOrUnhideBlogPost/:blogPostId").put(adminProtect, protect, hideOrUnhideBlogPost);

/**
 * @swagger
 * /api/posts/addBlogPostContent/{id}:
 *   put:
 *     tags: [Blog Post]
 *     operatorId: addBlogPostContent
 *     description: Add blog post content
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Blog Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               partTitle:
 *                 type: string
 *               partContent:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/addBlogPostContent/:blogPostId").put(adminProtect, protect, addBlogPostContent);

/**
 * @swagger
 * /api/posts/addPostContentImage/{id}:
 *   put:
 *     tags: [Blog Post]
 *     operatorId: addPostContentImage
 *     description: Add post content image
 *     security:
 *       - bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Blog Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - postContentId
 *               - Files[]
 *             properties:
 *               postContentId:
 *                 type: string
 *               Files[]:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               contentImageDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Added
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.route("/addPostContentImage/:blogPostId").put(adminProtect, protect, uploadMemoryStorage.array("Files[]"), async (req, res, next) => {
    try {
        if (req.files) {
            req.files.forEach((file) => {
                file.originalname = "post-content_" + file.originalname + "_" + Date.now();
                req.contentImageOriginalName = file.originalname;
                uploadBytesResumable(ref(firebaseStorage, `attachments/${file.originalname}`), file.buffer, { contentType: file.mimetype});
            });
        }

        setTimeout(() => {
            next();
        }, 5000);
    } catch (error) {
        next(error);
    }
}, addPostContentImage);

module.exports = router;