import { useEffect, useState } from "react";
import { TextField, Typography, Container } from "@mui/material";
import { getAllStudy,editStudy } from '../api/StudyResquest';
import DataTable from "./DataTable";

function Suma() {
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  async function fetchData() {
    try {
      const resStudy = await getAllStudy();
      setData(resStudy.data);
    } catch (error) {
      console.error("Error al obtener datos académicos:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const columns = [
    {
      headerName: "#",
      field: "id",
      width: 50,
      editable: true,
    },
    {
      headerName: "Opercion",
      field: "operacion",
      width: 100,
      editable: true,
    },
    {
      headerName: "Valor 1",
      field: "valor1",
      width: 100,
      editable: true,
    },
    {
      headerName: "Valor 2",
      field: "valor2",
      width: 100,
    },
    
    {
      headerName: "Resultado",
      field: "resultado",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const [value, setValue] = useState(params.value || "");

        const handleBlur = () => {
          if (value.trim()) {
            const id=params.row.id
            const obj={resultado:value}
            console.log(value,params.row.id);
            editStudy(id,obj)
          }
        };

        return (
          <TextField
            value={value}
            type="number"
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
          />
        );
      },
    },
    

  ];

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ marginBottom: 16 }}>
        Hora actual: {formatTime(currentTime)}
      </Typography>
      <DataTable columns={columns} data={data} />
    </Container>
  );
}

export default Suma;
