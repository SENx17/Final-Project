import axios from "axios";

const userLogin = async () => {
  axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/user`).then((response) => {
    console.log(response);
  });
};

export default userLogin;
