import {
  Get,
  Post,
  Controller,
  Res,
  HttpStatus,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { AuthService } from '../Auth/auth.service';
import { UpdateEmployeeDto } from '../Employee/update-employee.dto';
import { CreateEmployeeDTO } from './create-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getEmployees(@Res() response) {
    try {
      const employeeList = await this.employeeService.getAllEmployees();
      return response.status(HttpStatus.OK).json({
        message: 'All Employees fetched',
        employeeList,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async createEmployee(
    @Res() response,
    @Body() createEmployeeDto: CreateEmployeeDTO,
  ) {
    try {
      const newEmployee = await this.employeeService.createEmployee(
        createEmployeeDto,
      );
      const payload = {
        email: newEmployee.email,
      };
      const token = await this.authService.signPayload(payload);
      const response1 = { newEmployee, token };
      return response.status(HttpStatus.CREATED).json({
        message: 'New Employee Created',
        response1,
      });
    } catch (err) {
      return response.status(err.status).json({
        statusCode: 400,
        message: 'Error: Employee not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/:email')
  async getEmployeesbyEmail(@Res() response, @Param('email') email: string) {
    try {
      const employeeList = await this.employeeService.getEmployeesByEmail(
        email,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Employee fetched by EmailId',
        employeeList,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put()
  async updateEmployee(
    @Res() response,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      const newEmployee = await this.employeeService.updateEmployee(
        updateEmployeeDto,
        updateEmployeeDto.email,
      );
      console.log('Updated Epm ' + newEmployee);
      return response.status(HttpStatus.CREATED).json({
        message: 'New Employee Created',
        newEmployee,
      });
    } catch (err) {
      return response.status(err.status).json({
        statusCode: 400,
        message: 'Error: Employee not created!',
        error: 'Bad Request',
      });
    }
  }
}
