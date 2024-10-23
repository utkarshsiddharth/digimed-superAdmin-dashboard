/* eslint-disable linebreak-style */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Patientwating from "../../container/koisedashboards/Findpetient/patientwait/Patientwating";

export const SuperAdmin = createApi({
  reducerPath: "superAdmin",
  tagTypes: ["SuperAdmin", "deletetest"],
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
    // kiosk list data
    kioskList: builder.query({
      query: ({ page, limit, type }) => ({
        url: `/superAdmin/get_doctors_or_kiosk_lists?page=${page}&limit=${limit}&type=${type}`,
        method: "GET",
      }),
      providesTags:["SuperAdmin"],
    }),
    doctorkList: builder.query({
      query: ({page, limit, type }) => ({
        url: `/superAdmin/get_doctors_or_kiosk_lists?page=${page}&limit=${limit}&type=${type}`,
        method: "GET",
      }),
      providesTags:["SuperAdmin"],
    }),
    
   organizationkList: builder.query({
      query: ({ page, limit, key }) => ({
        url: `/superAdmin/getOrganizations?key=${key}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags:["SuperAdmin"],
    }),
    doctorksingalData: builder.query({
      query: ({ selectedId, data }) => ({
        url: `/superAdmin/getDoctorOrKioksDataById?type=${data}&id=${selectedId}`,
        // /admin/getDoctorOrKioksDataById?type=kiosks&id=6645c182821e914245ccf085.
        method: "GET",
      }),
      providesTags:["SuperAdmin"],
    }),
    // update doctor Profile?
    updateDoctorProfile: builder.mutation({
      query: ({ selectedId, formData }) => {
        // Initialize FormData object
        return {
          url: `/superAdmin/update_doctor/${selectedId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["SuperAdmin"],
    }),
    updateKioskProfileData: builder.mutation({
      query: ({ selectedId, formData }) => {
        // Initialize FormData object
        return {
          url: `/superAdmin/update_kiosk/${selectedId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["SuperAdmin"],
    }),
    searchItem: builder.query({
      query: ({ inputValue, dataSearch, selectedLocation }) => ({
        url: `/superAdmin/get_doctors_or_kiosks_by_regex?type=${dataSearch}s&key1=${selectedLocation}&key2=${inputValue}`,
        // /admin/getDoctorOrKioksDataById?type=kiosks&id=6645c182821e914245ccf085.
        method: "GET",
      }),
      providesTags:["SuperAdmin"],
    }),
    koiskloctionlist: builder.query({
      query: () => ({
        url: `/superAdmin/getKiosksCities`,
        method: "GET",
      }),
      providesTags:["SuperAdmin"],
    }),
    // doctor and kiosk active inactive?
    activeStatus: builder.mutation({
      query: ({ userStatus, statusData }) => ({
        url: `superAdmin/update_resume_suspended_status/${userStatus}`,
        // /admin/getDoctorOrKioksDataById?type=kiosks&id=6645c182821e914245ccf085.
        method: "PATCH",
        body: statusData,
      }),
      invalidatesTags:["SuperAdmin"],
    }),
    // /admin/getloggedInAdmin
    adminProfile: builder.query({
      query: () => ({
        url: `/superAdmin/getloggedInAdmin`,
        method: "GET",
      }),
      providesTags:["SuperAdmin"],
    }),
    UpdateProfile: builder.mutation({
      query: ( formData ) => ({
        url: `/superAdmin/update_admin_profile_by_admin`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags:["SuperAdmin"],
    }),
    overalldata:builder.query({
      query:()=>({
        url:`/superAdmin/getAnalytics`,
        method:"GET",
      })
      
    }),
   
    allAdmin:builder.query({
      query:(id)=>({
        url:`/superAdmin/getAdminsList/${id}`,
        method:"GET",
      }),
      providesTags:["SuperAdmin"],
    }),
    // dddddd

    addAdmin: builder.mutation({
      query: ( formData ) => ({
        url: `/superAdmin/add_admin`,
        method: "post",
        body: formData,
      }),
      invalidatesTags:["SuperAdmin"],
    }),
    updateAdmin: builder.mutation({
      query: ({id, formData} ) => ({
        url: `/superAdmin/editAdmin${id}`,
        method: "post",
        body: formData,
      }),
      invalidatesTags:["SuperAdmin"],
    }),
    selectorganisation :builder.query({
      query:(type)=>({
        url:`/superAdmin/getOrganizations_kiosks_Dropdown?type=${type}`,
        method:"GET",
      })
    }),
    individualtoppotion : builder.query({
      query:(orgId)=>({
       url:`/superAdmin/getTopPortionAnalyticsForParticularOrganization/id=${orgId}`,
       method:"GET"
      })
    })
  }),
});

export const {
  useUpdateAdminMutation,
  useAddAdminMutation,
  useOrganizationkListQuery,
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
  useLazyOveralldataQuery,
  useAllAdminQuery,
  useSelectorganisationQuery,
  useIndividualtoppotionQuery
} = SuperAdmin;
