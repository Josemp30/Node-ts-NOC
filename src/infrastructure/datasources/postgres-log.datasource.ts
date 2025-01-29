import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDataSource {
    
    async saveLog(log: LogEntity ): Promise<void> {
        
        const level = severityEnum[log.level];

        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level: level,
            }
        });

        console.log('Postgre register created', newLog.id);
    }
    async getLog(severityLevel: LogSeveretyLevel): Promise<LogEntity[]> {
        
        const level = severityEnum[severityLevel];
        
        const logs = await prisma.logModel.findMany({
            where: {
                level: level,
            }
        });

        return logs.map(postgreLog => LogEntity.fromObject(postgreLog));
    }

}