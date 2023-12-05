import { Router } from 'express'
import { TodosConroller } from './controller';


export class TodosRoutes {

    static get routes(): Router {

        const router = Router();
        const todoController = new TodosConroller();

        // Routes
        router.get('/', todoController.getTodos );
        router.get('/:id', todoController.getTodoById );

        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }

}