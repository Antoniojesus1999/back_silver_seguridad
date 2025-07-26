import { Module } from "@nestjs/common";
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    NestConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const type = configService.get<string>(
          "DB_TYPE",
          "postgres",
        ) as "postgres";
        const host = configService.get<string>("DB_HOST", "localhost");
        const port = Number(configService.get<string>("DB_PORT", "5432"));
        const username = configService.get<string>("DB_USERNAME", "usuario");
        const password = configService.get<string>("DB_PASSWORD", "contraseña");
        const database = configService.get<string>("DB_DATABASE");
        const isProd = process.env.NODE_ENV === "production";

        // Ajusta las rutas de entidades y migraciones
        const entities = [
          isProd
            ? "dist/entity/**/*.entity.js"
            : "../src/entity/**/*.entity.ts",
        ];
        const migrations = [
          isProd ? "dist/migrations/**/*.js" : "../src/migrations/**/*.ts",
        ];

        const synchronize = configService.get<boolean>("DB_SYNCHRONIZE", false);

        // Log seguro de cada propiedad
        for (const [key, value] of Object.entries({
          type,
          host,
          port,
          username,
          password: "***",
          database,
          entities,
          migrations,
          synchronize,
        })) {
          // eslint-disable-next-line no-console
          console.log(`DB Config - ${key}:`, value);
        }

        return {
          type,
          host,
          port,
          username,
          password,
          database,
          entities,
          migrations,
          synchronize,
        };
      },
    }),
  ],
})
export class ConfigDBModule {}
