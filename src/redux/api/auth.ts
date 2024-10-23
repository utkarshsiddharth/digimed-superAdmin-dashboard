/* eslint-disable linebreak-style */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserAuthApi = createApi({
  reducerPath: "user-authentication",
  tagTypes: ["SuperAdmin"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shatayu.online",
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
        url: "/superAdmin/login",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["SuperAdmin"],
    }),
    addDoctor: builder.mutation({
      query: (data) => ({
        url: "/superAdmin/add_doctor",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["SuperAdmin"],
    }),
    addKoisk: builder.mutation({
      query: (data) => ({
        url: "/superAdmin/add_kiosk",
        method: "post",
        body: data, 
      }),
      invalidatesTags: ["SuperAdmin"],
    }),
    addOrganization: builder.mutation({
      query: (data) => ({
        url: "/superAdmin/addOrganization",
        method: "post",
        body: data, 
      }),
      invalidatesTags: ["SuperAdmin"],
    }),
  }),
});

export const {
  useAddOrganizationMutation,
  useLoginUserMutation,
  useAddDoctorMutation,
  useAddKoiskMutation,
} = UserAuthApi;
