import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const response = await api.post("/api/users/login", credentials);
    const userData = response.data.data.user;
    return userData;
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user) => {
    const response = await api.post("/api/users/register", user);
    const userData = response.data.data.user;
    return userData;
  }
);
