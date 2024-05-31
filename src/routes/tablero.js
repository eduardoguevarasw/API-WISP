import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/ganancias", async (req, res) => {
  //obtener de la tabla factura las facturas que tengan la columna de pendiente en 0 y sumarlas
  const result = await pool.query(
    "SELECT SUM(cantidad) as total FROM factura WHERE pendiente = 0"
  );

  res.status(200).json(result[0]);
});

router.get("/pendientes", async (req, res) => {
  //obtener de la tabla factura las facturas que tengan la columna de pendiente en 0 y sumarlas
  const result = await pool.query(
    "SELECT SUM(pendiente) as total FROM factura WHERE pendiente != 0"
  );

  res.status(200).json(result[0]);
});

router.get("/tableroclientes", async (req, res) => {
  //obtener de la tabla factura las facturas que tengan la columna de pendiente en 0 y sumarlas
  const result = await pool.query("SELECT COUNT(*) as total FROM clientes");

  res.status(200).json(result[0]);
});

router.get("/tablerofacturas", async (req, res) => {
  //obtener de la tabla factura las facturas que tengan la columna de pendiente en 0 y sumarlas
  const result = await pool.query("SELECT COUNT(*) as total FROM factura");

  res.status(200).json(result[0]);
});

export default router;
