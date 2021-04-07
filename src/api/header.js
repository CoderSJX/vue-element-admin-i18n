import axios from "axios";

import config from "@/config/config";
export function fetchHeaderList() {
  return axios.get("/admin/headers",{
    baseURL: config.fileServer
  })
}



