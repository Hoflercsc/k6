import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Counter } from "k6/metrics";
import { Rate } from "k6/metrics";

/*
Note current api is not capable of walking through entire user experiance. 
A secured category book was created first through the UI. the purpose of this
test is to measure load ability of user download the
*/

export let options = {
  stages: [
    { duration: '5m', target: 200 }, // simulate ramp-up of traffic from 1 to 50 users over 5 minutes.
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],   // http errors should be less than 1% 
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 1.5s
  },
};

export let errorRate = new Rate("errors");


export default function getEvent() {

  group("login get cookie", function () {
    let response = http.get(`https://lab-load-testing.boardeffect.com/login`);

    const form = response.submitForm({
    formSelector: 'form',
    fields: { "login[login]": 'boardeffect', "login[password]": 'password1' },
    });

    console.log("login web form "+form.status)

    let jar = http.cookieJar();
    let cookies = jar.cookiesForURL(`https://lab-load-testing.boardeffect.com`);
    console.log(JSON.stringify(cookies));

    let success = check(form, {
      'status': (r) => r.status === 200,
      //'has session cookie': (r) => cookies._boardeffect_session !== undefined
    });
    errorRate.add(!success);

  });

  group("go to events", function () {
    sleep(3);
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/events`);
    let response = http.get(url);
    console.log("go to workroom library "+response.status)

    let success = check(response, {"status 200": (r) => r.status === 200});
    errorRate.add(!success);

  });

  group("open up event 26802", function () {
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/events/26802`);
    let response = http.get(url);
    console.log("open up event 26802 = " + response.status);

    let success = check(response, {"status 200": (r) => r.status === 200});
    errorRate.add(!success);
  });

}