import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export const options = constants.testOptions;
export let errorRate = new Rate("errors");

export default function downloadPollFileHttp() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("go to poll", function () {
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys?survey_type=poll`);
    let response = http.get(url);
    common.debug("go to poll > "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up poll 2214", function () {
    // even though the link shows surveys it is actually getting the poll id 
    const url = constants.values.POLL_GET_POLL;
    let response = http.get(url);
    common.debug("open up poll "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });
    errorRate.add(!response);
  });
  
  group("download poll file 37758", function () {
    const url = constants.values.POLL_GET_POLL_DOWNLOAD_FILE;
    let response = http.get(url);
    common.debug("download poll file 37758 > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });
    
  });

}