import axios from "axios";

export default function request({url, responseType = 'json'}) {
  const fetchData = () => {
    return axios({
      url,
      responseType,
    }).then(({data}) => {
      return data;
    });
  };
  return fetchData();
}