import { CreateStatCardDataDto } from './../dto/widget-types/stat-card/create-stat-card-data.dto';
import { CreateWidgetDto } from './../dto/create-widget.dto';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, validateSync } from 'class-validator';
import { CreateWidgetDataDto } from '../dto/create-widget-data.dto';

@ValidatorConstraint({ name: 'customText', async: false })
export class WidgetDataIntegrity implements ValidatorConstraintInterface {
    validate(data: CreateWidgetDataDto, args: ValidationArguments) {
        try {
            if (!data) return false;
            const { type } = args.object as CreateWidgetDto;

            switch (type) {
                case 'STAT_CARD': {
                    const statCardData = new CreateStatCardDataDto(data);
                    const errors = validateSync(statCardData, { forbidNonWhitelisted: true });
                    if (errors.length) return false;
                }
            }

            return true;
        } catch (error) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return 'Invalid widget data';
    }
}
