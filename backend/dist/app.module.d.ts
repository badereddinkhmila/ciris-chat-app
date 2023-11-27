import { ConfigService } from '@nestjs/config';
export declare class AppModule {
    static port: number;
    static clientUrl: string;
    constructor(_config: ConfigService);
}
