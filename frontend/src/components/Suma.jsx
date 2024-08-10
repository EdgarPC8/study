import { useEffect, useState } from "react";
import { TextField, Typography, Container, Box } from "@mui/material";
import { getAllStudy, editStudy } from '../api/StudyResquest';
import DataTable from "./DataTable";

function Suma() {
  const [data, setData] = useState([]);
  const [focusedRowId, setFocusedRowId] = useState(null);

  async function fetchData() {
    try {
      const resStudy = await getAllStudy();
      const updatedData = resStudy.data.map(item => ({
        ...item,
        elapsedTime: item.tiempo ? parseTime(item.tiempo) : 0
      }));
      setData(updatedData);
    } catch (error) {
      console.error("Error al obtener datos académicos:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    const intervals = {};
    if (focusedRowId !== null) {
      intervals[focusedRowId] = setInterval(() => {
        setData(prevData =>
          prevData.map(row =>
            row.id === focusedRowId
              ? { ...row, elapsedTime: (row.elapsedTime || 0) + 1000 }
              : row
          )
        );
      }, 1000);
    }

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [focusedRowId]);


  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const parseTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };

  const columns = [
    {
      headerName: "#",
      field: "id",
      width: 50,
      editable: true,
    },
    {
      headerName: "Operacion",
      field: "operacion",
      width: 100,
      editable: true,
    },
    {
      headerName: "Proceso",
      field: "valor1",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const [value, setValue] = useState(params.row.resultado || "");

        const handleBlur = () => {
            const id = params.row.id;
            const obj = {
              resultado: value,
              tiempo: formatTime(params.row.elapsedTime || 0) // Guarda el tiempo formateado
            };
            console.log(value, params.row.id);
            editStudy(id, obj);
          setFocusedRowId(null); // Detener el temporizador al salir del input
        };

        const handleFocus = () => {
          setFocusedRowId(params.row.id); // Iniciar el temporizador al enfocar el input
        };

        const valor1 = params.row.valor1;
        const valor2 = params.row.valor2;
        return (
          <Box gap={1}>
            <Box display="flex" flexDirection="column" alignItems="flex-end" width="100%">
              <Typography>{valor1}</Typography>
              <Typography>{valor2}</Typography>
            </Box>
            <TextField
              value={value}
              type="number"
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleBlur}
              onFocus={handleFocus}
              variant="outlined"
              fullWidth
            />
          </Box>
        );
      },
    },
    {
      headerName: "Tiempo",
      field: "elapsedTime",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Typography>{formatTime(params.row.elapsedTime || 0)}</Typography>
      ),
    },
  ];

  return (
    <Container>
      <DataTable columns={columns} data={data} />
    </Container>
  );
}

export default Suma;
