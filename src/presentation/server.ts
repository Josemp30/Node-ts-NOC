import { LogSeveretyLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email.service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);

const posgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {

    public static async start() {

        console.log('Server started...');

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemRepository
        // ).execute(['prueba@gmail.com, prueba@hotmail.com']);

        
        // const logs = await logRepository.getLog(LogSeveretyLevel.low);
        // console.log(logs)       

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, posgresLogRepository], 
        //             () => console.log(`${url} is ok. Success!`),
        //             (error) => console.log( error ),
        //         ).execute(url);
        //     }
        // );

    }

}