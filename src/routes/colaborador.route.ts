import { Router } from 'express';
import { ColaboradorController } from '../controller/colaborador.controller';

const router = Router();

router.post('/', ColaboradorController.create);
router.get('/', ColaboradorController.list);
// router.get('/:id', ColaboradorController.get);
router.get('/:matricula', ColaboradorController.getByMatricula);
router.get('/:matricula/resumo', ColaboradorController.resumo);
router.put('/:id', ColaboradorController.update);
router.delete('/:id', ColaboradorController.delete);

export default router;
