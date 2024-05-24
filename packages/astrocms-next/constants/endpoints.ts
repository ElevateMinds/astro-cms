import path from "path";

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.71:4000/api";

export const EndPoints = {
  login: baseUrl+"/user/login",
};
