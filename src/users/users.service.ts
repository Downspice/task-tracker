import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}
    async findOne(id:string):Promise<User|null>{
        const user = await this.prisma.user.findFirst({where:{id:id} })
        return user;
    }
}
