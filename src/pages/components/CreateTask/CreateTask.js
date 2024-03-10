import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { toast } from "react-toastify";

export const CreateTask = () => {
  const [open, setOpen] = React.useState(false);
  var currentDate = new Date().toISOString().slice(0,10); 
    
  const [createForm , setCreateForm] = useState({
    taskName: "",
    taskDescription: "",
    taskAssignedTo: "",
    taskCreatedAt: currentDate,
    taskCompletedAt: "",
    status: "pending",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    resetForm()
  };

  //   #handleOnChange
  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setCreateForm({ ...createForm, [name]: value });
  };

  // handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = createForm;
    if (
      newTask.taskName === "" ||
      newTask.taskDescription === "" ||
      newTask.taskAssignedTo === ""
    ) {
      toast.error("Please fill  all the fields..!!");
    } else {
      axios.post("http://localhost:5000/tasks", newTask).then((res) => {
        toast.success("Task Updated!!");
        resetForm();
        setOpen(false);
        window.location.reload();
      });
    }
  };

  // resetForm
  const resetForm = () => {
    setCreateForm({
      taskName: "",
      taskDescription: "",
      taskAssignedTo: "",
      taskCreatedAt: currentDate,
      status: "pending",
    });
  };

  return (
    <div>
      <Button
        style={{ float: "right" }}
        variant="contained"
        onClick={handleClickOpen}
      >
        {" "}
        New Task{" "}
      </Button>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title" className="text-center bg-light">
            Task Details Form{" "}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <br />
              <input
                style={{ width: "450px" }}
                value={createForm.taskName}
                name="taskName"
                type="text"
                className="form-control"
                placeholder="Task Name"
                onChange={handleOnChange}
              />{" "}
              <br />
              <input
                style={{ width: "450px" }}
                value={createForm.taskDescription}
                name="taskDescription"
                type="text"
                className="form-control"
                placeholder="Task Desctiption"
                onChange={handleOnChange}
              />
              <br />
              <input
                style={{ width: "450px" }}
                value={createForm.taskAssignedTo}
                name="taskAssignedTo"
                type="text"
                className="form-control"
                placeholder="Task Assign To"
                onChange={handleOnChange}
              />
              <br />
              <input
                style={{ width: "450px" }}
                value={createForm.taskCreatedAt}
                name="taskCreatedAt"
                type="date"
                className="form-control"
                placeholder="Created At"
                onChange={handleOnChange}
              />
              <DialogActions>
                <Button type="submit" color="success" variant="contained">
                  Confirm
                </Button>
                <Button color="error" variant="contained" onClick={resetForm}>
                  Clear
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateTask;
