
import {
  Study
  } from "../Models/Study.js";
  
  
  export const getAllStudy = async (req, res) => {
    const data = await Study.findAll();
    res.json(data);
  };
  export const editStudy = async (req, res) => {
    const data = req.body;
    const op=req.params;
    try {
      const edit = await Study.update(data, {
        where: {
          id: op.id,
        },
      });
      res.json({ message: "Operacion Editado con éxito" });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  export const addStudy = async (req, res) => {
    try {
      const {
        startDate,
        endDate,
        numRecords,
        digitCount1,
        digitCount2,
        operation,
      }=req.body;
      console.log(startDate);
  
      const cantidadRegistros = numRecords;
      const numDigitosValor1=digitCount1
      const numDigitosValor2=digitCount2
  
     
     const generateRandomNumber = (numDigitos) => {
        const min = Math.pow(10, numDigitos - 1);
        const max = Math.pow(10, numDigitos) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
  
      for (let i = 0; i < cantidadRegistros; i++) {
        let obj = {
          fecha_inicio: startDate,
          fecha_fin: endDate,
          operacion: operation,
          valor1: generateRandomNumber(numDigitosValor1).toString(),
          valor2: generateRandomNumber(numDigitosValor2).toString(),
        };
  
        await Study.create(obj);
      }
      
  
      res.json({ message: `${cantidadRegistros} registros creados exitosamente.` });
  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  export const deleteStudyAll = async (req, res) => {
    try {
      // Elimina todos los registros de la tabla Study
      const removedCount = await Study.destroy({
        where: {}, // No especificar ninguna condición para eliminar todos los registros
        truncate: true // Utiliza truncate para eliminar todos los registros y reiniciar el auto-incremento
      });
  
      // Envia una respuesta con el número de registros eliminados
      res.json({ message: `Datos eliminados con éxito. Registros eliminados: ${removedCount}` });
    } catch (error) {
      // Envia una respuesta con el error en caso de fallo
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  