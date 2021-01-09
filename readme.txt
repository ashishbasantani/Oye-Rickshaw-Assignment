Assumptions:
1. The port of application is set to run at 5000
2. The date of ToDo by default is taken as current date. The format of date is yyyy-mm-dd
3. The description is not mandatory
4. For priority, lower the value higher the priority

Routes defined:
1. /create: Purpose of this route is to make a new ToDo entry. Method used is post

2. /getall: To get all the ToDo entries

3. /get/:attribute/:value : Filter the row entries based on the params attribute and value. Eg. get all rows having priority = 1 so here "attribute" will be "priority" and "value" will be "1"

4. /get-sorted-on-high-priority: Get all ToDo entries sorted by priority for the purpose of prioritizing todos

5. /updateall/:id : Updates values of all the attributes based on the "id" in params

6. /update/:id : Updates any selected attribute. The PUT method is used and the request body includes two properties: attribute & value

7. /delete/:id : Delete the row depending on the id passed in params

Approach:

I have used Express for making the server listen to different routes that are created. I simply used the concept of CRUD (Create, Read, Update, Delete) and developed APIs for that. For avoiding duplicacy of code I made APIs in such a way that attribute on which filteration is to be done is passed in end points routes (Eg. /update route, /get route).

DB Schema:
File todo_database.sql includes the queries for database creation & table creation

Steps to run the application:
1. Run "npm install" to install all the module dependecies
2. Create database and table (SQL queries are in todo_database.sql file)
3. Update password, port, host etc in db_connection.js file
4. Run "node server.js"