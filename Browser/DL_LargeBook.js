import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export const options = constants.testOptions;
export let errorRate = new Rate("errors");


export default function downloadBookHttp() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("go to workroom", function () {
    const url = constants.values.BOOK_GET;
    let response = http.get(url);
    common.debug("go to workroom = " + response.status);

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("download large book", function () {
    const url = constants.values.BOOK_GET_DOWNLOAD;
    let response = http.get(url);
    common.debug("download large book = " + response.status);

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });


}