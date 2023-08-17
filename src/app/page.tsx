"use client"
import { useEffect } from "react";
import Layout from "../components/Layout";
import axios, { AxiosRequestConfig } from "axios";
import HttpClient from "@/service/HttpClient";
import Config from "@/constant/config";
import jwt_decode from "jwt-decode";

export default function Home() {
  
  return (
    <Layout>
      <h2>this is home page</h2>
    </Layout>
  )
}
