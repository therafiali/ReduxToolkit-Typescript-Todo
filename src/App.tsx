import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./hook";
import { fetchTodos, addTodoAsync } from "./store/todosSlice";
import Todo from "./components/Todo";
import { Container, Box, TextField } from "@mui/material";

const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodoAsync(newTodo));
      setNewTodo("");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", // Ensures full screen height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4297a0 30%, #0c4160 90%)", // Gradient background
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", my: 4 }}>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-[#e3e8e9] my-8">
            Todo App Using Redux ToolKit
          </h1>
          <div className="flex gap-2 justify-between my-6">
            <TextField
              className="w-[80%]"
              label="Add a new todo"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white", // Text color
                  "& fieldset": {
                    borderColor: "white", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "gray", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Border color when focused
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white", // Label color when focused
                },
              }}
              variant="outlined"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />

            <button
              onClick={handleAddTodo}
              className=" px-8 rounded-md border border-white bg-[#e3e8e9] text-black text-xl font-bold hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            >
              Add Todo
            </button>
          </div>

          <Box>
            {todos.map((todo) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
