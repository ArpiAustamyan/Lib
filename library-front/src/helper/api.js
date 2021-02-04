import Auth from './auth'

const headers = () => {
  const token = Auth.getToken();
  const h = new Headers();

  h.append('Content-Type', 'application/json');

  if (token) {
    h.append('token', token);
    h.append('Authorization', `Token ${token}`);
  }

  return h;
}

const request = (method, path, body, objective) => {
  const options = { method, headers: headers() };
  if (body)
    options.body = JSON.stringify({
      [objective]: body
    })
  if (!objective)
    options.body = JSON.stringify(body);

  return fetch(new Request(path, options));
}

const Api = {
  get(path) {
    return request('GET', path);
  },
  post(path, data, objective) {
    return request('POST', path, data, objective);
  },
  update(path, data, objective) {
    return request('PUT', path, data, objective);
  },
  delete(path) {
    return request('DELETE', path);
  }
}

export default Api
