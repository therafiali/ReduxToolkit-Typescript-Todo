import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch todos from the API
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10'); // Limiting to 10 todos
  return response.data;
});

// Async thunk to add a new todo to the API
export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (title: string) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
    title,
    completed: false,
  });
  return response.data;
});

// Async thunk to delete a todo from the API
export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return id;
});

// Async thunk to update a todo in the API
export const editTodoAsync = createAsyncThunk('todos/editTodoAsync', async ({ id, title }: { id: number; title: string }) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    title,
    completed: false,
  });
  return response.data;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export const { toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;