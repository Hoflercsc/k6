import { check } from 'k6';
import http from 'k6/http';
import * as constants from "../constants.js";

export const debug = (message) => {
    if(__ENV.LOGGING) {
        console.log(message);
    }
    return;
}

export function login (http) {
    let response = http.get(constants.values.LOGIN);

    const form = response.submitForm({
        formSelector: 'form',
        fields: { "login[login]": 'boardeffect', "login[password]": 'password1' },
    });

    let jar = http.cookieJar();
    let cookies = jar.cookiesForURL(constants.baseUrl);
    debug(JSON.stringify(cookies));

    check(form, {
      'status': (r) => r.status === 200,
      'has session cookie': (r) => cookies._boardeffect_session !== undefined
    });

}

export function getUserToken() {
    const url = constants.values.AUTH_BASIC;
    let response = http.post(url);

    console.log(JSON.stringify(response.json().data.token))

    check(response, {
        "status 200": (r) => r.status === 200,
        "success": (r) => r.json().success === true,
        "Authorization = Authorization Successful": (r) => r.json().data.title === "Authorization Successful",
      });
      
    return response.json().data.token;
}
  