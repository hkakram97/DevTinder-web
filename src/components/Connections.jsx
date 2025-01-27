import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data?.data));
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Connections</h1>

      {connections.map((connection, index) => {
        const { firstName, lastName, age, gender, about, photoUrl } =
          connection;
        return (
          <div
            key={index}
            className="flex my-4 p-4 rounded bg-base-300 w-1/2 m-auto"
          >
            <div>
              <img src={photoUrl} className="w-20 h-20 rounded-full" />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
