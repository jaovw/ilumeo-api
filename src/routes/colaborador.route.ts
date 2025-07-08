import { Router } from 'express';
import { ColaboradorController } from '../controller/colaborador.controller';

const router = Router();

router.post('/', ColaboradorController.create);
router.get('/', ColaboradorController.list);
router.get('/:id', ColaboradorController.get);
router.put('/:id', ColaboradorController.update);
router.delete('/:id', ColaboradorController.delete);

export default router;
