First i defined the server file
inside the server file , i created a server using express ,and run the server on port 6969

secondly -> i created the DB folder , inside the db folder i created a file called db.ts where i implemented a connection to db using the mongoDB credentials ,

Third -> created a User Schema in the Model folder -> this user Schema includes name , email , password and createdAt fields
email field is unique field , and the name , email and password fields are required fields

Four -> Created a Register and Login functionality for the Project
Register -> in the Register functionality we created a hash password using bcrypt
Login -> in the Login functionality we generate a token using jwt from (jsonwebToken) and returned in the response

400 Bad Request — invalid input data
401 Unauthorized — missing/invalid token
403 Forbidden — insufficient role
404 Not Found — resource doesn't exist
500 Internal Server Error
