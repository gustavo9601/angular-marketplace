export const config = {
  url: 'http://localhost:4200/assets/',
  api: 'https://marketplace-gm.firebaseio.com/',
  endPointCreateAccount: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  endPointLogin: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  endPointSendVerifcationEmail: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=',
  endPointConfirmVerifcationEmail: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=',
  endPointGetUserDataAuth: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=',
  endPointRestPasswordUser: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=',
  apiKeyFirebase: 'AIzaSyBog1ZMBRgVnavkQib8BMzI-XBKWamK3Ww'
}
