import http from "k6/http";
import { check, group } from "k6";
import { Rate } from "k6/metrics";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export const options = constants.testOptions;
export let errorRate = new Rate("errors");

export default function getTask() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("get tasks", function () {
    const url = constants.values.TASKS_GET;
    let response = http.get(url);
    common.debug("get tasks > "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

    errorRate.add(!response);
  });


  group("get tasks 351 results", function () {
    const url = constants.values.TASKS_GET_RESULTS;
    let response = http.get(url);
    common.debug("get tasks results > "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

    errorRate.add(!response);
  });



}