import React, { useState } from "react";
import { useAppDispatch } from "../hook";
import {
  toggleTodo,
  deleteTodoAsync,
  editTodoAsync,
} from "../store/todosSlice";
import CustomUncheckedIcon from "../icons/CustomUncheckedIcon";
import CustomCheckedIcon from "../icons/CustomCheckedIcon";
import {
  Checkbox,
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

interface TodoProps {
  id: number;
  title: string;
  completed: boolean;
}

const Todo: React.FC<TodoProps> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(title);

  const handleSaveEdit = () => {
    if (editText.trim() !== "") {
      dispatch(editTodoAsync({ id, title: editText }));
      setIsEditing(false);
    }
  };

  return (
    <Card className="rounded-full border border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
      sx={{ mb: 2, display: "flex", alignItems: "center", bgcolor: "#e3e8e9", }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={completed}
            onChange={() => dispatch(toggleTodo(id))}
            icon={<CustomUncheckedIcon />} // Custom unchecked icon
            checkedIcon={<CustomCheckedIcon />} // Custom checked icon
          />
          {isEditing ? (
            <TextField
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, mr: 2 }}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                flexGrow: 1,
                textDecoration: completed ? "line-through" : "none",
                color: completed ? "text.secondary" : "text.primary",
              }}
            >
              {title}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions>
        {isEditing ? (
          <IconButton onClick={handleSaveEdit} color="primary">
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setIsEditing(true)} color="secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-pencil text-black"
            >
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
              <path d="m15 5 4 4" />
            </svg>
          </IconButton>
        )}
        <IconButton onClick={() => dispatch(deleteTodoAsync(id))} color="error">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Todo;
