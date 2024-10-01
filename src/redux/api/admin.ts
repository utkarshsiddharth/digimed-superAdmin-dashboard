/* eslint-disable linebreak-style */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Patientwating from "../../container/koisedashboards/Findpetient/patientwait/Patientwating";

export const AdminApi = createApi({
  reducerPath: "admin",
  tagTypes: ["AdminApi", "deletetest"],
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
    // kiosk list data
    kioskList: builder.query({
      query: (data) => ({
        url: `/admin/get_doctors_or_kiosk_lists?type=${data}`,
        method: "GET",
      }),
    }),
    doctorkList: builder.query({
      query: (data) => ({
        url: `/admin/get_doctors_or_kiosk_lists?type=${data}`,
        method: "GET",
      }),
    }),
    doctorksingalData: builder.query({
      query: ({ selectedId, data }) => ({
        url: `/admin/getDoctorOrKioksDataById?type=${data}&id=${selectedId}`,
        // /admin/getDoctorOrKioksDataById?type=kiosks&id=6645c182821e914245ccf085.
        method: "GET",
      }),
    }),
    // update doctor Profile?
    updateDoctorProfile: builder.mutation({
      query: ({ selectedId, formData }) => {
        // Initialize FormData object
        return {
          url: `/admin/update_doctor/${selectedId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["AdminApi"],
    }),
    updateKioskProfileData: builder.mutation({
      query: ({ selectedId, formData }) => {
        // Initialize FormData object
        return {
          url: `/admin/update_kiosk/${selectedId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["AdminApi"],
    }),
    searchItem: builder.query({
      query: ({ inputValue, dataSearch, selectedLocation }) => ({
        url: `/admin/get_doctors_or_kiosks_by_regex?type=${dataSearch}s&key1=${selectedLocation}&key2=${inputValue}`,
        // /admin/getDoctorOrKioksDataById?type=kiosks&id=6645c182821e914245ccf085.
        method: "GET",
      }),
    }),
    koiskloctionlist: builder.query({
      query: () => ({
        url: `/admin/getKiosksCities`,
        method: "GET",
      }),
    }),
    // doctor and kiosk active inactive?
    activeStatus: builder.mutation({
      query: ({ userStatus, statusData }) => ({
        url: `admin/update_resume_suspended_status/${userStatus}`,
        // /admin/getDoctorOrKioksDataById?type=kiosks&id=6645c182821e914245ccf085.
        method: "PATCH",
        body: statusData,
      }),
    }),
    // /admin/getloggedInAdmin
    adminProfile: builder.query({
      query: () => ({
        url: `/admin/getloggedInAdmin`,
        method: "GET",
      }),
    }),
    UpdateProfile: builder.mutation({
      query: ( formData ) => ({
        url: `/admin/update_admin_profile_by_admin`,
        method: "PATCH",
        body: formData,
      }),
    }),
    overalldata:builder.query({
      query:()=>({
        url:`/admin/getAnalytics`,
        method:"GET",
      })
    })
  }),
});

export const {
  useKioskListQuery,
  useDoctorkListQuery,
  useUpdateDoctorProfileMutation,
  useDoctorksingalDataQuery,
  useUpdateKioskProfileDataMutation,
  useSearchItemQuery,
  useKoiskloctionlistQuery,
  useActiveStatusMutation,
  useAdminProfileQuery,
  useUpdateProfileMutation,
  useLazyOveralldataQuery
} = AdminApi;
