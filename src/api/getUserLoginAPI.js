import axios from "axios";

const getUserLogin = async () => {
  const getJWT = localStorage.getItem("Token");

  const userLogin = await axios.get(
    `${process.env.REACT_APP_BASEURL}/api/v1/user`,
    {
      headers: {
        Authorization: `Bearer ${getJWT}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
    }
  );
  return userLogin.data;
};

export default getUserLogin;
