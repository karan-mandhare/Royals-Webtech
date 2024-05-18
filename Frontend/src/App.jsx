import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";
import PrivateRoute from "./constants/PrivateRoute";
import Edit from "./component/Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={Dashboard} />}
        />
        <Route path="/edit" element={<PrivateRoute element={Edit} />} />
      </Routes>
    </Router>
  );
}

export default App;
