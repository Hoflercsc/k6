import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Rate } from "k6/metrics";
import * as constants from "../../../constants.js";
import * as common from "../../../utils/common.js";

function buildJsonRequestHeaders(token) {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
  };
}

export function setup() {
  return common.getUserToken();
}  

export default function getSurvey(token) {

  group("go to surveys", function () {
    const url = constants.values.API_SURVEY_GET;
    let response = http.get(url,buildJsonRequestHeaders(token));
   common.debug("go to survey > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up surveys 2208", function () {
    const url = constants.values.API_SURVEY_GET_SURVEY;
    let response = http.get(url,buildJsonRequestHeaders(token));
    common.debug("open up surveys 2208 > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

}