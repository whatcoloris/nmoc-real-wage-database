const dotenv = require('dotenv');
const path = {path:__dirname+'/process.env'};
dotenv.config(path);

const access = process.env.ACCESS_KEY;
const secret = process.env.SECRET_KEY;

console.log(path);
console.log(access);
console.log(secret);