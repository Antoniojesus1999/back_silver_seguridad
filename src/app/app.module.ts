import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthModule } from "@/app/health/health.module";

import { LoggerModule } from "@/shared/logger/logger.module";

import { UserModule } from "@/contexts/users/user.module";

import { ConfigDBModule } from "../config/config-db.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ConfigDBModule,
    LoggerModule,
    HealthModule,
    UserModule,
  ],
})
export class AppModule {}
