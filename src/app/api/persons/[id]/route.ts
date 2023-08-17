import HttpClient from "@/service/HttpClient";
import { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const id = 1
  const config: AxiosRequestConfig = {
    url: `/persons/${id}`,
    method: 'get',
    params: {
      username: "abc",
      password: "123"
    },
    data: {
      email: "a@gmail.com"
    }
  }
  try {
    console.log("adfd",request.url);
    
    const res = await HttpClient.request(config)
    const data = await res.data
    return NextResponse.json(data)
  } catch (error) {
    throw error
  }

}