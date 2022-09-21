import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class EmployeeInformation {
  @Prop()
  employeeId: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string; //Also Username

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop()
  address1: string;

  @Prop()
  address2: string;

  @Prop()
  location: string;

  @Prop()
  country: string;
}
export const EmployeeSchema = SchemaFactory.createForClass(EmployeeInformation);

EmployeeSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
