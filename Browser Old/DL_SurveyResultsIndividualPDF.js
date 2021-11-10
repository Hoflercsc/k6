import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Counter } from "k6/metrics";

/*
Note current api is not capable of walking through entire user experiance. 
A secured category book was created first through the UI. the purpose of this
test is to measure load ability of user download the
*/

// export let options = {
//   stages: [
//     { duration: '5m', target: 50 }, // simulate ramp-up of traffic from 1 to 50 users over 5 minutes.
//     { duration: '5m', target: 50 }, // stay at 50 users for 5 minutes
//     { duration: '3m', target: 0 }, // ramp-down to 0 users
//   ],
//   thresholds: {
//     http_req_failed: ['rate<0.01'],   // http errors should be less than 1% 
//     // http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
//     // 'requests below 1.5s ': ['p(99)<1500'], // 99% of requests must complete below 1.5s
//   },
// };

export default function downloadSurveyResultsIndividual() {

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

    check(form, {
      'status': (r) => r.status === 200,
      'has session cookie': (r) => cookies._boardeffect_session !== undefined
    });

  });

  group("go to surveys", function () {
    sleep(3);
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys`);
    let response = http.get(url);
    console.log("go to survey > "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up surveys 2208", function () {
    sleep(3);
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/2208`);
    let response = http.get(url);
    console.log("open up surveys 2208 > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("go to view available results", function () {
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/2208/reporting`);
    let response = http.get(url);
    console.log("go to view available results > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("go to survey 2208 individual results", function () {
      const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/2208/individual`);
      let response = http.get(url);
      console.log("go to survey 2208 individual results > "+response.status)
  
      check(response, {
        "status 200": (r) => r.status === 200,
      });

   });


   group("download survey 2208 individual results pdf", function () {
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/reports_generate?id=2208&report_format=pdf&report_name=survey_individual_2208-12234&user_id=12234`);
    let response = http.get(url);
    console.log("download survey 2208 individual results pdf > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

 });


}