import { Box, Button, TextField, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./HomePage.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleCompleted,
  deleteTask,
  getTodoAsync,
  addTodoAsync,
  deleteTaskAsync,
  toggleCompletedAsync,
} from "../../redux/todoSlice";

export const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  console.log("87878787", todos);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue) {
      dispatch(
        addTodoAsync({
          title: inputValue,
        })
      );
    }
  };

  const handleToggle = (id, completed) => {
    dispatch(toggleCompletedAsync({ id, completed: !completed }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTaskAsync({ id }));
  };

  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);

  return (
    <div className="homePage">
      <header className="header">My Todo List</header>
      <Typography sx={{ fontSize: "large", fontWeight: 500 }}>
        Total Completed Tasks: 4
      </Typography>
      <div>
        <Box className="inputBox" display="flex">
          <TextField
            fullWidth
            label="Add Task Name"
            id="fullWidth"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            className="addTaskButton"
            variant="contained"
            onClick={handleSubmit}
          >
            Add Task
          </Button>
        </Box>
      </div>
      <div className="tasks">
        <Box
          className="taskDetail"
          sx={{
            marginTop: "20px",
            backgroundColor: "yellow",
            width: "60%",
            height: "70vh",
            marginLeft: "10%",
            padding: "30px",
            overflow: "scroll",
          }}
        >
          <List
            sx={{
              bgcolor: "#58a0a200",
            }}
          >
            {todos.map((todo) => {
              const labelId = `checkbox-list-label-${todo.id}`;
              return (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <DeleteIcon onClick={() => handleDelete(todo.id)} />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    dense
                    className="listItemButton"
                    onClick={() => handleToggle(todo.id, todo.completed)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={todo.completed}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${todo.title}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </div>
    </div>
  );
};
