import { Router } from 'express';
import { createField, getFields } from './usuarios.controller.js';
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

export default router;