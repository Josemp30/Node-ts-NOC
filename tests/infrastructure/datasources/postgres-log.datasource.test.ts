import { PrismaClient } from '@prisma/client/extension';
import {PostgresLogDatasource} from '../../../src/infrastructure/datasources/postgres-log.datasource';
import { LogEntity, LogSeveretyLevel } from '../../../src/domain/entities/log.entity';
import { Prisma, SeverityLevel } from '@prisma/client';

describe('postgres-log.datasource.test.ts', () => {


    // const severityEnum = {
    //     low: SeverityLevel.LOW,
    //     medium: SeverityLevel.MEDIUM,
    //     high: SeverityLevel.HIGH,
    // }
    
    // const log = new LogEntity({
    //     level: LogSeveretyLevel.low,
    //     message: 'Test-message',
    //     origin: 'mongo-log.datasource.test.ts',
    // });

    // const level = severityEnum[log.level];

    // beforeAll(async() => {

    //     const prisma = new PrismaClient();

    //     const newLog = await prisma.logModel.create({
    //         data: {
    //             ...log,
    //             level: level,
    //         }
    //     });
    // })
    
    // afterAll(() => {
    //     new PrismaClient().connection.close();        
    // });

    // const postgreLogDatasource = new PostgresLogDatasource();
    
    test('should create a log', async () => {

        // const logSpy = jest.spyOn(console, 'log');

        // await postgreLogDatasource.saveLog(log);

        // expect(logSpy).toHaveBeenCalled();


    });

});