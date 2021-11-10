import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Counter } from "k6/metrics";

export let options = {
  scenarios: {
    my_web_test: {
      executor: 'per-vu-iterations',
      vus: 25,
      maxDuration: '5m',
      gracefulStop: '0s', // do not wait for iterations to finish in the end
      tags: { test_type: 'website' }, // extra tags for the metrics generated by this scenario
      exec: 'webtest', // the function this scenario will execute
    },
  },
  
  thresholds: {
    //http_req_failed: ['rate<0.01'],   // http errors should be less than 1% 
    'http_req_failed{test_type:website}': ['rate<0.01'],
    'http_req_duration{test_type:website}': ['p(90)<200'], // 99% of requests must complete below 200
  },
};

export function webtest() {

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

  group("go to poll", function () {
    sleep(3);
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys?survey_type=poll`);
    let response = http.get(url);
    console.log("go to poll "+response.status)
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up poll 2214", function () {
    sleep(3);
    // even though the link shows surveys it is actually getting the poll id 
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/2214`);
    let response = http.get(url);
    console.log("open up poll 2214 > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up poll 2214 results", function () {
    sleep(3);
    // even though the link shows surveys it is actually getting the poll results 
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/2214/reporting`);
    let response = http.get(url);
    console.log("open up poll 2214 results > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("open up poll 2214 summary", function () {
    sleep(3);
    // even though the link shows surveys it is actually getting the poll summary 
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/2214/results`);
    let response = http.get(url);
    console.log("open up poll 2214 summary > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

  group("download poll 2214 summary pdf", function () {
    sleep(3);
    // even though  link shows surveys it's actually downloading  poll results summary excel
    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/surveys/reports_generate?id=2214&report_format=pdf&report_name=survey_summary_2214`);
    let response = http.get(url);
    console.log("download poll 2214 summary pdf > "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });

}