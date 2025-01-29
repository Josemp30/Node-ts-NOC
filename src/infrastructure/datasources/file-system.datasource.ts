import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDataSource {
    
    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(path => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        });
    }
    
    async saveLog( newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify(newLog) }\n`;
        
        fs.appendFileSync(this.allLogsPath, logAsJson);

        if( newLog.level === LogSeveretyLevel.low ) return;

        if ( newLog.level === LogSeveretyLevel.medium ) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        }else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    }

    private getLogsFromFile = (path : string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        if(content === '') return [];
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );

        return logs;
    }

    async getLog(severityLevel: LogSeveretyLevel): Promise<LogEntity[]> {
        
        switch(severityLevel) {
            case LogSeveretyLevel.low:
                return this.getLogsFromFile(this.allLogsPath);

            case LogSeveretyLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
                
            case LogSeveretyLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
                
            default:
                throw new Error(`${severityLevel} not implemented`);
        }

    }

}