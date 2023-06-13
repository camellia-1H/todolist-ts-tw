import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { Todo } from '../../models/Todo'

// toolkit hỗ trợ viết type cho action : sẽ gồm name/tên action
/// action : todos/addTodo
const todoSlice = createSlice({
    name : 'todos',
    initialState : {status : 'idle',todos : <Todo[]>[]},
    /// addTodo chính là action creators , sử dụng lúc dispatch gọi
    reducers : {
        addTodo: (state : {status : string ,todos:Todo[]}, action : {payload : string}) => {
            // return [...state, {id: Math.floor(Math.random() * 100 + 1), todo: action.payload, isDone: false }] REDUX CORE dưới là Toolkit
            state.todos.push({id: Math.floor(Math.random() * 100 + 1), todo: action.payload, isDone: false })
        },
        doneTodo: (state : {status : string ,todos:Todo[]}, action: {payload : number}) => {
           const index = state.todos.findIndex(todo => todo.id === action.payload)
           if(index > -1) {
            state.todos[index] = {
                ...state.todos[index], isDone : !state.todos[index].isDone
            }
           }
        },
        deleteTodo : (state : {status : string ,todos:Todo[]}, action : {payload : number}) => {
            state.todos.filter(todo => todo.id !== action.payload)
        },
        editTodo : (state : {status : string ,todos:Todo[]}, action: {payload : {id : number, todo : string}}) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id)
            if(index > -1) {
            state.todos[index] = {
                ...state.todos[index], todo : action.payload.todo
            }
           }
        }
    }
    , extraReducers : ((builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            console.log(action.payload);
            
            state.status = 'fetch todo done';
            state.todos = action.payload ;
        })
     
        .addCase(addTodoThunk.fulfilled, (state, action) => {
            state.status = 'add todo done'
            console.log(action.payload);
            
            state.todos.push(action.payload)
        })
        .addCase(doneTodoThunk.fulfilled,(state, action) => {
            state.status = 'done todo done'
            const index = state.todos.findIndex(todo => todo.id == action.payload.id)
            console.log(index);
            if(index > -1) {
                state.todos[index] = action.payload
            }
        })
        .addCase(editTodoThunk.fulfilled, (state, action) => {
            state.status = 'edit to do done'
            const index = state.todos.findIndex(todo => todo.id == action.payload.id)
            console.log(index);
            if(index > -1) {
                state.todos[index] = action.payload
            }
        })
        .addCase(deleteTodoThunk.fulfilled, (state, action) => {
            state.status = 'delete todo done'
            console.log(action.payload);
            
            state.todos = action.payload
        })
    })
})
// fetchTodos : thunk action creator
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const res = await fetch('/api/todos')
    const data = await res.json()
    // const data = await res.json() as Todo[]
    console.log(data);
    return data.todos;
})

export const addTodoThunk = createAsyncThunk("todos/addTodo", async (todo : string) => {
    const res = await fetch('/api/todos', {
        method : 'POST',
        body : JSON.stringify(todo)
    })
    const data = await res.json()
    console.log(data);
    return data.todos
})

export const doneTodoThunk = createAsyncThunk('todos/doneTodo',async (id:number) => {
    const res = await fetch('/api/doneTodo', {
        method : 'POST', 
        body: JSON.stringify(id)
    })
    const data = await res.json()
    console.log('[doneTodo]',data.todos);
    return data.todos
})

export const editTodoThunk = createAsyncThunk('/todos/editTodo',async (params : {id:number, todo : string}) => {
    const res = await fetch('/api/editTodo', {
        method : 'PUT', 
        body : JSON.stringify(params)
    })
    const data = await res.json()
    return data.todos  
})

export const deleteTodoThunk = createAsyncThunk('/todos/deleteTodo',async (id : number) => {
    const res = await fetch('/api/todos', {
        method : 'DELETE', 
        body : JSON.stringify(id)
    })
    const data = await res.json()
    return data.todos  
})

export default todoSlice.reducer
export const {addTodo,doneTodo,deleteTodo,editTodo } = todoSlice.actions