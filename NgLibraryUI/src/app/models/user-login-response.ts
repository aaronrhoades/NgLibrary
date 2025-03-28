export class UserLoginResponse {
    tokenType: string = ''; //Bearer
    accessToken: string = '';
    expiresIn: number = 0; //seconds
    refreshToken: string = '';
}