import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export const options = constants.testOptions;
export let errorRate = new Rate("errors");

export default function getPollHttp() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("go to poll", function () {
    const url = constants.values.POLL_GET;
    let response = http.get(url);
    common.debug("go to poll "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up poll 2214", function () {
    const url = constants.values.POLL_GET_POLL;
    let response = http.get(url);
    common.debug("open up poll 2214 > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up poll 2214 results", function () {
    const url = constants.values.POLL_GET_POLL_RESULTS;
    let response = http.get(url);
    common.debug("open up poll 2214 results > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up poll 2214 summary", function () {
    const url = constants.values.POLL_GET_POLL_RESULTS_SUMMARY;
    let response = http.get(url);
    common.debug("open up poll 2214 summary > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("download poll 2214 summary pdf", function () {
    const url = constants.values.POLL_GET_POLL_RESULTS_SUMMARY_PDF;
    let response = http.get(url);
    common.debug("download poll 2214 summary pdf > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

}