import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Todo } from '../../models/Todo'
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../../firebase';

// toolkit hỗ trợ viết type cho action : sẽ gồm name/tên action
/// action : todos/addTodo
const todoSlice = createSlice({
    name : 'todos',
    initialState : {todos : <Todo[]>[]},
    /// addTodo chính là action creators , sử dụng lúc dispatch gọi
    reducers : {
        addTodo: (state : {todos : Todo[]}, action : {payload : string}) => {
            // return [...state, {id: Math.floor(Math.random() * 100 + 1), todo: action.payload, isDone: false }] REDUX CORE dưới là Toolkit
            state.todos.push({id: Math.floor(Math.random() * 100 + 1), todo: action.payload, isDone: false })
        },
        doneTodo: (state : {todos : Todo[]}, action: {payload : number}) => {
           const index = state.todos.findIndex(todo => todo.id === action.payload)
           if(index > -1) {
            state.todos[index] = {
                ...state.todos[index], isDone : !state.todos[index].isDone
            }
           }
        },
        deleteTodo : (state : {todos : Todo[]}, action : {payload : number}) => {
             state.todos.filter(todo => todo.id !== action.payload)
        },
        editTodo : (state : {todos : Todo[]}, action: {payload : {id : number, todo : string}}) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id)
           if(index > -1) {
            state.todos[index] = {
                ...state.todos[index], todo : action.payload.todo
            }
           }
        }
    },
    extraReducers : ((builder) => {
        builder.addCase(getAllTodoThunk.fulfilled,(state, action ) => {
            state.todos = action.payload?.todos
        }),
        builder.addCase(addTodoThunk.fulfilled, (state,action) => {
            state.todos = action.payload?.todos
        }),
        builder.addCase(deleteTodoThunk.fulfilled, (state,action) => {       
            state.todos = action.payload?.todos
        }),
        builder.addCase(doneTodoThunk.fulfilled, (state, action) => {
            state.todos = action.payload?.todos
        }),
        builder.addCase(editTodoThunk.fulfilled, (state, action) => {
            state.todos = action.payload?.todos
        })
        
    })
})

export const getAllTodoThunk = createAsyncThunk('todos/getAll', async () => {
    const docRef = doc(db, "todos", "todos");
    const docSnap = await getDoc(docRef);
    return docSnap.data()
})


export const addTodoThunk = createAsyncThunk('todos/addTodo', async (todo: string) => {
    const docRef = doc(db, "todos", "todos");
    await updateDoc(docRef,{
        todos : arrayUnion({
            id : Math.floor(Math.random() * 100 + 1),
            isDone : false,
            todo
        })     
    });
    const ref = doc(db, "todos", "todos");
    const docSnap = await getDoc(ref);
    return docSnap.data()    
})

export const deleteTodoThunk = createAsyncThunk('todos/deleteTodo', async (id : number) => {
    const ref = doc(db, "todos", "todos");
    const docSnap = await getDoc(ref);
    // const ref = doc(db, "todos", "todos");
    const arr = docSnap.data()?.todos.filter((todo : Todo) => {
        return todo.id != id
    });
    await updateDoc(ref, {
        todos : arr
    })
    const docSnap2 = await getDoc(ref);
      
    return docSnap2.data()   
})

export const doneTodoThunk = createAsyncThunk('todos/doneTodo', async (id : number) => {
    const ref = doc(db, "todos", "todos");
    const docSnap = await getDoc(ref);
    const arr = docSnap.data()?.todos
    const index = arr.findIndex((todo : Todo) => todo.id == id)
    if(index > -1) {
        arr[index] = {
            ...arr[index], isDone : !arr[index].isDone
        }
    }
    await updateDoc(ref, {
        todos : arr
    })
    const docSnap2 = await getDoc(ref);
      
    return docSnap2.data()   
})

export const editTodoThunk = createAsyncThunk('todos/editTodo', async (params :{id : number, newTodo : string}) => {
    const ref = doc(db, "todos", "todos");
    const docSnap = await getDoc(ref);
    const arr = docSnap.data()?.todos
    const index = arr.findIndex((todo : Todo) => todo.id == params.id)
    if(index > -1) {
        arr[index] = {
            ...arr[index], todo : params.newTodo
        }
    }
    await updateDoc(ref, {
        todos : arr
    })
    const docSnap2 = await getDoc(ref);
      
    return docSnap2.data()   
})
export default todoSlice.reducer
export const {addTodo,doneTodo,deleteTodo,editTodo } = todoSlice.actions