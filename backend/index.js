import express from "express";
import studyRoutes from "./routes/studyRoutes.js";
import cors from "cors";
import { sequelize } from "./database/connection.js";
import { insertData, consoleData } from "./database/insertData.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const allowedOrigins = [
  "http://localhost",
  "http://dev.alum.com",
  "http://localhost:8888",
  "http://localhost:5173",
  "http://192.168.137.250:5173",
  "http://192.168.100.250:5173",
  "http://181.39.125.155",
  "http://aplicaciones.marianosamaniego.edu.ec",
  "http://www.aplicaciones.marianosamaniego.edu.ec",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Verifica si el origen está en la lista de orígenes permitidos
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido por CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true, // Permite el envío de cookies y encabezados de autenticación
};
// app.use(loggerMiddleware);

app.use(cors(corsOptions));

app.use(express.json());
// app.use((req, res, next) => {
//   loggerMiddleware(req, res, () => next());
// });

app.use("/api/study", studyRoutes);

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    // await insertData();
    // await consoleData();
    console.log("Conección realizada con éxito.");
    app.listen(PORT, () => {
      console.log(`Backend escuchando en el puesto ${PORT}`);
    });
  } catch (error) {
    console.error("Error en la conexión en la db:", error);
  }
}

main();
