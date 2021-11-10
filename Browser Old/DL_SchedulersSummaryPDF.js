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

export default function getSchedulersHttp() {

  group("login get cookie", function () {
    let response = http.get(`https://lab-load-testing.boardeffect.com/login`);

    const form = response.submitForm({
    formSelector: 'form',
    fields: { "login[login]": 'boardeffect', "login[password]": 'password1' },
    });

    console.log("login web form > "+form.status)

    let jar = http.cookieJar();
    let cookies = jar.cookiesForURL(`https://lab-load-testing.boardeffect.com`);
    console.log(JSON.stringify(cookies));

    check(form, {
      'status': (r) => r.status === 200,
      'has session cookie': (r) => cookies._boardeffect_session !== undefined
    });

  });

  group("go to schedulers", function () {
    sleep(3);
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys?survey_type=scheduler`);
    let response = http.get(url);
    console.log("go to schedulers > "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up scheduler 2211", function () {
    sleep(3);
    // even though the link shows surveys it is actually getting the scheduler id 
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/2211`);
    let response = http.get(url);
    console.log("open up scheduler 2211 > "+response.status)


    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("go to results page", function () {
    sleep(3);
    // even though the link shows surveys it is actually getting the results page 
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/2211/reporting`);
    let response = http.get(url);
    console.log("go to results page > "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
      "Content-Type" : application/pdf
    });

  });

  group("go to summary page", function () {
    sleep(3);
    // even though the link shows surveys it is actually getting the sumamry page 
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/2211/results`);
    let response = http.get(url);
    console.log("go to summary page > "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
      "Content-Type" : application/pdf
    });

  });

  group("download results summary pdf", function () {
    sleep(3);
    // even though the link shows surveys it is actually download pdf 
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/reports_generate?id=2211&report_format=pdf&report_name=survey_summary_2211`);
    let response = http.get(url);
    console.log("download results summary pdf > "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
      "Content-Type" : application/pdf
    });

  });

}