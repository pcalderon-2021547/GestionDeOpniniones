import { Router } from "express";
import { createPost, getPosts, updatePost, deletePost } from "./post.controller.js";
import { validateJWT } from "../../../middlewares/validate_jwt.js";

const router = Router();

router.post("/", validateJWT, createPost);
router.get("/", getPosts);
router.put("/:id", validateJWT, updatePost);
router.delete("/:id", validateJWT, deletePost);

export default router;