import { WidgetDto } from './dto/widget.dto';
import { Controller, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WidgetsService } from './widgets.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { JwtAuthGuard } from '../users/auth/jwt-auth.guard';
import { DeleteWidgetDto } from './dto/delete-widget.dto';

@Controller('widgets')
@UseGuards(JwtAuthGuard)
export class WidgetsController {
    constructor(private readonly widgetsService: WidgetsService) {}

    @Post()
    create(@Body() createWidgetDto: CreateWidgetDto, @Req() request): Promise<WidgetDto> {
        const userId = request.user.id;
        return this.widgetsService.create(createWidgetDto, userId);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @Body() deleteWidgetDto: DeleteWidgetDto, @Req() request) {
        const userId = request.user.id;
        const { dashboardId } = deleteWidgetDto;
        return this.widgetsService.delete(+id, dashboardId, userId);
    }
}
