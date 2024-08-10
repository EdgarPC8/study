import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";
export const Study = sequelize.define(
    "matematicas",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            // defaultValue: null,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            // defaultValue: null,
        },
        operacion: {
            type: DataTypes.STRING(30),
            defaultValue: null,
        },
        valor1: {
            type: DataTypes.STRING(30),
            allowNull: true, // Puede ser null si no se utiliza
        },
        valor2: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        resultado: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        tiempo: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);
