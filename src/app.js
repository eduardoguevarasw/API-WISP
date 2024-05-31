import express from "express";
import cors from "cors";
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
import Login from "./routes/authUsers.js";
import Clients from "./routes/clients.js";
import Pagos from "./routes/pagos.js";
import Tablero from "./routes/tablero.js";

app.use(Login);
app.use(Clients);
app.use(Pagos);
app.use(Tablero);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
