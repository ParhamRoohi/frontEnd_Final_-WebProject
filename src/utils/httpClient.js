import axios from "axios";

const BASE_URL = "http://localhost:3000";
export function get(path) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return axios.get(`${BASE_URL}${path}`, requestOptions);
}
