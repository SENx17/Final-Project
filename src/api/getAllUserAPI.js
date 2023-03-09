import axios from "axios";

const getAllUser = async () => {
  const getJWT = localStorage.getItem("Token");

  const allUser = await axios.get(
    `${process.env.REACT_APP_BASEURL}/api/v1/all-user`,
    {
      headers: {
        apiKey: process.env.REACT_APP_APIKEY,
        Authorization: `Bearer ${getJWT}`,
      },
    }
  );
  return allUser.data;
};

export default getAllUser;
