
export class Token {
  access_token: string;
  client_id: string
  refresh_token: string;
  token_type: string;
  userId: string;
  userName: string;
  ;
}

export class UserModel {
  userName: string;
  password: string;
  provider: 'AdminPanel';
  accessToken: string
}
