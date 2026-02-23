import Comment from "./comment.model.js";

// Crear comentario
export const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId, content } = req.body;

    const comment = new Comment({
      content,
      user: userId,
      post: postId
    });

    await comment.save();

    res.status(201).json({
      success: true,
      comment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Listar comentarios por post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "nombre email")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      comments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Actualizar comentario
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comentario no encontrado"
      });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "No puedes editar este comentario"
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedComment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Eliminar comentario
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comentario no encontrado"
      });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "No puedes eliminar este comentario"
      });
    }

    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Comentario eliminado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};