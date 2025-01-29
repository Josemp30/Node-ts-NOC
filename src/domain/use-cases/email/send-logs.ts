import { EmailService } from "../../../presentation/email.service";
import { LogEntity, LogSeveretyLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface sendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements sendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ){}
    
    async execute (to: string | string[]) {
        
        try {
            const sent = await this.emailService.sendEmailWithFileSytemLogs(to);
            if(!sent) throw new Error('Email log not sent');

            const log = new LogEntity({
                level: LogSeveretyLevel.low,
                message: 'Email sent',
                origin: 'send-logs.ts',
            });

            this.logRepository.saveLog(log);

            return true;

        } catch (error) {
            
            const log = new LogEntity({
                level: LogSeveretyLevel.high,
                message: `${error}`,
                origin: 'send-logs.ts',
            });

            this.logRepository.saveLog(log);

            return false;
        }
        
    }

   

}