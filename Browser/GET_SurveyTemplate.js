import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Rate } from "k6/metrics";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export let errorRate = new Rate("errors");
export const options = constants.testOptions;

export default function getSurveyTemplate() {
  
  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("go to survey template", function () {
    const url = constants.values.SURVEY_TEMPLATE_GET;
    let response = http.get(url);
    common.debug("get tasks > "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

    errorRate.add(!response);

  });

  group("open up survey template 2217", function () {
    const url = constants.values.SURVEY_TEMPLATE_GET_TEMPLATE;
    let response = http.get(url);
    console.debug("open up survey template 2217 > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

    errorRate.add(!response);

  });

}