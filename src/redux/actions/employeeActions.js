import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const { data } = await api.get("/api/employees");

    return { employees: data.employees, auditTrial: data.auditTrial };
  }
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employee) => {
    const { data } = await api.post("/api/employees", employee);
    return data.newEmployee;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/api/employees/${employee.id}`,
        employee.data
      );

      console.log(data);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id) => {
    await api.delete(`/api/employees/${id}`);
    return id;
  }
);
