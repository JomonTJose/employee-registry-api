import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEmployeeDTO } from './create-employee.dto';
import { IEmployee } from './employee.interface';
import { Model } from 'mongoose';
import { UpdateEmployeeDto } from './update-employee.dto';
import { LoginDTO } from '../Auth/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('employees')
    private employeeModel: Model<IEmployee>,
  ) {}

  async getAllEmployees() {
    try {
      const employeeList = await this.employeeModel.find().exec();
      return employeeList.map((employees) => ({
        firstname: employees.firstName,
        lastName: employees.lastName,
        email: employees.email,
        address1: employees.address1,
        address2: employees.address2,
        location: employees.location,
        country: employees.country,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  async getEmployeesByEmail(mail: string) {
    const employee: unknown = await this.employeeModel.findOne({ email: mail });
    const resEmp: IEmployee = employee as IEmployee;
    const existingEmployee = {
      firstName: resEmp.firstName,
      lastName: resEmp.lastName,
      email: resEmp.email,
      address1: resEmp.address1,
      address2: resEmp.address2,
      location: resEmp.location,
      country: resEmp.country,
    };
    return existingEmployee;
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDTO) {
    const { email } = createEmployeeDto;
    const user = await this.employeeModel.findOne({ email });
    if (user) {
      throw new HttpException(
        'Employee already exists in the system',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newEmployee = new this.employeeModel(createEmployeeDto);
    await newEmployee.save();
    const emp = {
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      email: newEmployee.email,
      address1: newEmployee.address1,
      address2: newEmployee.address2,
      location: newEmployee.location,
      country: newEmployee.country,
      role: newEmployee.role,
    };
    return emp;
  }

  async updateEmployee(
    updateEmployeeDto: UpdateEmployeeDto,
    employeeEmail: string,
  ) {
    const updatedId = await this.employeeModel.updateOne(
      {
        email: employeeEmail,
      },
      updateEmployeeDto,
    );
    console.log(updatedId);
    return 1;
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const employee = await this.employeeModel.findOne({ email });
    if (!employee) {
      throw new HttpException('Employee doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, employee.password)) {
      const sanitized = employee.toObject();
      delete sanitized['password'];
      return employee;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }
}
