import { Controller, Get, Put, UseGuards, Param, Delete, ForbiddenException, Body } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UsersService } from './users.service'; 
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get()
    @Roles('admin')
    findAllUsers() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @Roles('admin', 'user')
    async findOne(@Param('id') id: number, @CurrentUser() currentUser: User) { 
        if (currentUser.role !== 'admin' && currentUser.id !== id) {
            throw new ForbiddenException('Access Denied');
        }

        const user = await this.usersService.findOne(+id);
        if (!user) {
            throw new ForbiddenException('User not found');
        }
        return user;
    }

    @Put(':id')
    @Roles('admin', 'user')
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
        @CurrentUser() currentUser: User
    ) {
        if (currentUser.role !== 'admin' && currentUser.id !== id) {
        throw new ForbiddenException('Access Denied');
        }

        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @Roles('admin', 'user')
    async deleteUser(@Param('id') id: number, @CurrentUser() currentUser: User) {
        if (currentUser.role !== 'admin' && currentUser.id !== id) {
        throw new ForbiddenException('You do not have permission to delete this user.');
        }

        return this.usersService.remove(id);
    }
}