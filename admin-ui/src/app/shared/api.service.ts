export class ApiUrl {

  static serverMode = true;
  static localUrl = 'http://localhost:5000/';
  static serverUrl = 'http://dev.liamtra.com:8000/';

  static baseUrl: string = ApiUrl.serverMode === true ? ApiUrl.serverUrl : ApiUrl.localUrl;

  static prodMode = true; /* this is for production or development url */

  static LOGIN_URI_PORT = ApiUrl.prodMode === true ? 'api/' : 'api/';
  static MASTER_URI_PORT = ApiUrl.prodMode === true ? 'api/' : 'api/';
  static BOOKING_URI_PORT = ApiUrl.prodMode === true ? 'api/' : 'api/';
  static USER_URI_PORT = ApiUrl.prodMode === true ? '' : ':44301/';
  static HOST_URI_URI_PORT = ApiUrl.prodMode === true ? 'api/' : 'api/';
  static IMAGE_URI_URI_PORT = ApiUrl.prodMode === true ? '' : '';
  static UNIQUE_HOME_URI_PORT = ApiUrl.prodMode === true ? 'api/' : 'api/';
  static SRC_PORT = ApiUrl.prodMode === true ? '' : '';

  static LOGIN_URI = ApiUrl.baseUrl + ApiUrl.LOGIN_URI_PORT;
  static MASTER_URI = ApiUrl.baseUrl + ApiUrl.MASTER_URI_PORT;
  static USER_URI = ApiUrl.baseUrl + ApiUrl.USER_URI_PORT;
  
  static BOOKING_URI = ApiUrl.baseUrl + ApiUrl.BOOKING_URI_PORT;
  static HOST_URI = ApiUrl.baseUrl + ApiUrl.HOST_URI_URI_PORT;
  static IMAGE_URI = ApiUrl.baseUrl + ApiUrl.IMAGE_URI_URI_PORT;
  static HOME_URI = ApiUrl.baseUrl + ApiUrl.UNIQUE_HOME_URI_PORT;
  static SRC_URI = ApiUrl.baseUrl + ApiUrl.SRC_PORT;

}


