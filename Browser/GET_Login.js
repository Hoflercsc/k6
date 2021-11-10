import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Rate } from "k6/metrics";
import * as constants from "../constants.js";
import * as common from "../utils/common.js";

export const options = constants.testOptions;
export let errorRate = new Rate("errors");

export default function getLogin() {

  group("login get cookie", function () {
    //common.login(http)
    common.debug(http);
  });

}