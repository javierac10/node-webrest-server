import { Request, Response } from 'express';

const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy butter', completedAt: new Date() }
]

export class TodosConroller {


    constructor() {}

    public getTodos = (req: Request, res: Response) => {
        res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params?.id || 0;

        if ( isNaN(id) ) res.status(400).json({ error: `ID argument is not a number`})

        const todo = todos.find(todo => todo.id === id);
        
        ( todo )
            ? res.json(todo)
            : res.status(404).json({ error: `todo with id ${ id } not found`})
    }

    public createTodo = (req: Request, res: Response) => {

        const { text } = req.body;
        if ( !text ) return res.status(400).json({ error: 'Text property is required' });
        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: new Date()
        };
        
        todos.push( newTodo );
        res.json( newTodo );

    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const { text, completedAt } = req.body;

        if ( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number`})
        
        // if ( !text ) return res.status(400).json({ error: 'Text property is required' });
        
        const todo = todos.find( todo => todo.id === id);
        if ( !todo ) return res.status(400).json({ error: 'Todo with ID property not found' });

        todo.text = text || todo.text;
        ( completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date( completedAt || todo.completedAt );
        
        res.json( todo );

    }

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id;

        if ( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number`})

        const todo = todos.find( todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Todo with ID ${ id } not found`})
       
        todos.splice( todos.indexOf(todo), 1 );
        
        // const newTodos = todos.filter( todo => todo.id !== id);
        res.json(todo);
    };
}