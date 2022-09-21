import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from 'src/Employee/employee.schema';
import { EmployeeService } from '../Employee/employee.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'employees', schema: EmployeeSchema }]),
  ],
  providers: [AuthService, EmployeeService],
  controllers: [AuthController],
})
export class AuthModule {}
