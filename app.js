// IMPORTS
const express = require("express");
const app = express(); //EXPRESS
const mysql = require("mysql2"); //MYSQL (USANDO O MYSQL2)

// CONFIG EXPRESS P/ ACEITAR JSON
app.use(express.json());

// CORREÇÃO DE BUGS
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CONEXÃO BANCO MYSQL
var connection = mysql.createConnection({
  host: "localhost",
  user: "root", //<-
  password: "root",
  database: "gestao_tarefas",
});

// VERIFICAÇÃO DE CONECTADO
connection.connect(function (err) {
  // VERIFICANDO ERRO
  if (err) throw err;

  // RETORNO DE SUCESSO
  console.log("Conectado!");
});

// CREATE TAREFAS
app.post("/tarefas", (req, res) => {
  const tarefas = req.body;
  //exemplo{ "titulo": "estudar",... }

  //COMANDO SQL
  const sql = "INSERT INTO tarefas SET ?";

  connection.query(sql, tarefas, (error, result) => {
    // VERIFICANDO ERRO
    if (error) {
      throw error;
    }

    // RETORNO DE SUCESSO
    res.status(201).json({ id: result.insertId, ...tarefas });
  });
});

// READ TAREFAS
app.get("/tarefas", (req, res) => {
  //COMANDO SQL
  const sql = "SELECT * FROM tarefas";

  connection.query(sql, (error, results) => {
    // VERIFICANDO ERRO
    if (error) {
      throw error;
    }

    // RETORNO DE SUCESSO
    res.json(results);
  });
});

// READ BY ID TAREFAS
app.get("/tarefas/:id", (req, res) => {
  const id = req.params.id; //requer um id

  //COMANDO SQL
  const sql = "SELECT * FROM tarefas WHERE id = ?";

  connection.query(sql, id, (error, results) => {
    // VERIFICANDO ERRO
    if (error) {
      throw error;
    }

    // RETORNO DE SUCESSO
    res.json(results[0]);
  });
});

// UPDATE TAREFAS
app.put("/tarefas/:id", (req, res) => {
  const id = req.params.id; //requer um id
  const newTasks = req.body;

  //COMANDO SQL
  const sql = "UPDATE tarefas SET ? WHERE id = ?";

  connection.query(sql, [newTasks, id], (error) => {
    // VERIFICANDO ERRO
    if (error) {
      throw error;
    }

    // RETORNO DE SUCESSO
    res.status(204).end();
  });
});

// DELETE TAREFAS
app.delete("/tarefas/:id", (req, res) => {
  const id = req.params.id; //requer um id

  //COMANDO SQL
  const sql = "DELETE FROM tarefas WHERE id = ?";

  connection.query(sql, id, (error) => {
    // VERIFICANDO ERRO
    if (error) {
      throw error;
    }

    // RETORNO DE SUCESSO
    res.status(204).end();
  });
});

// CONFIGURANO A PORTA DO SERVIDOR
const port = 3000;
app.listen(port, () => {
  // RETORNO NO CONSOLE
  console.log(`Servidor rodando na porta ${port}`);
});

