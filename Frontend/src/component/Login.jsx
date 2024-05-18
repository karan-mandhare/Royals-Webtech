import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const responce = await axios.post("/api/employee/login", {
        email,
        password,
      });
      const employee = responce.data;
      console.log("token", employee.employee[1]);
      if (employee) {
        toast.success(responce.data.message);
        localStorage.setItem("token", employee?.employee[1]);
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleSignUp = async () => {
    navigate("/signup");
  };

  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="bg-blue-300 w-full text-center flex">
        <h1 className="font-bold text-5xl py-10 w-[95%] ml-4">Login Page</h1>
        <div>
          <button className="mt-12" onClick={handleSignUp}>
            sign up
          </button>
        </div>
      </div>
      <div className="mt-28">
        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 rounded-lg text-xl w-[350px] border-2 border-black"
        />
      </div>
      <div className="mt-10">
        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 rounded-lg text-xl w-[350px] border-2 border-black"
        />
      </div>
      <div className="m-10 rounded-lg p-4 px-8 bg-blue-400 text-2xl">
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
