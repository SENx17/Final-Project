import axios from "axios";

const getFoods = async () => {
  const getJWT = localStorage.getItem("Token");

  const allFood = await axios.get(
    `${process.env.REACT_APP_BASEURL}/api/v1/foods`,
    {
      headers: {
        apiKey: process.env.REACT_APP_APIKEY,
        Authorization: `Bearer ${getJWT}`,
      },
    }
  );
  return allFood.data;
};

export default getFoods;
