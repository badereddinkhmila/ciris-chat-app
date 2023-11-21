export default class User {
  readonly id?: string;

  readonly firstname: string;

  readonly lastname: string;

  readonly email: string;

  password?: string;

  constructor(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}
