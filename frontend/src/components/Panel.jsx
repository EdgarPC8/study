import * as React from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { addStudy,deleteStudyAll } from "../api/StudyResquest";

function Panel() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [numRecords, setNumRecords] = React.useState("");
  const [digitCount1, setDigitCount1] = React.useState("");
  const [digitCount2, setDigitCount2] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleSubmit = () => {
    addStudy({
      startDate: startDate,
      endDate: endDate,
      numRecords: numRecords,
      digitCount1: digitCount1,
      digitCount2: digitCount2,
      operation: operation,
    });
  };

  const handleDeleteAll = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    // Aquí puedes realizar la acción para eliminar todos los datos
    // Por ejemplo, limpiar todos los estados
    deleteStudyAll()


    setStartDate("");
    setEndDate("");
    setNumRecords("");
    setDigitCount1("");
    setDigitCount2("");
    setOperation("");

    // Cerrar el diálogo
    handleCloseDialog();
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Fecha y Hora de Inicio"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Fecha y Hora de Fin"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Número de Registros"
          type="number"
          fullWidth
          value={numRecords}
          onChange={(e) => setNumRecords(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Número de Dígitos Valor 1"
          type="number"
          fullWidth
          value={digitCount1}
          onChange={(e) => setDigitCount1(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Número de Dígitos Valor 2"
          type="number"
          fullWidth
          value={digitCount2}
          onChange={(e) => setDigitCount2(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Operación</InputLabel>
          <Select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <MenuItem value="SUMA">Suma</MenuItem>
            <MenuItem value="RESTA">Resta</MenuItem>
            <MenuItem value="MULTIPLICACION">Multiplicación</MenuItem>
            <MenuItem value="DIVISION">División</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enviar
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={handleDeleteAll}>
              Eliminar Todo
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Diálogo de Confirmación */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            ¿Estás seguro de que quieres eliminar todo? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Panel;
