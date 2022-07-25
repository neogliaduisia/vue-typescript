import axios, { type AxiosResponse } from 'axios';
const PATH_ROOT = `https://api.themoviedb.org/3/`;

export const gateway = async (method: string, path: string, payload: any = null): Promise<any> => {
  const url: string = PATH_ROOT + path + `?api_key=61450b73b912f07d51a987f7ff52121a`;
  const args = { method, url, params: null, data: null };

  // Handle HTTP methods
  switch (method) {
    case 'GET':
      args.params = payload;
      break;
    case 'POST':
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
      args.data = payload;
      break;
  }

  // Make XHR call
  const response: AxiosResponse<any> = await axios(args);
  return response.data;
};
