/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async register(data: { email: string; password: string, name: string, confirmPassword: string }) {
        if (data.password !== data.confirmPassword) {
           throw new BadRequestException('Las contraseñas no coinciden');
        }

        const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
            throw new BadRequestException('El correo electrónico ya está registrado');
        }
        
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
            },
        });
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    } 

    async login(data: { email: string; password: string }) {
        const user = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (!user) {
            throw new BadRequestException('Credenciales inválidas');
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Credenciales inválidas');
        }
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    
    }
}