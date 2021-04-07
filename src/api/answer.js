import axios from "axios";

import config from "@/config/config";
export function fetchAnswerList() {
  return axios.get("/admin/answer/list",{
    baseURL: config.server
  })
}



