/* eslint-disable react/prop-types */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ data }) => {
  // eslint-disable-next-line react/prop-types
  const { firstName, lastName, age, gender, photoUrl, about, _id } = data;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      {data?.length === 0 ? (
        <h2 className="text-center">No Records found</h2>
      ) : (
        <>
          <figure>
            <img src={photoUrl} alt="User" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{gender + " " + age}</p>}
            {about && <p>{about}</p>}
            <div className="card-actions justify-center py-2">
              <button
                className="btn btn-primary"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Ignored
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleSendRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default UserCard;
