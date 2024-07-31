import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async () => {
    const { data } = await api.get("/api/employees/dashboard");
    return data.data;
  }
);
