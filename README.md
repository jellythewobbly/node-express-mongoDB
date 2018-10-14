# node-express-mongoDB

1. Git clone
2. cd to vidly_api
3. npm install (npm i)
4. Run "export default_jwtPrivateKey=exampleSecureKey", replace exampleSecureKey with a key of your choice
5. Ensure you have MongoDB installed, run mongod
6. Start app using nodemon
7. Use postman for HTTP requests

To seed sample data, cd to vidly_api and run the following lines:

"mongoimport -d node_vidly -c genres genres.json --jsonArray"

"mongoimport -d node_vidly -c users users.json --jsonArray"

"mongoimport -d node_vidly -c customers customers.json --jsonArray"
