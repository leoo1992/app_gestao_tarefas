// IMPORTS
const express = require("express");
const app = express();
const mysql = require("mysql2");

// CONFIG EXPRESS P/ ACEITAR JSON
app.use(express.json());

//CONEXÃO BANCO MYSQL
var connection = mysql.createConnection({
  host: "localhost",
//   user: "",                     <-
//   password: "",                     
//   database: "gestao_tarefas",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Conectado!");
});

// CREATE TAREFA
app.post("/tarefa", (req, res) => {
  const tarefas = req.body;
  //{ "titulo": "estudar",... }
  const sql = "INSERT INTO tarefas SET ?";
  connection.query(sql, tarefas, (error, result) => {
    if (error) throw error;
    res.status(201).json({ id: result.insertId, ...tarefas});
  });
});

// READ TAREFA
app.get("/tarefas", (req, res) => {
  const sql = "SELECT * FROM tarefas";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
app.get("/tarefas/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM tarefas WHERE id = ?";
  connection.query(sql, id, (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});
// UPDATE TAREFA
app.put("/tarefas/:id", (req, res) => {
  const id = req.params.id;
  const newTasks = req.body;
  const sql = "UPDATE tarefas SET ? WHERE id = ?";
  connection.query(sql, [newTasks, id], (error) => {
    if (error) throw error;
    res.status(204).end();
  });
});
// DELETE TAREFA
app.delete("/tarefas/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM tarefas WHERE id = ?";
  connection.query(sql, id, (error) => {
    if (error) throw error;
    res.status(204).end();
  });
});
// CONFIGURANO O SERVIDOR
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
// ENCERRANDO CONEXÃO
connection.end();