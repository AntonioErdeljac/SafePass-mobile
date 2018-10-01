import api from './api';
import apiHandler from './apiHandler';
import client from './client';

export default {
  build: (path, ...params) => {
    params.reverse();
    return path.replace(/(:\w+)/g, () => params.pop());
  },
  api,
  apiHandler,
  client,
};
