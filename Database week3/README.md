# Homework

* Design and finalize the ToDo App database. Be creative. Support multiple users.
* Create a node server to make Web APIs for ToDo app
* Support following functions:
Insert item(s) in ToDo list
Delete item(s) in ToDo list
Create a new ToDo list
Delete a ToDo list
Mark an item as completed
Add a reminder for the list (not for the item)
* Write the necessary SQL statements/commands to maintain the state of the database.
* Use PostMan to test the APIs.


## MySQL ToDo App With Node.js
This is a simple Node.js application that demonstrates how to use MySQL with prepared statements to create a ToDo app. It provides an API for managing ToDo lists and items.


### Notes
* Make sure you have todo_database created

* node index.js [YourMysqlPassword] to start server connected to todo_database on localhost

* test with postman


### Usage
Start the server:

use "node index.js" command the server will start running on http://localhost:3000.


to set user post /user with "name":value in JSON format in request body

to get users list get /lists with "name":value in JSON format in request body

to delete item in list delete /deleteItem with "task_id":value in JSON format in request body

to delete list
delete /deleteList with "list_id":value in JSON format in request body

to create list put /createList with user_id:value, list_name:value in JSON format in request body

to insert item in to do list put /insertItem with list_id:value, item:value in JSON format in request body

to mark task as completed put /completed with completed:1 for true 0 for false, task_id:value in JSON format in request body
