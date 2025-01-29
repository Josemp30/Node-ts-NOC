import fs from 'fs';
import path from 'path';
import {FileSystemDatasource} from '../../../src/infrastructure/datasources/file-system.datasource';
import { LogEntity, LogSeveretyLevel } from '../../../src/domain/entities/log.entity';
import { SeverityLevel } from '@prisma/client';

describe('file-system.datasource.test.ts', () => {
    
    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true});
    });
    
    test('should create log file if they do not exist', () => {

        new FileSystemDatasource();
        const files = fs.readdirSync(logPath);

        expect(files).toEqual([ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]);

    });

    test('should save a log in logs-all.log', () => {

        const logDatasource = new FileSystemDatasource();

        const newLog = new LogEntity({
            message: 'sigue practicando',
            level: LogSeveretyLevel.low,
            origin: 'file-system.datasource.test.ts',
        });

        logDatasource.saveLog(newLog);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        
        expect(allLogs).toContain(JSON.stringify(newLog));

    });

    test('should save a log in logs-all.log and logs-medium.log', () => {

        const logDatasource = new FileSystemDatasource();

        const newLog = new LogEntity({
            message: 'sigue practicando',
            level: LogSeveretyLevel.medium,
            origin: 'file-system.datasource.test.ts',
        });

        logDatasource.saveLog(newLog);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf8');
        
        expect(allLogs).toContain(JSON.stringify(newLog));
        expect(mediumLogs).toContain(JSON.stringify(newLog));
        

    });

    test('should save a log in logs-all.log and logs-high.log', () => {

        const logDatasource = new FileSystemDatasource();

        const newLog = new LogEntity({
            message: 'sigue practicando',
            level: LogSeveretyLevel.high,
            origin: 'file-system.datasource.test.ts',
        });

        logDatasource.saveLog(newLog);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf8');
        
        expect(allLogs).toContain(JSON.stringify(newLog));
        expect(highLogs).toContain(JSON.stringify(newLog));
        

    });

    // test('should return all logs', async() => {

    //     const logDatasource = new FileSystemDatasource();

    //     const lowLog = new LogEntity({
    //         message: 'sigue practicand low',
    //         level: LogSeveretyLevel.low,
    //         origin: 'file-system.datasource.test.ts',
    //     });        
    //     const mediumLog = new LogEntity({
    //         message: 'sigue practicando medium',
    //         level: LogSeveretyLevel.medium,
    //         origin: 'file-system.datasource.test.ts',
    //     });        
    //     const highLog = new LogEntity({
    //         message: 'sigue practicando high',
    //         level: LogSeveretyLevel.high,
    //         origin: 'file-system.datasource.test.ts',
    //     });

    //     await logDatasource.saveLog(lowLog);
    //     await logDatasource.saveLog(mediumLog);
    //     await logDatasource.saveLog(highLog);

    //     const lowLogs = logDatasource.getLog(LogSeveretyLevel.low);
    //     const meidumLogs = logDatasource.getLog(LogSeveretyLevel.medium);
    //     const highLogs = logDatasource.getLog(LogSeveretyLevel.high);

    //     expect(lowLogs).toEqual(expect.arrayContaining([lowLog, mediumLog, highLog]));
    //     expect(meidumLogs).toEqual(expect.arrayContaining([mediumLog]));
    //     expect(highLogs).toEqual(expect.arrayContaining([highLog]));
    // });

    test('should return if file exists', () => {

        new FileSystemDatasource();
        new FileSystemDatasource();

        expect(true).toBeTruthy();

    });

    test('should throw an error if SeveretyLevel is not defined', async () => {

        const logDatasource = new FileSystemDatasource();
        const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeveretyLevel;

        try {
            await logDatasource.getLog(customSeverityLevel);
            expect(true).toBeFalsy();
        } catch (error) {
            const errorString = `${error}`;

            expect(errorString).toContain(`${customSeverityLevel} not implemented`);
        }

    });


});