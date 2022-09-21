import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/Auth/auth.service';
import { EmployeeController } from './employee.controller';
import { EmployeeSchema } from './employee.schema';
import { EmployeeService } from './employee.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'employees', schema: EmployeeSchema }]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, AuthService],
})
export class EmployeeModule {}
