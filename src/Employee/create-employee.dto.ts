import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateEmployeeDTO {
	@IsString()
	@IsNotEmpty()
	readonly firstName: string;

	@IsString()
	@IsNotEmpty()
	readonly lastName: string;

	@IsEmail()
	@IsNotEmpty()
	readonly email: string;

	@IsNotEmpty()
	readonly password: string;

	@IsNotEmpty()
	@IsString()
	readonly address1: string;
	readonly address2: string;

	@IsNotEmpty()
	readonly location: string;

	@IsNotEmpty()
	readonly country: string;

	readonly role: string;
}
