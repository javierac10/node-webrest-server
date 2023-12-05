import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy butter', completedAt: new Date() }
]

export class TodosConroller {


    constructor() {}

    public getTodos = async(req: Request, res: Response) => {
        const todos = await prisma.todo.findMany()
        
        res.json(todos)
    }

    public getTodoById = async(req: Request, res: Response) => {
        const id = +req.params?.id || 0;

        if ( isNaN(id) ) res.status(400).json({ error: `ID argument is not a number`})

        // const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findFirst({
            where: { id }
        });
        
        ( todo )
            ? res.json(todo)
            : res.status(404).json({ error: `todo with id ${ id } not found`})
    }

    public createTodo = async(req: Request, res: Response) => {

        // const { text } = req.body;

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if ( error ) return res.status(400).json({ error });

        // if ( !text ) return res.status(400).json({ error: 'Text property is required' });

        const todo = await prisma.todo.create({
            // data: { text }
            data: createTodoDto!
        });

        // const newTodo = {
        //     id: todos.length + 1,
        //     text,
        //     completedAt: new Date()
        // };
        
        // todos.push( newTodo );
        // res.json( newTodo );
        res.json(todo);

    }

    public updateTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updatedTodoDto ] = UpdateTodoDto.update({ ...req.body, id});
        if ( error ) return res.status(400).json({ error });

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if ( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number`})
        
        // if ( !text ) return res.status(400).json({ error: 'Text property is required' });
        
        // const todo = todos.find( todo => todo.id === id);

        
        if ( !todo ) return res.status(400).json({ error: 'Todo with ID property not found' });

        // const { text, completedAt } = req.body;
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updatedTodoDto!.values   
        })

        // todo.text = text || todo.text;
        // ( completedAt === 'null')
        //     ? todo.completedAt = null
        //     : todo.completedAt = new Date( completedAt || todo.completedAt );
        
        res.json( updatedTodo );

    }

    public deleteTodo = async(req: Request, res: Response) => {

        const id = +req.params.id;

        if ( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number`});

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        const deleted = prisma.todo.delete({
            where: { id }
        });

        // const todo = todos.find( todo => todo.id === id);
        // if (!todo) return res.status(404).json({ error: `Todo with ID ${ id } not found`})
       
        // todos.splice( todos.indexOf(todo), 1 );
        
        // const newTodos = todos.filter( todo => todo.id !== id);

        ( deleted )
            ? res.json( deleted )
            : res.status(400).json({ error: `Todo with id ${ id } not found` })

    };
}