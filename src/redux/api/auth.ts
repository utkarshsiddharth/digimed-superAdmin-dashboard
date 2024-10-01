/* eslint-disable linebreak-style */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserAuthApi = createApi({
  reducerPath: "user-authentication",
  tagTypes: ["college"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://digi-med-backend.onrender.com",
    // baseUrl: "https://shatayu.online",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      console.log(token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Admin login
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/admin/login_admin",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["college"],
    }),
    addDoctor: builder.mutation({
      query: (data) => ({
        url: "/admin/add_doctor",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["college"],
    }),
    addKoisk: builder.mutation({
      query: (data) => ({
        url: "/admin/add_kiosk",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["college"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useAddDoctorMutation,
  useAddKoiskMutation,
} = UserAuthApi;
