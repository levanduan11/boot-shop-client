import Method from "@/constant/methods";
import HttpClient from "@/service/HttpClient";
import { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = request.formData
 
  const config: AxiosRequestConfig = {
    url: '/auth/authenticate',
    method: Method.POST,
    data: body
  }
  const response = await HttpClient.request(config)
  const data = await response.data
  return NextResponse.json(data)
}