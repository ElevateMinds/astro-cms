"use server";

import { LoginSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

export const Login = (values: z.infer<typeof LoginSchema>) => {
  console.log("values", values);
};
