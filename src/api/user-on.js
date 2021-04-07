import axios from "axios";

import config from "@/config/config";
export function fetchUserList() {
  return axios.get("/admin/user/list",{
    baseURL: config.server
  })
}



