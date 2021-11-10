import { check, group } from "k6";
import createBookTest from "./API/v3/books/CreateBookTest.js";
import downloadBookSecuredCategory from "./API/v3/books/DownloadBookSecuredCategory.js"
import downloadLargeBook from "./API/v3/books/DownloadLargeBook.js"
import createDeleteEvent from "./API/v3/events/CreateDeleteEvent.js"
import createDeleteUsers from "./API/v3/users/CreateDeleteUsers.js"
import getEvent from "./API/v3/events/GET_Event.js"
import getSurvey from "./API/v3/surveys/GET_Survey.js"

import * as common from "./utils/common.js";

let scenarios = {
    smoke: {
        executor: 'constant-vus',
        vus: 1,
        duration: '1m',
        gracefulStop: '0s', // do not wait for iterations to finish in the end
    },
    stress: {
        executor: 'per-vu-iterations',
        vus: 10,
        maxDuration: '5m',
        gracefulStop: '0s', // do not wait for iterations to finish in the end
    },
};

let thresholds = {
    smoke: {
        http_req_failed: ['rate<0.01'],   // http errors should be less than 1% 
        http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1.5s
    }
}

export let options = {
    scenarios: {},
    thresholds: {}
}

if (__ENV.scenario) {
    // Use just a single scenario if `--env scenario=whatever` is used
    options.scenarios[__ENV.scenario] = scenarios[__ENV.scenario];
    options.thresholds = thresholds[__ENV.scenario];
} else {
    // Use all scenrios
    options.scenarios = scenarios;
    options.thresholds = thresholds.lab;
}

export function setup() {
    return common.getUserToken();
}  

export default function(token) {
    group('Create Book', () => {
        createBookTest(token);
    })
    group('Create Delete Event', () => {
        createDeleteEvent(token);
    })
    group('create Delete Users', () => {
        createDeleteUsers(token);
    })

    group('download book secured category', () => {
        downloadBookSecuredCategory(token);
    })

    group('download large book', () => {
        downloadLargeBook(token);
    })

    group('get event', () => {
        getEvent(token);
    })

    group('get survey', () => {
        getSurvey(token);
    })

    
};