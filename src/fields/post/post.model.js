'use strict';

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es requerido"],
      trim: true,
      maxLength: [150, "El título no puede exceder 150 caracteres"]
    },
    category: {
      type: String,
      required: [true, "La categoría es requerida"]
    },
    content: {
      type: String,
      required: [true, "El contenido es requerido"]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;