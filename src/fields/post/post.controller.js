import Post from "./post.model.js";
import Comment from "../comments/comment.model.js";

// Crear publicación
export const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, category, content } = req.body;

    const post = new Post({
      title,
      category,
      content,
      user: userId
    });

    await post.save();

    res.status(201).json({
      success: true,
      post
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Listar publicaciones
export const getPosts = async (req, res) => {
  try {

    const posts = await Post.find()
      .populate("user", "nombre email rol")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Actualizar publicación
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada"
      });
    }

    // Validar que sea el dueño
    if (post.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "No puedes editar esta publicación"
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedPost
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Eliminar publicación
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada"
      });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "No puedes eliminar esta publicación"
      });
    }

    // Eliminar comentarios relacionados
    await Comment.deleteMany({ post: id });

    await Post.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Publicación eliminada correctamente"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};