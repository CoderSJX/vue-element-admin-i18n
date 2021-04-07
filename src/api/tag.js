import axios from "axios";

import config from "@/config/config";
export function fetchTagList() {
  return axios.get("/admin/tag/list",{
    baseURL: config.server
  })
}



