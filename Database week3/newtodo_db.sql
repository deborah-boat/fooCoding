CREATE DATABASE todo_database;

USE todo_database;

CREATE TABLE `todo_database`.`list_items` (
  `task_id` INT NOT NULL AUTO_INCREMENT,
  `list_id` INT NOT NULL,
  `item` VARCHAR(45) NOT NULL,
  `completed` TINYINT NOT NULL,
  PRIMARY KEY (`task_id`));
  
CREATE TABLE `todo_database`.`todos` (
  `list_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `list_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`list_id`));
  
CREATE TABLE `todo_database`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`));
  
  CREATE TABLE Item_Tags (
  `item_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  FOREIGN KEY (`item_id`) REFERENCES Items(`id`),
  FOREIGN KEY (`tag_id`) REFERENCES Tags(`id`)
);

  CREATE TABLE Reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `list_id` INT NOT NULL,
  reminder_date DATE NOT NULL,
  FOREIGN KEY (`list_id`) REFERENCES TodoLists(`id`)
);
  
ALTER TABLE `todo_database`.`todos` 
ADD CONSTRAINT `user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `todo_database`.`users` (`user_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `todo_database`.`list_items` 
ADD CONSTRAINT `list_id`
  FOREIGN KEY (`list_id`)
  REFERENCES `todo_database`.`todos` (`list_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
  
INSERT INTO `todo_database`.`users` (`username`) VALUES ('user1'),('user2');
INSERT INTO `todo_database`.`todos` (`user_id`, `list_name`) VALUES ('1', 'shopping'),('1', 'laundry'),('2', 'cleaning');
INSERT INTO `todo_database`.`list_items` (`list_id`, `item`, `completed`) VALUES ('1', 'bread', '0');
INSERT INTO `todo_database`.`list_items` (`list_id`, `item`, `completed`) VALUES ('1', 'milk', '0');
INSERT INTO `todo_database`.`list_items` (`list_id`, `item`, `completed`) VALUES ('2', 'sweep', '1');
INSERT INTO `todo_database`.`list_items` (`list_id`, `item`, `completed`) VALUES ('2', 'vacuum', '0');
INSERT INTO `todo_database`.`tag_items` (`tag_id`, `item_id`) VALUES ('2', '1');
INSERT INTO `todo_database`.`tag_items` (`tag_id`, `item_id`) VALUES ('1', '3');
INSERT INTO `todo_database`.`tag_items` (`tag_id`, `item_id`) VALUES ('2', '3');
INSERT INTO `todo_database`.`listreminder` (`date`, `list_id`) VALUES ('2023-19-14', '1');
INSERT INTO `todo_database`.`listreminder` (`date`, `list_id`) VALUES ('2023-10-10', '2');
INSERT INTO `todo_database`.`listreminder` (`date`, `list_id`) VALUES ('2023-01-09', '3');






