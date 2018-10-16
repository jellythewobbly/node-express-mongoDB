# node-express-mongoDB

1. Git clone
2. cd to vidly_api
3. npm install (npm i)
4. Ensure you have MongoDB installed, run mongod
5. Start app using nodemon
6. Use postman for HTTP requests

Optional:
If you will like to use a private key to sign JSON web tokens, run "export default_jwtPrivateKey=insertKeyHere", replace insertKeyHere with a key of your choice

To seed sample data, cd to vidly_api and run the following lines:

"mongoimport -d node_vidly -c genres genres.json --jsonArray"

"mongoimport -d node_vidly -c users users.json --jsonArray"

"mongoimport -d node_vidly -c customers customers.json --jsonArray"
