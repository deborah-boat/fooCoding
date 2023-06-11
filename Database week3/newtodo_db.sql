CREATE DATABASE ToDo;
USE ToDo;

 -- Create the Users table
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
);

-- Create the Lists table
CREATE TABLE ToDoLists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  list_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Create the Items table
CREATE TABLE TodoItems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  list_id INT NOT NULL,
  items VARCHAR(255) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  FOREIGN KEY (list_id) REFERENCES Lists(id)
);


-- Create the Tags table
CREATE TABLE Tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create the Item_Tags junction table
CREATE TABLE Item_Tags (
  item_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (item_id, tag_id),
  FOREIGN KEY (item_id) REFERENCES Items(id),
  FOREIGN KEY (tag_id) REFERENCES Tags(id)
);

-- Create the Reminders table
CREATE TABLE Reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  list_id INT NOT NULL,
  reminder_date DATE NOT NULL,
  FOREIGN KEY (list_id) REFERENCES Lists(id)
); 
  
  
INSERT INTO `todo_database`.`users` (`username`) VALUES ('user1'),('user2');

INSERT INTO `todo_database`.`todolist` (`user_id`, `list_name`) VALUES ('1', 'shopping'),('2', 'laundry'),('3', 'cleaning');

INSERT INTO `todo_database`.`Todoitems` (`list_id`, `item`, `completed`) VALUES ('1', 'bread', '0');
INSERT INTO `todo_database`.`Todoitems` (`list_id`, `item`, `completed`) VALUES ('1', 'milk', '0');
INSERT INTO `todo_database`.`Todoitems` (`list_id`, `item`, `completed`) VALUES ('2', 'sweep', '1');
INSERT INTO `todo_database`.`Todoitems` (`list_id`, `item`, `completed`) VALUES ('2', 'vacuum', '0');

INSERT INTO `todo_database`.`tag` (`tag_id`, `tag_name`) VALUES ('2', 'shopping');
INSERT INTO `todo_database`.`tag` (`tag_id`, `tag_name`) VALUES ('1', 'cooking');
INSERT INTO `todo_database`.`tag` (`tag_id`, `tag_name`) VALUES ('2', 'coding');

INSERT INTO `todo_database`.`itemtag` (`item_id`, `tag_id`) VALUES ('2', '1');
INSERT INTO `todo_database`.`itemtag` (`item_id`, `tag_id`) VALUES ('2', '2');
INSERT INTO `todo_database`.`itemtag` (`item_id`, `tag_id`) VALUES ('2', '1');

INSERT INTO `todo_database`.`listreminder` (`date`, `list_id`) VALUES ('2023-19-14', '1');
INSERT INTO `todo_database`.`listreminder` (`date`, `list_id`) VALUES ('2023-10-10', '2');
INSERT INTO `todo_database`.`listreminder` (`date`, `list_id`) VALUES ('2023-01-09', '3');






