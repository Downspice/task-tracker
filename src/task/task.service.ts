import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) { }
  async create(createTaskDto: CreateTaskDto) {
    const newTask = await this.prismaService.task.create({ data: createTaskDto })
    return newTask;
  }

  async findAll() {
    try {
      const tasks = await this.prismaService.task.findMany()
      return tasks;
    } catch (error) {
      console.log(error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
