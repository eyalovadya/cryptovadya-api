import { Controller, Req, Body, Post, UseGuards, Get, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { DashboardsService } from './dashboards.service';
import { Dashboard as DashboardEntity } from './dashboard.entity';
import { DashboardDto } from './dto/dashboard.dto';
import { JwtAuthGuard } from './../users/auth/jwt-auth.guard';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboards')
@UseGuards(JwtAuthGuard)
export class DashboardsController {
    constructor(private readonly dashboardsService: DashboardsService) {}

    @Get()
    findAll(@Req() request): Promise<DashboardDto[]> {
        const userId = request.user.id;
        return this.dashboardsService.findAll(userId);
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number, @Req() request): Promise<DashboardDto> {
        const userId = request.user.id;
        return this.dashboardsService.findOne(id, userId);
    }

    @Post()
    create(@Body() createDashboardDto: CreateDashboardDto, @Req() request): Promise<DashboardEntity> {
        const userId = request.user.id;
        return this.dashboardsService.create(userId, createDashboardDto);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Req() request, @Body() updateDashboardDto: UpdateDashboardDto): Promise<DashboardEntity> {
        const userId = request.user.id;
        return this.dashboardsService.update(id, userId, updateDashboardDto);
    }

    @Delete(':id')
    delete(@Param('id', new ParseIntPipe()) id: number, @Req() request): Promise<DashboardEntity> {
        const userId = request.user.id;
        return this.dashboardsService.delete(id, userId);
    }
}
