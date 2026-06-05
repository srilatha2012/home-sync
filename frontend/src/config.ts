/*
This configuration file allows the frontend to communicate with either the local backend or the deployed backend 
*/
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";