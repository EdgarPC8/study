import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { getAllStudy } from '../api/StudyResquest';
import Panel from "../components/Panel";


function Resultados() {
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [data, setData] = useState([]);
  const [respuestasMalas, setRespuestasMalas] = useState([]);

  const correctPassword = "04661598";

  const handlePasswordChange = (event) => {
    setInputPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (inputPassword === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  async function fetchData() {
    try {
      const resStudy = await getAllStudy();
      const formattedData = resStudy.data.map(item => {
        const valor1 = parseFloat(item.valor1) || 0;
        const valor2 = parseFloat(item.valor2) || 0;
        const resultado = parseFloat(item.resultado) || 0;
        const suma = valor1 + valor2;
        const isCorrect = suma === resultado;
        return { ...item, isCorrect };
      });
      setData(formattedData);

      const incorrectAnswers = formattedData.filter(item => !item.isCorrect);
      setRespuestasMalas(incorrectAnswers);
    } catch (error) {
      console.error("Error al obtener datos académicos:", error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  return (
    <Container
      maxWidth="sm"
      style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
    >
      <Box width="100%" display="flex" justifyContent="center">
        {!isAuthenticated ? (
          <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px", width: "100%" }}>
            <Typography variant="h6" gutterBottom align="center">
              Ingrese la contraseña para acceder a los Resultados
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  value={inputPassword}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Ingresar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Box textAlign="center">
            <Panel/>

            <Typography variant="h4" gutterBottom>
              Resultados
            </Typography>
            <Typography variant="h6">
              Número de respuestas correctas: {data.length - respuestasMalas.length}
            </Typography>
            <Typography variant="h6">
              Número de respuestas incorrectas: {respuestasMalas.length}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Resultados;
