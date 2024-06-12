/* eslint-disable prettier/prettier */
export class UserDto {
    id: string;
    name:string;
    email:string;
    phoneNumber:number;
    address:string;
  
    constructor(id: string,     name:string,
        email:string,
        phoneNumber:number,
        address:string,
      ) {
      this.id = id;
      this.name=name;
      this.email=email;
      this.phoneNumber=phoneNumber
      this.address=address;
      // Assign other properties
    }
  }
  