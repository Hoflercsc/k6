import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export const options = constants.testOptions;
export let errorRate = new Rate("errors");

export default function downloadSurveyResultsIndividual() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("go to surveys", function () {
    const url = constants.values.SURVEY_SUMMARY_RESULTS_GET;
    let response = http.get(url);
    common.debug("go to survey > "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up surveys 2208", function () {
    const url = constants.values.SURVEY_SUMMARY_RESULTS_GET_SURVEY;
    let response = http.get(url);
    common.debug("open up surveys 2208 > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("go to view available results", function () {
    const url = constants.values.SURVEY_SUMMARY_RESULTS_GET_SURVEY_RESULTS;
    let response = http.get(url);
    common.debug("go to view available results > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("go to survey 2208 individual results", function () {
    const url = constants.values.SURVEY_SUMMARY_RESULTS_GET_INDIVIDUAL_RESULTS;
    let response = http.get(url);
    common.debug("go to survey 2208 individual results > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

   });


   group("download survey 2208 individual results pdf", function () {
    const url = constants.values.SURVEY_SUMMARY_RESULTS_GET_INDIVIDUAL_RESULTS_PDF;
    let response = http.get(url);
    common.debug("download survey 2208 individual results pdf > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

}
