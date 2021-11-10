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
        Authorization: token,
      },
    };
}

function buildEventFormData(date1,date2) {
  return {
    title: "This is a Event Title",
    datetime_start: date1,
    datetime_end: date2,
    location: "Norfolk County",
    timezone: "Eastern Time (US & Canada)",
    description: "This is an Event Description",
    country: "US",
    city: "Richmond",
    state: "VA",
    eventcolor_id: "574",
  }
}

function deleteEvent(token) {
  return {
    "_method": "delete",
    "authenticity_token": token
  }
}

function startDate() {
var today = new Date();
var dd = String(today.getDate()+1 ).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var start_Date = yyyy + '-' + mm + '-' + dd;

return start_Date

}

function endDate() {
  var today = new Date();
  var dd = String(today.getDate()+ 2).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var end_Date = yyyy + '-' + mm + '-' + dd;
  
  return end_Date
  }

  export function setup() {
    return common.getUserToken();
  }  

  //--------------------------------
  export default function createDeleteEvent(token) {

  group("go to events", function () {
    const url = constants.values.API_EVENTS;
    let response = http.get(url, buildJsonRequestHeaders(token));
    common.debug(response.status);
    
    check(response, {
      "status 200": (r) => r.status === 200,
    });

  });


  group("post event & delete", function () {
    let date1 = startDate();  
    let date2 = endDate();

    const url = constants.values.API_EVENTS;
    let response = http.post(url, buildEventFormData(date1,date2),buildFormRequestHeaders(token));
    common.debug(response.status);
    
    let eventid = response.json().data.id;
    common.debug("event id = "+ eventid);

    check(response, {
      'post response status 200': (r) => r.status === 200,
      'response event id present': (r) => eventid != 0
    });
    
    let deleteResponse = http.post(url+"/"+eventid,deleteEvent(token),buildFormRequestHeaders(token));
    common.debug(deleteResponse.status);
    common.debug('event id = ' + eventid);

    /* for (var p in deleteResponse.headers) {
      if (deleteResponse.headers.hasOwnProperty(p)) {
        console.log(p + ' : ' + deleteResponse.headers[p]);
      }
    }
    */
    check(deleteResponse, {
      'sucess = status 204 = event deleted, no additional content': (r) => r.status === 204
    });

  
  });


}