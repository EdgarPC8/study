
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
    const cantidadRegistros = 10;
    const numDigitosValor1=4
    const numDigitosValor2=4

    const generateRandomNumber = (numDigitos) => {
      const min = Math.pow(10, numDigitos - 1);
      const max = Math.pow(10, numDigitos) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    for (let i = 0; i < cantidadRegistros; i++) {
      let obj = {
        fecha_inicio: "2024-08-10 10:00:00",
        fecha_fin: "2024-08-10 10:30:00",
        operacion: "Suma",
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

