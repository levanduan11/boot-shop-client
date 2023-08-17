import HttpClient from "@/service/HttpClient";
import { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const config: AxiosRequestConfig = {
    url: '/persons',
    method: 'get',
    params: {
      username: "abc",
      password: "123"
    },
    data: {
      email: "a@gmail.com"
    }
  }
  const data = (await HttpClient.request(config)).data
  return NextResponse.json(data)
}