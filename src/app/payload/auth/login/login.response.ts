export interface LoginResponse{
  'authenticationToken': string,
  'expiresAt': Date, // don't use String
  'refreshToken': string,
  'username': string
}