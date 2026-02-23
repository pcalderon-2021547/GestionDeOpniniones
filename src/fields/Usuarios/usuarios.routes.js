import { Router } from 'express';
import { createField, getFields, updateProfile } from './usuarios.controller.js';
import { validateJWT } from '../../../middlewares/validate_jwt.js';
import { requireRole } from '../../../middlewares/validate_role.js';

const router = Router();

router.post(
    '/create',
   validateJWT,
    requireRole('ADMIN_ROLE'),
    createField
)

router.get(
    '/',
    getFields
)

router.put(
    '/profile/:id',
    validateJWT,
    updateProfile
)

export default router;