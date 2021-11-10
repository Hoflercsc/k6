export const baseUrl = __ENV.BASE_URL || `https://lab-load-testing.boardeffect.com`;
const workroomId = __ENV.WORKROOM_ID || 8205;
const bookId = __ENV.BOOK_ID || 3025;
const eventId = __ENV.EVENT_ID || 26802;
const surveyId = __ENV.SURVEY_ID || 2208;


const username = __ENV.USERNAME || `boardeffect`;
const password = __ENV.PASSWORD || `password1`;

export const values = {
  //---- V3 API-------
  AUTH_BASIC: `${baseUrl}/api/v3/auth/basic?username=${username}&password=${password}`,
  LOGIN: `${baseUrl}/login`,
  USERNAME: username,
  PASSWORD: password,
  WORKROOMS: `${baseUrl}/api/v3/workrooms`,
  DIRECTWORKROOMSURL: `${baseUrl}/workrooms`,

  //secured book = `https://lab-load-testing.boardeffect.com/api/v3/workrooms/2893/books`; 
  //secured book `https://lab-load-testing.boardeffect.com/api/v3/workrooms/2893/books/3025/download`; 
  API_BOOK: `${baseUrl}/api/v3/workrooms/${workroomId}/books`,
  //large book= `https://lab-load-testing.boardeffect.com/api/v3/workrooms/8205/books/11700/download`; 
  API_BOOK_DOWNLOAD: `${baseUrl}/api/v3/workrooms/${workroomId}/books/${bookId}/download`,

  //const url = `https://lab-load-testing.boardeffect.com/api/v3/workrooms/8205/events`; // same url
  API_EVENTS: `${baseUrl}/api/v3/workrooms/${workroomId}/events`,
  //https://lab-load-testing.boardeffect.com/workrooms/8205/events/26802
  API_EVENTS_GET_EVENT: `${baseUrl}/api/v3/workrooms/${workroomId}/events/${eventId}`,

  API_USERS: `${baseUrl}/api/v3/users`,

  API_SURVEY_GET: `${baseUrl}/api/v3/workrooms/${workroomId}/surveys`,
  API_SURVEY_GET_SURVEY: `${baseUrl}/api/v3/workrooms/${workroomId}/surveys/${surveyId}`,

  //------BROWSER-------    
  TASKS_GET: `${baseUrl}/workrooms/${workroomId}/tasks`,
  TASKS_GET_RESULTS: `${baseUrl}/worksrooms/${workroomId}/tasks/351/results`,

  EVENT_GET: `${baseUrl}/workrooms/${workroomId}/events`,
  EVENTS_GET_EVENTS: `${baseUrl}/workrooms/${workroomId}/events`,

  TASKS_GET: `${baseUrl}/workrooms/${workroomId}/tasks`,
  TASKS_GET_RESULTS: `${baseUrl}/worksrooms/${workroomId}/tasks/351/results`,

  SURVEY_GET: `${baseUrl}/workrooms/${workroomId}/8205/surveys`,
  SURVEY_GET_SURVEY: `${baseUrl}/workrooms/${workroomId}/surveys/2208`,

  SURVEY_TEMPLATE_GET: `${baseUrl}/workrooms/${workroomId}/surveys?templates=1`,
  SURVEY_TEMPLATE_GET_TEMPLATE: `${baseUrl}/workrooms/${workroomId}/8205/surveys/2217`,
  SURVEY_TEMPLATE_GET_TEMPLATE_DOWNLOAD: `${baseUrl}/downloads/vfile/37761`,

  POLL_GET: `${baseUrl}/workrooms/${workroomId}/surveys?survey_type=poll`,
  POLL_GET_POLL: `${baseUrl}/workrooms/${workroomId}/surveys/2214`,
  POLL_GET_POLL_RESULTS: `${baseUrl}/workrooms/${workroomId}/surveys/2214/reporting`,
  POLL_GET_POLL_RESULTS_SUMMARY: `${baseUrl}/workrooms/${workroomId}/surveys/2214/results`,
  POLL_GET_POLL_RESULTS_SUMMARY_PDF: `${baseUrl}/workrooms/${workroomId}/surveys/reports_generate?id=2214&report_format=pdf&report_name=survey_summary_2214`,

  POLL_GET_POLL_INDIVIDUAL_RESULTS: `${baseUrl}/workrooms/${workroomId}/surveys/2214/individual`,
  POLL_GET_POLL_INDIVIDUAL_RESULTS_PDF: `${baseUrl}/workrooms/${workroomId}/surveys/reports_generate?id=2214&report_format=pdf&report_name=survey_individual_2214-12234&user_id=12234`,

  POLL_GET_POLL_DOWNLOAD_FILE: `${baseUrl}/downloads/vfile/37758`,

  BOOK_GET: `${baseUrl}/workrooms/${workroomId}/books`,
  BOOK_GET_DOWNLOAD: `${baseUrl}/workrooms/${workroomId}/books/11700/download`,

  //workrooms/2893/books
  SECURED_CATEGORY_BOOK_GET: `${baseUrl}/workrooms/${workroomId}/books`,
  SECURED_CATEGORY_BOOK_GET_DOWNLOAD: `${baseUrl}/workrooms/${workroomId}/books/3025/download`,

  SURVEY_SUMMARY_RESULTS_GET: `${baseUrl}/workrooms/${workroomId}/8205/surveys`,
  SURVEY_SUMMARY_RESULTS_GET_SURVEY: `${baseUrl}/workrooms/${workroomId}/8205/surveys/2208`,
  SURVEY_SUMMARY_RESULTS_GET_SURVEY_RESULTS: `${baseUrl}/workrooms/${workroomId}/surveys/2208/reporting`,
  SURVEY_SUMMARY_RESULTS_GET_SURVEY_RESULTS_SUMMARY: `${baseUrl}/workrooms/${workroomId}/surveys/2208/results`,
  SURVEY_SUMMARY_RESULTS_GET_SURVEY_RESULTS_SUMMARY_PDF: `${baseUrl}/workrooms/${workroomId}/surveys/reports_generate?id=2208&report_format=pdf&report_name=survey_summary_2208`,
  SURVEY_SUMMARY_RESULTS_GET_SURVEY_RESULTS_SUMMARY_EXCEL: `${baseUrl}/workrooms/${workroomId}/surveys/reports_generate?id=2208&report_format=xlsx&report_name=survey_summary_2208`,

  SURVEY_SUMMARY_RESULTS_GET_INDIVIDUAL_RESULTS: `${baseUrl}/workrooms/${workroomId}/surveys/2208/individual`,
  SURVEY_SUMMARY_RESULTS_GET_INDIVIDUAL_RESULTS_PDF: `${baseUrl}/workrooms/${workroomId}/surveys/reports_generate?id=2208&report_format=pdf&report_name=survey_individual_2208-12234&user_id=12234`,

  SCHEDULER_GET: `${baseUrl}/workrooms/${workroomId}/surveys?survey_type=scheduler`,
  SCHEDULER_GET_SCHEDULER: `${baseUrl}/workrooms/${workroomId}/surveys/2211`,
  SCHEDULER_GET_SCHEDULER_RESULTS: `${baseUrl}/workrooms/${workroomId}/surveys/2211/reporting`,
  SCHEDULER_GET_SCHEDULER_RESULTS_SUMMARY: `${baseUrl}/workrooms/${workroomId}/surveys/2211/results`,
  SCHEDULER_GET_SCHEDULER_RESULTS_SUMMARY_PDF: `${baseUrl}/workrooms/${workroomId}/surveys/reports_generate?id=2211&report_format=pdf&report_name=survey_summary_2211`,
  SCHEDULER_GET_SCHEDULER_RESULTS_SUMMARY_EXCEL: `${baseUrl}/workrooms/${workroomId}/surveys/reports_generate?id=2211&report_format=xlsx&report_name=survey_summary_2211`,

  SCHEDULER_GET_SCHEDULER_INDIVIDUAL_RESULTS: `${baseUrl}/workrooms/${workroomId}/surveys/2211/individual`,
  SCHEDULER_GET_SCHEDULER_INDIVIDUAL_RESULTS_PDF: `${baseUrl}/workrooms/${workroomId}/surveys/reports_generate?id=2211&report_format=pdf&report_name=survey_individual_2211-12234&user_id=12234`,

  POLL_GET: `${baseUrl}/workrooms/${workroomId}/surveys?survey_type=poll`,
  POLL_GET_POLL: `${baseUrl}/workrooms/${workroomId}/surveys/2214`,

  DISCUSSIONS_GET: `${baseUrl}/workrooms/${workroomId}/discussions`,
  DISCUSSIONS_GET_DISCUSSIONS: `${baseUrl}/workrooms/${workroomId}/discussions/672`,
  DISCUSSIONS_GET_DISCUSSIONS_REPLY: `${baseUrl}/workrooms/${workroomId}/discussions/672/discussion_posts/1584`,
  DISCUSSIONS_GET_DISCUSSIONS_DOWNLOAD_FILE: `${baseUrl}/workrooms/${workroomId}/discussions/672.pdf`,

};


