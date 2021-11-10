import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export const options = constants.testOptions;
export let errorRate = new Rate("errors");

export default function downloadDiscussionsFileHttp() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("go to discussions", function () {
    const url = constants.values.DISCUSSIONS_GET;
    let response = http.get(url);
    common.debug("go to discussions > "+response.status)
    
    let success = check(response, {"status 200": (r) => r.status === 200});
    errorRate.add(!success);
  });

  group("open up discussion 672", function () {
    const url = constants.values.DISCUSSIONS_GET_DISCUSSIONS;
    let response = http.get(url);
    common.debug("open up discussion 672 > "+response.status)

    let success = check(response, {"status 200": (r) => r.status === 200});
    errorRate.add(!success);
  });
  
  group("download discussion 672 pdf", function () {
    const url = constants.values.DISCUSSIONS_GET_DISCUSSIONS_DOWNLOAD_FILE;
    let response = http.get(url);
    common.debug("download discussion 672 pdf > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

}