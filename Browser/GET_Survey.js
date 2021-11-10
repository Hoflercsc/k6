import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Rate } from "k6/metrics";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export let errorRate = new Rate("errors");
export const options = constants.testOptions;

export default function getSurvey() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("go to surveys", function () {
    const url = constants.values.SURVEY_GET;
    let response = http.get(url);
   common.debug("go to survey > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });
    errorRate.add(!response);
  });

  group("open up surveys 2208", function () {
    const url = constants.values.SURVEY_GET;
    let response = http.get(url);
    common.debug("open up surveys 2208 > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });
    errorRate.add(!response);

  });

}