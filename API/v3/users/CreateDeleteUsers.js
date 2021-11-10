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

function buildFormRequestHeaders(token) {
    return {
      headers: {
        Authorization: token
      },
    };
}

function buildDeleteRequestHeaders(token) {
  return {
    headers: {
      Authorization: token
    },
  };
}

function buildDeactivateUserform() {
  return {
    active: "false"
  }
}

//-----------------------------
function buildUserForm() {
  let randomStr = Math.random().toString().substr(2, 8);
  let username = "loadtest" + randomStr;

  return {
    firstname: "load",
    lastname: "test",
    login: username,
    email: `${username}@diligent.com`,
  }
}
//--------------------------------

export function setup (){ 
  return common.getUserToken();
}

export default function createDeleteUsers(token) {

  group("go to users", function () {
    const url = constants.values.API_USERS;
    let response = http.get(url, buildJsonRequestHeaders(token));
    console.log("go to users -> " + response.status);
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });
  });

  group("create & delete user", function () {
    console.log(JSON.stringify(buildUserForm(), null, 2));
    const url = constants.values.API_USERS;
    let response = http.post(url, buildUserForm(),buildFormRequestHeaders(token));
    console.log("create users -> " + response.status);
    
    let userid = response.json().data.id;
    console.log("user id = "+ userid);

    check(response, {
      'post response  200': (r) => r.status === 200,
      'user id present': (r) => userid > 0
    });

    //-------PUT - Deactivate User
    let deactivateResponse = http.put(url+"/"+userid,buildDeactivateUserform(),buildFormRequestHeaders(token));
    console.log("deactivate user -> " + deactivateResponse.status);
    console.log('event id = ' + userid);

    check(deactivateResponse, {
      'user deactivated':  (r) => r.status === 200,
    });

    //-------DEL - Delete User
   let deleteResponse = http.del(url+"/"+userid,null,buildDeleteRequestHeaders(token));
    console.log("attempt to delete -> " + deleteResponse.status);
    console.log('event id = ' + userid);

    check(deleteResponse, {
      'user deleted': (r) => r.status === 204
    });

  
  });



}