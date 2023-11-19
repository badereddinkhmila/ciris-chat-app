"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: app_module_1.AppModule.clientUrl,
    });
    app.setGlobalPrefix('/api/v1');
    await app.listen(app_module_1.AppModule.port || 8000);
}
bootstrap();
//# sourceMappingURL=main.js.map