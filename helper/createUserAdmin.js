import bcrypt from "bcryptjs";
import User from "../src/fields/Usuarios/usuarios.model.js";

export const createDefaultUser = async () => {
  try {

    const existingUser = await User.findOne({ email: "adminpablo@gmail.com" });

    if (existingUser) {
      console.log("Usuario admin ya existe");
      return;
    }

    const encryptedPassword = await bcrypt.hash("adminpablo111", 10);

    const adminUser = new User({
      nombre: "Admin_Pablo",
      username: "adminpablo",
      email: "adminpablo@gmail.com",
      password: encryptedPassword,
      rol: "ADMIN_ROLE"
    });

    await adminUser.save();

    console.log("Usuario admin creado correctamente");

  } catch (error) {
    console.error("Error creando usuario por defecto:", error);
  }
};