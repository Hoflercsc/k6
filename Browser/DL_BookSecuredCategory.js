import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Counter } from "k6/metrics";
import { Rate } from "k6/metrics";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export const options = constants.testOptions;
export let errorRate = new Rate("errors");

export default function downloadBookSecuredCategory() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

  group("go to workroom", function () {
    //workrooms/2893/books
    const url = constants.values.SECURED_CATEGORY_BOOK_GET;
    let response = http.get(url);
    common.debug("go to workroom library "+response.status)

    let success = check(response, {"status 200": (r) => r.status === 200});
    errorRate.add(!success);

  });

  group("download book secured category", function () {
    const url = constants.values.SECURED_CATEGORY_BOOK_GET_DOWNLOAD;
    let response = http.get(url);
    common.debug("download secured = " + response.status);

    let success = check(response, {"status 200": (r) => r.status === 200});
    errorRate.add(!success);

  });

}