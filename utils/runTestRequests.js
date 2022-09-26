const axios = require('axios').default;
const userId = 11;
const instanceUrls = [`http://localhost:3000/bet/${userId}`, `http://localhost:3001/bet/${userId}`];

Promise.all(instanceUrls.map((url) => axios.get(url)));
