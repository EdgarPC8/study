// import axios from "./axios.js";
import axios, { jwt } from "./axios.js";



  export const getAllStudy = async () =>
    await axios.get("/study/getAllStudy");

    export const editStudy = async (id, data) =>
  await axios.put(`/study/editStudy/${id}`, data);

    export const addStudy = async (data) =>
      await axios.post(`/study/addStudy`, data);
    
    export const deleteStudyAll = async (data) =>
      await axios.delete(`/study/deleteStudyAll`);

    