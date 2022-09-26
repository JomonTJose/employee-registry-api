import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { EmployeeService } from '../Employee/employee.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private employeeService: EmployeeService,
		private authService: AuthService,
	) { }

	@Post('login')
	async login(@Res() response, @Body() loginDto: LoginDTO) {
		const employee = await this.employeeService.findByLogin(loginDto);
		const payload = {
			email: employee.email,
		};
		const token = await this.authService.signPayload(payload);
		const loginResponse = { employee, token };
		return response.status(HttpStatus.OK).json({
			message: 'Login Successful',
			loginResponse,
		});
	}
}
