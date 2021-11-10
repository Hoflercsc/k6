import http from "k6/http";
import { sleep } from "k6";
import { check, group } from "k6";
import { Counter } from "k6/metrics";
import {Lab} from "./constants/Lab.js"



function buildFormRequestHeaders() {
    return {
      headers: {
      },
    };
}


function deleteBookFormData() {
  return {
    "_method": "delete",
  }
}


let pdf = open("./files/cypress.pdf","b")

export default function createBookTest() {



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

  group("go to workroom", function () {
    sleep(3);

    const url = (`https://lab-load-testing.boardeffect.com/workrooms/8205/books`);
    let response = http.get(url);
    console.log("go to workroom library "+response.status)

    check(response, {
      "status 200": (r) => r.status === 200,
    });
    sleep(3);
  });

  group("post book", function () {
    let response = http.get(`https://lab-load-testing.boardeffect.com/workrooms/8205/books/new`);
    console.log("request book form "+response.status)

    
    const form = response.submitForm({
    formSelector: '#new_book',
    fields: {
      "book[title]": "This is a Book Title", 
      "book[agenda_title]": "This is an Agenda",
      "book[visible]": 1,
      "book[coverpage]": 1,
      "book[agenda]": 1,
       "file": http.file(pdf, "cypress.pdf"),
    }
    });
    
    console.log("post book "+form.status)
    console.log("post book "+form.url)


    let redirect = form.url;
    console.log("redirect url "+ redirect)

    let modredirect = redirect.slice(0,-5)
    console.log("redirect url "+ modredirect)


    const foo = modredirect.submitForm({
      formSelector: 'input',
      fields: {
        "_method": "delete",
      }
      });


    // let deleteResponse = http.post(modredirect,deleteBookFormData());
    // console.log(deleteResponse.status);

    check(form, {
      'status': (r) => r.status === 200,
    });


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
  

 

}