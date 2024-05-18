import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const handleUpdate = async () => {
    try {
      const updatedEmployee = await axios.put(`api/employee/update`, {
        name,
        gender,
        dob,
      });
      console.log(updatedEmployee);
      toast.success(updatedEmployee.data.message);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const getEmployeeData = async () => {
      const employeeData = await axios.get(`/api/employee/employee`);
      const employee = employeeData.data.employee;
      setName(employee.name);
      setEmail(employee.email);
      setGender(employee.gender);
    };
    getEmployeeData();
  }, []);
  return (
    <div>
      <div className="p-8 text-center text-5xl w-full bg-blue-400">
        <h1>Edit Employee Details</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mt-20">
          <input
            type="text"
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 rounded-lg text-xl w-[350px] border-2 border-black"
          />
        </div>
        <div className="mt-5">
          <input
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-lg text-xl w-[350px] border-2 border-black pointer-events-none"
          />
        </div>
        <div className="mt-5 p-4 border-2 border-black rounded-lg px-16">
          <label className="text-xl">
            Select Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select...</option>
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="Others">Others</option>
            </select>
          </label>
        </div>
        <div className="mt-5">
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="p-4 rounded-lg text-xl w-[350px] border-2 border-black"
          />
        </div>
        <div className="mt-5">
          <button
            className="px-8 py-4 bg-green-400 rounded-lg"
            onClick={handleUpdate}
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
