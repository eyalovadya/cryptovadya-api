import { StatCardData } from './../types/stat-card.type';
import { CreateWidgetDto } from './../dto/create-widget.dto';
import { WidgetData } from './../types/widget-data.type';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, validateSync } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class WidgetDataIntegrity implements ValidatorConstraintInterface {
    validate(data: WidgetData, args: ValidationArguments) {
        try {
            if (!data) return false;
            const { type } = args.object as CreateWidgetDto;

            switch (type) {
                case 'STAT_CARD': {
                    const statCardData = new StatCardData(data);
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
