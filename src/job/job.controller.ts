/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostJobDto } from './dto/job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postJob(@Req() req: any, @Body() postJobDto: PostJobDto) {
    const userId = req.user.id;
    const job = await this.jobService.postJob(userId, postJobDto);

    return { job, message: 'Job created successfully', success: true };
  }

  @Get()
  async getAllJobs(@Query() query: string) {
    const jobs = await this.jobService.getAllJobs(query);
    return { jobs, success: true };
  }

  @Get(':id')
  async getJobByid(@Param('id') jobId: string) {
    const job = await this.jobService.getJobById(jobId);
    return { job, success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin')
  async getJobByUserId(@Req() req: any) {
    const userId = req.user.id;
    const jobs = await this.jobService.getJobByUserId(userId);
    return { jobs, success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorite/:id')
  async createFavorite(@Req() req, @Param('id') jobId: string) {
    const userId = req.user.id;
    const result = await this.jobService.createFavourite(jobId, userId);
    return { result, success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites')
  async getFavorites(@Req() req) {
    const userId = req.user.id;
    const result = await this.jobService.getFavorites(userId);
    return { result, success: true };
  }

  @Delete(':id')
  async deleteJob(@Param('id') jobId: string) {
    const result = await this.jobService.deleteJob(jobId);
    return {
      result,
      success: true,
      message: 'Job deleted successfully',
    };
  }
}
