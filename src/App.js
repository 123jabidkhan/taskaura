import { React } from "react";
import "bootstrap/dist/css/bootstrap.css";
import TaskList from "./pages/components/TaskList/TaskList";
import Card from "@mui/material/Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App bg-light h-800" style={{height:"800px","background":"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(2,2,25,1) 35%, rgba(4,52,13,0.6699054621848739) 100%)"}}>
      <div className="row">
        <div className="col-sm-10 offset-1">
          <Card style={{ padding: "10px", margin: "20px" }}>
            <h2 className="text-success text-center m-2 bg-dark p-3">TaskAura</h2>
            <TaskList />
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
