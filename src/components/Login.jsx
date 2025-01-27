import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("hamza.akram@techwards.co");
  const [password, setPassword] = useState("Techwards@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSumbit = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
      console.log("res data", res.data);
      dispatch(addUser(res?.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong!");
      console.log("error: ", error);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSumbit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
