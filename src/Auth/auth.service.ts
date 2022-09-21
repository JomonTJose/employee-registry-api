import { Injectable } from '@nestjs/common';
import { Payload } from './payload.model';
import { sign } from 'jsonwebtoken';
import { EmployeeService } from '../Employee/employee.service';

@Injectable()
export class AuthService {
  constructor(private employeeService: EmployeeService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
  }
}
