import express from "express";
import { createArticle, getArticles, upload , articleById, articleByTags,allowsTag} from "../controller/article.controller.js";

const router = express.Router();

router.post("/create", upload.single("Image"), createArticle);
router.get("/allowedtags",allowsTag)
router.get("/get", getArticles);
router.get("/:id",articleById);
router.get("/tags/:tag", articleByTags)

export default router;
