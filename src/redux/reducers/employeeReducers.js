import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../actions/employeeActions";

const employeeSlice = createSlice({
  name: "employees",
  initialState: { employees: [], auditTrial: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees;
        state.auditTrial = action.payload.auditTrial;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex(
          (emp) => emp._id === action.payload.employee._id
        );
        if (index !== -1) {
          state.employees[index] = {
            ...state.employees[index],
            ...action.payload.employee,
          };
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp._id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;
