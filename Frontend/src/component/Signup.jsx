import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    navigate("/");
  };

  const handleSignUp = async () => {
    try {
      const responce = await axios.post("/api/employee/signup", {
        name,
        email,
        gender,
        dob,
        password,
      });
      const employee = responce?.data;

      if (employee) {
        toast.success(employee.message);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="bg-blue-300 w-full text-center flex">
        <h1 className="font-bold text-5xl py-10 w-[95%] ml-6">Sign Up Page</h1>
        <div>
          <button className="mt-12" onClick={handleLogin}>
            Log In
          </button>
        </div>
      </div>
      <div className="mt-10">
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
          className="p-4 rounded-lg text-xl w-[350px] border-2 border-black"
        />
      </div>
      <div className="mt-5">
        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 rounded-lg text-xl w-[350px] border-2 border-black"
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

      <div className="m-10 rounded-lg p-4 px-8 bg-blue-400 text-2xl">
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
