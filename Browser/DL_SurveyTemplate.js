import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Counter } from "k6/metrics";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export const options = constants.testOptions;
export let errorRate = new Rate("errors");

export default function downloadSurveyTemplateHttp() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("go to survey template", function () {
    const url = constants.values.SURVEY_TEMPLATE_GET;
    let response = http.get(url);
    common.debug("go to survey template "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up survey template 2217", function () {
    const url = constants.values.SURVEY_TEMPLATE_GET_TEMPLATE;
    let response = http.get(url);
    common.debug("open up survey template 2217 "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("download survey template file 37761", function () {
    const url = constants.values.SURVEY_TEMPLATE_GET_TEMPLATE_DOWNLOAD;
    let response = http.get(url);
    common.debug("download survey template file 37761 "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

}