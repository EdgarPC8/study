import { useEffect, useState } from "react";
import { TextField, Grid, Paper, Typography, Container, Box } from "@mui/material";
import { getAllStudy, editStudy } from '../api/StudyResquest';
import Suma from "../components/Suma.jsx";

function Matematicas() {

  return (
    <Container>
     <Suma/>
    </Container>
  );
}

export default Matematicas;
