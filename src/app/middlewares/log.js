export default (request, response, next) => {
  const { method, url, params, query, body, ip } = request;
  console.log(method, url, params, query, body, ip);

  next();
};
