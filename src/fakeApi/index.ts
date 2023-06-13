import { createServer, Model, Registry } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { Todo } from '../models/Todo';
 
type AppRegistry = Registry<{ todos: typeof Model }, { /* factories can be defined here */ }>
type AppSchema = Schema<AppRegistry>

// And then on the route handler use like the following:
// this.get('/users', (schema: AppSchema) => {
//   return schema.all('user');
// })
export const setupServer = () => {
  createServer({
    models: {
      todos: Model,
    },
    routes() {
      this.get('/api/todos', (schema : AppSchema) => {
        return schema.all('todos');
      });

      this.post('/api/todos', (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        console.log(payload);
        return schema.create('todos', {id : String(Math.floor(Math.random() * 100 + 1)),todo : payload, isDone : false});
      });

      this.post('/api/doneTodo', (schema : AppSchema, request) => {
        const id = JSON.parse(request.requestBody);

        const currentTodo = schema.find('todos',id);
        const obj : Partial<Todo> = {
          ...currentTodo?.attrs
        }
        console.log(obj);
    
        currentTodo?.update({isDone : !obj.isDone});
        console.log(currentTodo);
        
        return currentTodo; 
      });

      this.put('/api/editTodo', (schema, request) => {
        const id = JSON.parse(request.requestBody).id;
        const editString = JSON.parse(request.requestBody).todo;
        const currentTodo = schema.find('todos', id);
        console.log(currentTodo);
        
        currentTodo?.update({ todo : editString})
        console.log(currentTodo);
  
        return currentTodo;
      });

      this.del('/api/todos', (schema, request) => {
        const id = JSON.parse(request.requestBody);
        const currentTodo = schema.find('todos',id);
        currentTodo?.destroy()        
        return schema.all('todos')
      });
      
    }
  });
};