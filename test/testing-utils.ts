import { ExecutionContext } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

export const TestingDatabase = TypeOrmModule.forRoot({
  type: 'better-sqlite3',
  database: ':memory:',
  autoLoadEntities: true,
  synchronize: true,
});

export const ManagerGuardOverride = {
  canActivate: (context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = {
      id: 1,
      username: 'admin',
      userType: 'manager',
    };
    return true;
  },
};

export const CustomerGuardOverride = {
  canActivate: (context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = {
      id: 1,
      username: 'john doe',
      userType: 'customer',
    };
    return true;
  },
};
