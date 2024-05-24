"use server";

import { LoginSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";
import { cookies } from 'next/headers'
import { EndPoints } from "@/constants/endpoints";
export const Login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    console.log("values", values);
    const response = await axios.post(EndPoints.login, values, {
      withCredentials: true,
    });
    cookies().set("jwt_token", response?.data?.token)
    console.log("Login successful:", response.data.message);
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error:
          error.response?.data.message || error.response?.data || error.message,
      };
    } else {
      console.error("An unexpected error occurred:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  }
};
