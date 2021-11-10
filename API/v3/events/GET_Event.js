import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import * as constants from "../../../constants.js";
import * as common from "../../../utils/common.js";

function buildJsonRequestHeaders(token) {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
  };
}

export function setup() {
  return common.getUserToken();
}  

export default function getEvent(token) {

   group("go to events", function () {
    const url = constants.values.API_EVENTS;
    let response = http.get(url, buildJsonRequestHeaders(token));
    common.debug(response.status);
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up event 26802", function () {
    const url = constants.values.API_EVENTS_GET_EVENT;
    let response = http.get(url, buildJsonRequestHeaders(token));
    common.debug("open up event 26802 = " + response.status);

    let success = check(response, {"status 200": (r) => r.status === 200});
  });

}