import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Counter } from "k6/metrics";

export default function Spiral() {

  group("api call", function () {
      let url ='https://jsonplaceholder.typicode.com/posts';
      let response = http.get(url);
      console.log("response = "+response.status)
      //console.log(JSON.stringify(response));

      //  for (var p in response.headers) {
      //     if (response.headers.hasOwnProperty(p)) {
      //       console.log(p + ' : ' + response.headers[p]);
      //     }
      //   }

      check(response, {
      "status 200": (r) => r.status == 200,
      "id": (r) => r.body.indexOf(2) !== -1,
      "title": (r) => r.body.indexOf('qui est esse') !== -1,
      "body": (r) => r.body.indexOf('est rerum tempore vitae') !== -1,
    });

  });

}