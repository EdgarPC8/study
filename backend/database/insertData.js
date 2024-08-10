
import { Study } from "../models/Study.js";
import { promises as fs } from 'fs'; 

const consoleData = async () => {
  
};

// Función para insertar roles y usuarios
const insertData = async () => {
  try {
    const data = await fs.readFile(new URL("./backup.json", import.meta.url));

    const jsonData = JSON.parse(data);
    await Study.bulkCreate(jsonData.StudyBackup, { returning: true });
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
};

// Ejecuta la función para insertar datos
// insertData();

export { insertData, consoleData };
