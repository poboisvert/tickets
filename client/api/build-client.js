import axios from 'axios';

const buildClient = ({ req }) => {
  //Server Side
  if (typeof window === 'undefined') {
    return axios.create({
      // baseURL
      baseURL: 'http://www.bonnethood.com/',
      headers: req.headers,
    });
  } else {
    // Browser side
    return axios.create({
      baseUrl: '/', // baseUrl
    });
  }
};

export default buildClient;
