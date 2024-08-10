// import axios from "./axios.js";
import axios, { jwt } from "./axios.js";



  export const getAllStudy = async () =>
    await axios.get("/study/getAllStudy");

    export const editStudy = async (id, data) =>
  await axios.put(`/study/editStudy/${id}`, data,);

    