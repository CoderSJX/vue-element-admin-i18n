import axios from "axios";

import config from "@/config/config";
export function fetchCommentList() {
  return axios.get("/admin/comment/list",{
    baseURL: config.server
  })
}



