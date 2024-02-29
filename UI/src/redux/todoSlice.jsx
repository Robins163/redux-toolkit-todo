import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const getTodoAsync = createAsyncThunk("todos/getTodo", async () => {
  const resp = await fetch("http://localhost:7000/todos");
  if (resp.ok) {
    const todos = await resp.json();
    return { todos };
  }
});

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async (payload) => {
    const resp = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (payload) => {
    const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: payload.id,
      }),
    });
    if (resp.ok) {
      const todos = await resp.json();
      return { todos };
    }
  }
);

export const toggleCompletedAsync = createAsyncThunk(
  "todos/toggleComplete",
  async (payload) => {
    const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: payload.completed,
      }),
    });
    if (resp.ok) {
      const todos = await resp.json();
      return { todos };
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: true },
  ],
  reducers: {
    // addTodo: (state, action) => {
    //   const newTodo = {
    //     id: uuidv4(),
    //     title: action.payload.title,
    //     completed: false,
    //   };
    //   state.push(newTodo);
    // },
    // toggleCompleted: (state, action) => {
    //   const index = state.findIndex((item) => item.id === action.payload.id);
    //   state[index].completed = action.payload.completed;
    // },
    // deleteTask: (state, action) => {
    //   return state.filter((item) => item.id !== action.payload.id);
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(getTodoAsync.fulfilled, (state, action) => {
      return action.payload.todos;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.push(action.payload.todo);
    });
    builder.addCase(toggleCompletedAsync.fulfilled, (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index].completed = action.payload?.completed;
    });
    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    });
  },
});

export const { addTodo, toggleCompleted, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
