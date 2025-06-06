import {IsEmail, IsEnum, IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ADMIN', 'ENGINEER'], {
        message: 'Valid role is required'
    })
    role: 'INTERN' | 'ADMIN' | 'ENGINEER'
}