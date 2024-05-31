import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

//ruta para ingresar un pago id_cliente, fecha,monto, meses pagados,num_referencia,nombre_banco,desde_fecha,hasta_fecha,observaciones
router.post("/pagos", async (req, res) => {
  const { id_cliente, fecha, monto, id_factura, observaciones } = req.body;
 //registrar el pago y diminuir la cantidad de la factura
  const result = await pool.query(
    "INSERT INTO pagos (id_cliente,fecha_pago,valor,id_factura,observaciones) VALUES (?,?,?,?,?)",
    [id_cliente, fecha, monto, id_factura, observaciones]
  );
  //actualizar la cantidad de la factura
  const result2 = await pool.query(
    "UPDATE factura SET pendiente = pendiente - ? WHERE id_fac = ?",
    [monto, id_factura]
  );
  
  res.status(200).json({ id_pago: result[0].insertId });
});


//ruta para obtener todos los pagos
router.get("/pagos", async (req, res) => {
  const result = await pool.query(
    "SELECT clientes.id as id_cliente,clientes.nombre,clientes.apellido,fecha_pago, valor, numero_factura,observaciones FROM pagos INNER JOIN clientes ON pagos.id_cliente = clientes.id INNER JOIN factura ON  pagos.id_factura = factura.id_fac order by fecha_pago desc"
  );
  res.status(200).json(result[0]);
});

router.post("/factura", async (req, res) => {
  const {
    numero_factura,
    id_cliente,
    fecha_factura,
    fecha_vencimiento,
    detalle,
    cantidad,
    observacion,
  } = req.body;
  const result = await pool.query(
    "INSERT INTO factura (numero_factura,id_cliente,fecha_factura,fecha_vencimiento,detalle,cantidad,observacion,estado_pagada,pendiente) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      numero_factura,
      id_cliente,
      fecha_factura,
      fecha_vencimiento,
      detalle,
      cantidad,
      observacion,
      false,
      cantidad,
    ]
  );
  res.status(200).json({ id_factura: result[0].insertId });
});

//obtener todas las facturas
router.get("/factura", async (req, res) => {
  const result = await pool.query(
    "SELECT *  FROM factura INNER JOIN clientes ON factura.id_cliente = clientes.id"
  );
  res.status(200).json(result[0]);
});

//obtener valores de factura en base al id_cliente
router.get("/factura/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    //si el valor de la factura es null o 0 o empty entonces no se muestra
    "SELECT * FROM factura WHERE id_cliente = ? AND pendiente != 0",
    [id]

  );
  res.status(200).json(result[0]);
});

//exportar la ruta
export default router;
