import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Counter } from "k6/metrics";
import { Rate } from "k6/metrics";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export const options = constants.testOptions;
export let errorRate = new Rate("errors");

export default function getEvent() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("go to events", function () {
    sleep(3);
    const url = constants.values.EVENT_GET;
    let response = http.get(url);
    common.debug("go to workroom library "+response.status)

    let success = check(response, {"status 200": (r) => r.status === 200});
    errorRate.add(!success);
  });

  group("open up event 26802", function () {
    const url = constants.values.EVENT_GET_EVENT;
    let response = http.get(url);
    common.debug("open up event 26802 = " + response.status);

    let success = check(response, {"status 200": (r) => r.status === 200});
    errorRate.add(!success);
  });

}