import axios from "axios";

import config from "@/config/config";
export function fetchQuestionList() {
  return axios.get("/admin/question/list",{
    baseURL: config.server
  })
}



