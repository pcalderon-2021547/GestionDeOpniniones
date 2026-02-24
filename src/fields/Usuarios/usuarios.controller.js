import bcrypt from 'bcryptjs'

import Field from './usuarios.model.js';

export const createField = async (req, res) => {
    try {

        const { password, ...data } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const field = new Field({
            ...data,
            password: encryptedPassword
        });

        await field.save();

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: field
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        })
    }
}

export const getFields = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const fields = await Field.find()
        .limit(parseInt(limit))
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await Field.countDocuments();

      res.status(200).json({
        success: true,
        data: fields,
        pagination: {
        currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            limit
          }
      });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los campos',
            error: error.message
        });
    }
}

//Editar Perfil
export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword, ...data } = req.body;
        const authenticatedUser = req.user;

        if (authenticatedUser.id.toString() !== id) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para editar un perfil ajeno'
            });
        }

        const user = await Field.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (newPassword) {
            if (!oldPassword) {
                return res.status(400).json({ message: 'Debes ingresar la contraseña anterior' });
            }

            const validOld = await bcrypt.compare(oldPassword, user.password);
            if (!validOld) {
                return res.status(400).json({ message: 'La contraseña anterior es incorrecta' });
            }

            data.password = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await Field.findByIdAndUpdate(id, data, { new: true }).select('-password');

        res.status(200).json({
            success: true,
            message: 'Perfil actualizado exitosamente',
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
