# CryptOvadya API
CryptOvadya is a platform for creating and managing dashboards of crypto data.

Website - [cryptovadya.com](https://www.cryptovadya.com) \
UI repo - [CryptOvadya UI](https://github.com/eyalovadya/cryptovadya-ui)

## Table of Content:

- [Features](#features)
- [Built With](#built-with)
- [Setup](#setup)
- [Main Entities](#main-entities)
  - [Widget](#widget)
  - [Dashboard](#dashboard)
  - [User](#user)
- [Environment Variables](#environment-variables)

## Features
- REST API
- Endpoints for CRUD operations on [widgets](#widget), [dashboards](#dashboard), [users](#user) (see [Main Entities](#main-entities))
- JWT authorization using HttpOnly cookie
- Database connection and migrations
- Integration with [CoinGecko API](https://www.coingecko.com/en/api/documentation)

## Built With

- [NestJS Framework](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Passport](https://www.passportjs.org/) - Used for authorization middleware
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Used for password hashing, and compare given password with hash for authentication
- [Sequelize](https://sequelize.org/)

Check [package.json](https://github.com/eyalovadya/cryptovadya-api/blob/master/package.json) for more :wink:

## Setup

First you need to clone or download the repository.\
Then, in the project root directory:
1. Run `npm install` to get the npm dependencies
2. Create .env file and add the [environment variables](#environment-variables)
3. Run `npm start` (without live reload) or `npm run start:dev`(with live reload) to run the app in the development mode 
4. Use `npm run db:migrate` to run database migrations, see [sequelize-cli](https://sequelize.org/docs/v6/other-topics/migrations/) to learn how to manage migrations 

## Main Entities

### Widget
Widget is a generic entity, it represents a common set of data which you would like to see in the dashboard. \
Each widget has a type `WidgetType` by which the data to be represented is determined. \
In this project we have a single type of widget `STAT_CARD`. \
`STAT_CARD` data gives us information about a single crypto pair.

#### TypeScript representation: 

#### `Widget Type`
```typescript
const WIDGET_TYPES = ['STAT_CARD'] as const;
type WidgetType = typeof WIDGET_TYPES[number]; // compiles to - type WidgetType = 'STAT_CARD'
```
If you would like to add more widget types, just add them to the `WIDGET_TYPES` array. \
For each widget type you need to create the corresponding `WidgetData` type (e.g. `StatCardData`).

**StatCardData Example:**
```typescript
type StatCardData = {
    baseCurrency: string;
    quoteCurrency: string;
    value: number;
    dayDiffPrecent: number;
};
```

#### `Widget Data`
```typescript
type WidgetData<T extends WidgetType = WidgetType> = T extends 'STAT_CARD' ? StatCardData : any;
```
To add new data type extend the ternary expression. 
For example: 
```typescript
type WidgetData<T extends WidgetType = WidgetType> = T extends 'STAT_CARD' ? StatCardData : 'NEW_TYPE' ? NewTypeData : any;
```

#### `Widget`
```typescript
type Widget<T extends WidgetType = WidgetType> = {
    id: number;
    dashboardId: number;
    type: T;
    data: WidgetData<T>;
};
```
Widget have a generic widget type parameter `T` which defaults to all widget types. Then we determine the data prop type with `WidgetData<T>`

### Dashboard
Dashboard have a title and a collection of widgets of all types.

#### TypeScript representation: 
```typescript
type Dashboard = {
    id: number;
    userId: string;
    title: string;
    widgets: Widget[];
};
```

### User
User can manage a collection of dashboards.


#### TypeScript representation: 
```typescript
export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
};
```

## Environment Variables
```sh
CRYPTOVADYA_UI_URL=

DATABASE_DIALECT=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=

DATABASE_URL=

JWT_SECRET=
SEQUELIZE_LOGGING_FLAG= # 0 or 1
```

## Credits
[Eyal Ovadya](https://github.com/eyalovadya) :)

## License

Nest is [MIT licensed](LICENSE).
