import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Rate } from "k6/metrics";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export const options = constants.testOptions;
export let errorRate = new Rate("errors");

export default function getSchedulers() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("go to schedulers", function () {
    const url = constants.values.SCHEDULER_GET;
    let response = http.get(url);
    common.debug("go to schedulers "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });
    errorRate.add(!response);
  });

  group("open up schedulers 2211", function () {
    // even though the link shows surveys it is actually getting the scheduler id 
    const url = constants.values.SCHEDULER_GET_SCHEDULER;
    let response = http.get(url);
    common.debug("open up schedulers 2211 "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });
    errorRate.add(!response);
  });

}