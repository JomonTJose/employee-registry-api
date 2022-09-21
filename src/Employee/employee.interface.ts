import { Document } from 'mongoose';

export interface IEmployee extends Document {
  //readonly employeeId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly address1: string;
  readonly address2: string;
  readonly location: string;
  readonly country: string;
}
