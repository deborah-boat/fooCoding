const express = require('express');
const mysql = require("mysql2/promise");
const cron = require("node-cron");



//create MYSQL connection 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mrsowusu@92',
  database: 'todo_database'
});

// Create the Express server
const app = express();
app.use(express.json());



// Create a new list
app.post("/lists", async (req, res) => {
  const { userId, name } = req.body;

  try {
    const connection = await pool.getConnection();

    const [user] = await connection.query("SELECT * FROM Users WHERE id = ?", [
      userId,
    ]);

    if (!user) {
      connection.release();
      return res.status(404).json({ error: "User not found" });
    }

    // Insert the new list into the database
    const [result] = await connection.query(
      "INSERT INTO Lists (user_id, name, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)",
      [userId, name]
    );

    const listId = result.insertId;

    connection.release();

    res.status(201).json({ "List created successfully", listId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "Internal server error" });
  }
});

// Insert items in ToDo list
app.post("/lists/:listId/items", async (req, res) => {
  const { listId } = req.params;
  const { items, description, userId } = req.body;

  try {
    const connection = await pool.getConnection();

    const [list] = await connection.query(
      "SELECT * FROM Lists WHERE id = ? AND user_id = ?",
      [listId, userId]
    );

    if (!list) {
      connection.release();
      return res
        .status(404)
        .json({ error: "List not found or does not belong to the user" });
    }

    // Insert the new item into the database
    const [result] = await connection.query(
      "INSERT INTO Items (list_id, item, description) VALUES (?, ?, ?)",
      [listId, item, description]
    );

    const itemId = result.insertId;

    connection.release();

    res.status(201).json({ "Item created successfully", itemId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "Internal server error" });
  }
});

// Delete items in ToDo list
app.delete("/lists/:listId/items/:itemId", async (req, res) => {
  const { listId, itemId } = req.params;
  const { userId } = req.body;

  try {
    const connection = await pool.getConnection();

    const [list] = await connection.query(
      "SELECT * FROM Lists WHERE id = ? AND user_id = ?",
      [listId, userId]
    );

    if (!list) {
      connection.release();
      return res
        .status(404)
        .json({ error: "List not found or does not belong to the user" });
    }

    // Delete the item from the database
    await connection.query("DELETE FROM Items WHERE list_id = ? AND id = ?", [
      listId,
      itemId,
    ]);

    connection.release();

    res.status(200).json({ "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "Internal server error" });
  }
});

// Mark an item as completed
app.patch("/lists/:listId/items/:itemId", async (req, res) => {
  const { listId, itemId } = req.params;
  const { isCompleted, userId } = req.body;

  try {
    const connection = await pool.getConnection();
    const [list] = await connection.query(
      "SELECT * FROM Lists WHERE id = ? AND user_id = ?",
      [listId, userId]
    );

    if (!list) {
      connection.release();
      return res
        .status(404)
        .json({ "List not found or does not belong to the user" });
    }
    await connection.query(
      "UPDATE Items SET is_completed = ? WHERE list_id = ? AND id = ?",
      [isCompleted ? 1 : 0, listId, itemId]
    );

    connection.release();

    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a reminder for an "LIST"
app.post("/lists/:listId/items/:itemId/reminders", async (req, res) => {
  const { listId, itemId } = req.params;
  const { reminderDate, userId } = req.body;

  try {
    const connection = await pool.getConnection();

    const [list] = await connection.query(
      "SELECT * FROM Lists WHERE id = ? AND user_id = ?",
      [listId, userId]
    );

    if (!list) {
      connection.release();
      return res
        .status(404)
        .json({ error: "List not found or does not belong to the user" });
    }
    await connection.query(
      "INSERT INTO Reminders (list_id, reminder_date) VALUES (?, ?)",
      [itemId, reminderDate]
    );

    connection.release();

    res.status(201).json({ message: "Reminder added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Middleware
app.use(express.json());
app.use((err, req, res) => {
  res.status(500).json('Some error');
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});




