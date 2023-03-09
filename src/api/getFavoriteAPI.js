import axios from "axios";

const getFavorite = async () => {
  const getJWT = localStorage.getItem("Token");

  const allFavorite = await axios.get(
    `${process.env.REACT_APP_BASEURL}/api/v1/like-foods`,
    {
      headers: {
        Authorization: `Bearer ${getJWT}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
    }
  );

  return allFavorite.data;
};
export default getFavorite;
