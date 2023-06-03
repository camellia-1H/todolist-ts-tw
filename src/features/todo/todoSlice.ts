import {createSlice} from '@reduxjs/toolkit'
import { Todo } from '../../models/Todo'

// toolkit hỗ trợ viết type cho action : sẽ gồm name/tên action
/// action : todos/addTodo
const todoSlice = createSlice({
    name : 'todos',
    initialState : <Todo[]>[],
    /// addTodo chính là action creators , sử dụng lúc dispatch gọi
    reducers : {
        addTodo: (state : Todo[], action : {payload : string}) => {
            // return [...state, {id: Math.floor(Math.random() * 100 + 1), todo: action.payload, isDone: false }] REDUX CORE dưới là Toolkit
            state.push({id: Math.floor(Math.random() * 100 + 1), todo: action.payload, isDone: false })
        },
        doneTodo: (state : Todo[], action: {payload : number}) => {
           const index = state.findIndex(todo => todo.id === action.payload)
           if(index > -1) {
            state[index] = {
                ...state[index], isDone : !state[index].isDone
            }
           }
        },
        deleteTodo : (state : Todo[], action : {payload : number}) => {
            return state.filter(todo => todo.id !== action.payload)
        },
        editTodo : (state : Todo[], action: {payload : {id : number, todo : string}}) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
           if(index > -1) {
            state[index] = {
                ...state[index], todo : action.payload.todo
            }
           }
        }
    }
})

export default todoSlice.reducer
export const {addTodo,doneTodo,deleteTodo,editTodo } = todoSlice.actions