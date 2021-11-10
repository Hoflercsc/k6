import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import * as constants from "../../../constants.js";
import * as common from "../../../utils/common.js";

function getUserToken() {
  const url = constants.values.AUTH_BASIC;
  let response = http.post(url);
  common.debug(JSON.stringify(response.json().data.status))

  check(response, {
    "status 200": (r) => r.status === 200,
    "success": (r) => r.json().success === true,
    "Authorization = Authorization Successful": (r) => r.json().data.title === "Authorization Successful",
  });
  return response.json().data.token;

}

function buildJsonRequestHeaders(token) {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
}

function buildFormRequestHeaders(token) {
    return {
      headers: {
        Authorization: token,
      },
    };
}

let pdf = open("../files/cypress.pdf","b");
function buildBookFormData() {
  return {
    title: "Jonathans Book",
    visible: 1,
    "book[coverpage]": 1,
    file: http.file(pdf, "cypress.pdf"),
  }
}

function deleteBookFormData(token) {
  return {
    "_method": "delete",
    "authenticity_token": token
  }
}

export function setup() {
  return common.getUserToken();
}  

export default function createBookTest(token) {
  let token = getUserToken(); // variable function gets the token on login 

  group("go to workroom", function () {
    const url = constants.values.API_BOOK;
    let response = http.get(url, buildJsonRequestHeaders(token));
    common.debug(response.status);
    check(response, {
      "status 200": (r) => r.status === 200,
    });
  });

  group("post book", function () {
    const url = constants.values.API_BOOK;
    let response = http.post(url, buildBookFormData(),buildFormRequestHeaders(token));
    common.debug(response.status);
    let bookid = response.json().data.id;
    
    check(response, {
      'is status 200': (r) => r.status === 200,
      'book id is present ': (r) => bookid != 0
    });    
    /*
    The current Api does not have a way to delete a meeting book this is a know limitation however
    if it did this is what you would do to delete the book
    
    let deleteResponse = http.post(url+"/"+bookid,deleteBookFormData(token),buildFormRequestHeaders(token));
    console.log(deleteResponse.status);
    console.log(bookid);

    check(deleteResponse, {
      'is status 204': (r) => r.status === 204,
    });

    */
  });

 

}