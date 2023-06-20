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

#### API ENDPOINTS

Insert item(s) in ToDo list. POST /todo_lists/:listId/items .

Create a new ToDo list POST /todo_lists Create a new ToDo list.

Get all ToDo lists GET /todo_lists: Retrieve all ToDo lists.

Get a specific ToDo list GET /todo_lists/:listId: Retrieve a specific ToDo list by ID.

Update a ToDo list PUT /todo_lists/:listId: Update a ToDo list by ID.

Delete a ToDo list DELETE /todo_lists/:listId: Delete a ToDo list by ID.

Create a new ToDo item POST /todo_lists/:listId/items: Create a new ToDo item in a specific ToDo list.

Update a ToDo item PUT /todo_lists/:listId/items/:itemId: Update a ToDo item in a specific ToDo list by item ID.

Delete a ToDo item from ToDo list. DELETE /todo_lists/:listId/items/:user_id, Delete a ToDo item in a specific ToDo list by item ID.

Mark an item as completed PUT /todo_lists/:listId/items/:itemId/complete

Add a reminder for the list PUT /todo_lists/:listId/reminder'


