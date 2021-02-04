export default class Auth {

  static authenticateToken(token){
      sessionStorage.setItem('token', token);
  }

  static isAuthenticated(){
      return sessionStorage.getItem('token') !== null;
  }

  static deauthenticateToken(){
      sessionStorage.removeItem('token');
  }

  static getToken(){
      return sessionStorage.getItem('token');
  }
}