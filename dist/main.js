"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOptions = {
        origin: 'http://localhost:4200',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    };
    app.enableCors(corsOptions);
    const port = process.env.PORT || 8000;
    await app.listen(port, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map