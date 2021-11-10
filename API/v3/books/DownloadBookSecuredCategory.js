import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import * as constants from "../../../constants.js";
import * as common from "../../../utils/common.js";


function buildJsonRequestHeaders(token) {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
}

export function setup() {
  return common.getUserToken();
}  

export default function downloadBookSecuredCategory(token) {

  group("go to workroom", function () {
    const url = constants.values.API_BOOK;
    let response = http.get(url, buildJsonRequestHeaders(token));
    console.log("inside workroom library: status = " + response.status);

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("download book", function () {
    const url = constants.values.API_BOOK_DOWNLOAD;
    let response = http.get(url, buildJsonRequestHeaders(token));
    console.log("book downloaded: status = "+response.status);

    // after download  loopig through response header displaying content
    //  for (var p in response.headers) {
    //     if (response.headers.hasOwnProperty(p)) {
    //       console.log(p + ' : ' + response.headers[p]);
    //     }
    //   }
    
    check(response, {
      'status 200': (r) => r.status === 200,
      'content-disposition': (r) => r.headers.hasOwnProperty("Content-Disposition"),
      //'attachment secured categories.pdf': fileCheck 
    });

  });

}