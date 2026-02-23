import { Router } from "express";
import { createComment, getCommentsByPost, updateComment, deleteComment } from "./commet.controller.js";
import { validateJWT } from "../../../middlewares/validate_jwt.js";

const router = Router();

router.post("/", validateJWT, createComment);
router.get("/:postId", getCommentsByPost);
router.put("/:id", validateJWT, updateComment);
router.delete("/:id", validateJWT, deleteComment);

export default router;