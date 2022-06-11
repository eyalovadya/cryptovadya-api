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
        return this.dashboardsService.findAll(request.user.id);
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number, @Req() request): Promise<DashboardDto> {
        return this.dashboardsService.findOne(id, request.user.id);
    }

    @Post()
    create(@Body() createDashboardDto: CreateDashboardDto, @Req() request): Promise<DashboardEntity> {
        return this.dashboardsService.create(request.user.id, createDashboardDto);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Req() request, @Body() updateDashboardDto: UpdateDashboardDto): Promise<DashboardEntity> {
        return this.dashboardsService.update(id, request.user.id, updateDashboardDto);
    }

    @Delete(':id')
    delete(@Param('id', new ParseIntPipe()) id: number, @Req() request): Promise<DashboardEntity> {
        return this.dashboardsService.delete(id, request.user.id);
    }
}
