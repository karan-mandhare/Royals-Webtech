import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const handleLogout = async () => {
    try {
      const responce = await axios.post(`/api/employee/logout`);
      localStorage.clear();
      navigate("/");
      toast.success(responce.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleEdit = async () => {
    navigate("/edit");
  };

  const handleDelete = async (id) => {
    try {
      const responce = await axios.delete(`/api/employee/delete/${id}`);
      localStorage.clear();
      toast.success(responce.data.message);
      navigate("/signup");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const responce = await axios.get("/api/employee/employee");
        if (responce) {
          const employeeData = responce?.data.employee;
          if (employeeData && employeeData.dob) {
            const date = new Date(employeeData.dob);
            const formattedDob = date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            employeeData.dob = formattedDob;
          }
          setEmployee(employeeData);
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

    getEmployeeData();
  }, []);

  return (
    <div>
      <div className="flex py-4 bg-blue-300">
        <h1 className="w-[96%] text-5xl font-bold text-center">DASHBOARD</h1>
        <div>
          <button className="mt-2" onClick={handleLogout}>
            logout
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 text-4xl">
      <h1 className="mb-12 text-6xl font-bold">Welcom to the Dashboard</h1>
        <h4 className="mb-8">Name :- {employee?.name}</h4>
        <h4 className="mb-8">Email :- {employee?.email}</h4>
        <h4 className="mb-8">Gender :- {employee?.gender}</h4>
        <h4 className="mb-8">DOB :- {employee?.dob}</h4>
        <div>
          <button
            className="m-4 text-xl bg-green-400 px-4 py-2 rounded-lg"
            onClick={handleEdit}
          >
            edit
          </button>
          <button
            className="m-4 text-xl bg-red-400 px-4 py-2 rounded-lg"
            onClick={() => handleDelete(employee._id)}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
