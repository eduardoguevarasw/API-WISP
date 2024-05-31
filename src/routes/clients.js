import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/clients", async (req, res) => {
  const result = await pool.query("SELECT * FROM clientes");
  res.json(result[0]);
});

router.post("/clients", async (req, res) => {
  const {cedula,nombre, apellido, telefono, direccion, estado } = req.body;
  await pool.query(
    "INSERT INTO clientes (cedula,nombre, apellido, telefono, direccion,estado) VALUES (?,?, ?, ?, ?,?)",
    [cedula,nombre, apellido, telefono, direccion,estado]
  );
  res.send("Cliente creado correctamente");
});




export default router;
