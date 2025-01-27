import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store?.feed);
  console.log("feed: ", feed[0]);

  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex justify-center py-4">
      {feed && <UserCard data={feed[0]} />}
    </div>
  );
};
export default Feed;
