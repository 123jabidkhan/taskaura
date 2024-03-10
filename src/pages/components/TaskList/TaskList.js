import { React, useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "../CreateTask/CreateTask";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const TaskList = () => {
  const [totalTasks, setTotalTasks] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState("");
  var currentDate = new Date().toISOString().slice(0, 10);
  const [filter, setFilter] = useState('');



  const [editForm, setEditForm] = useState({
    taskName: "",
    taskDescription: "",
    taskAssignedTo: "",
    taskCompletedAt: currentDate,
    status: "pending",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => {
      const data = res.data;
      setTotalTasks(data);
      console.log(totalTasks);
    });
  }, []);


  // handleFilterChange
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // filteredData
  const filteredData = totalTasks.filter(item =>
    item.status.toLowerCase().includes(filter.toLowerCase()) || item.taskAssignedTo.toLowerCase().includes(filter.toLowerCase())
  );

  // ....pagination

const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(filteredData.length / 5);
const indexOfLastItem = currentPage * 5;
const indexOfFirstItem = indexOfLastItem - 5;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

const nextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

const goToPage = (pageNumber) => {
  setCurrentPage(pageNumber);
};

  // deleteTask
  const deleteTask = (id) => {
    const confirm = window.confirm('Do You Want To Delete Task ?');
    if(confirm){
      axios.delete(`http://localhost:5000/tasks/${id}`).then((res) => {
        toast.success("Task Deleted!");
        window.location.reload();
      });
    }
    
    
  };

  // updateTask
  const updateTask = (id) => {
    setTaskId(id);
    setShowEditForm(true);
    setOpen(true);
    axios.get(`http://localhost:5000/tasks/${id}`).then((res) => {
      console.log(res.data);
      let currentData = res.data;
      setEditForm(currentData);
    });
  };

  // handleClose
  const handleClose = () => {
    setOpen(false);
  };

  // handleOnChange
  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setEditForm({ ...editForm, [name]: value });
  };


  // handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTask = editForm;
    if (
      updatedTask.taskName === "" ||
      updatedTask.taskDescription === "" ||
      updatedTask.taskAssignedTo === "" ||
      updatedTask.status === ""
    ) {
      toast.error("Please fill all the fileds!");
    } else {
      axios
        .patch(`http://localhost:5000/tasks/${taskId}`, updatedTask)
        .then((res) => {
          toast.success("Task Created!!");
          setOpen(false);
      window.location.reload();

        });
    }
  };

  return (
    <div>
      {/* create task component */}
      <div className="row">
        <div className="col-sm-4">
        <input
        type="text"
        placeholder="Filter By Mame & Status"
       className="form-control"
       value={filter}
        onChange={handleFilterChange}
      />
        </div>
        <div className="col-sm-4 fw-bold fs-4">
          Total Task : <span style={{fontSize:"35px",color:"green"}}>{totalTasks.length}</span>
        </div>
        <div className="col-sm-4">

      <CreateTask />
        </div>
      </div>

      {/* tasks list show */}
      
      <table className="table">
        <thead>
          <tr>
            <th>S NO</th>
            <th>Task Assigned</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((task, ind) => {
            return (
              <tr>
                <td>{ind + 1}</td>
                <td>{task.taskAssignedTo}</td>
                <td>{task.taskName}</td>
                <td>{task.taskDescription}</td>
                <td>{task.taskCreatedAt}</td>
                <td>
                {
                  task.status != 'pending' ? <span className="text-success">{task.status}</span> :<span className="text-danger">{task.status}</span>
                }
               
                </td>
                <td>
                  <Button
                    type="submit"
                    color="warning"
                    variant="outlined"
                    onClick={() => updateTask(task.id)}
                  >
                    <span style={{fontSize:"15px",fontWeight:"bold"}}>-</span>
                  </Button>
                  &nbsp;
                  <Button
                    onClick={()=>deleteTask(task.id)}
                    type="submit"
                    color="error"
                    variant="outlined"
                  >
                    X
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
     {/* pagination */}
     <div className="float-right">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => goToPage(index + 1)}>{index + 1}&nbsp;</button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      {/* delete task form */}
    

      {/* edit task form  */}
      {showEditForm && (
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle
              id="alert-dialog-title"
              className="text-center bg-light"
            >
              Update Task Details{" "}
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <br />
                <input
                  style={{ width: "450px" }}
                  name="taskName"
                  value={editForm.taskName}
                  type="text"
                  className="form-control"
                  placeholder="Task Name"
                  onChange={handleOnChange}
                />{" "}
                <br />
                <input
                  style={{ width: "450px" }}
                  name="taskDescription"
                  value={editForm.taskDescription}
                  type="text"
                  className="form-control"
                  placeholder="Task Desctiption"
                  onChange={handleOnChange}
                />
                <br />
                <input
                  style={{ width: "450px" }}
                  name="taskAssignedTo"
                  value={editForm.taskAssignedTo}
                  type="text"
                  className="form-control"
                  placeholder="Task Assign To"
                  onChange={handleOnChange}
                />
                <br />
                <input
                  style={{ width: "450px" }}
                  name="status"
                  value={editForm.status}
                  type="text"
                  className="form-control"
                  placeholder="Status"
                  onChange={handleOnChange}
                />
                <DialogActions>
                  <Button
                    type="submit"
                    color="success"
                    variant="outlined"
                    onClick={handleSubmit}
                  >
                    Update
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={handleClose}
                  >
                    Exit
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default TaskList;
