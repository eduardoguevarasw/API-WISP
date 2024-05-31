import { Router } from "express";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";

const router = Router();
// Configuración secreta para firmar el token
const secretKey = 'cybermovil';

router.post("/login",async (req, res) => {
  // Aquí va la lógica de inicio de sesión
  const { username, password } = req.body;
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE usuario = ? AND password = ?",
    [username, password]
  );
    if (result[0].length === 0) {
        res.status(401).send("Usuario o contraseña incorrectos");
    } else {
        //enviar un status 200 y un mensaje de éxito
        const user = result[0][0];
        const token = jwt.sign({ usuario: user.usuario }, secretKey);
        res.status(200).json({ token });
    }
});

export default router;

