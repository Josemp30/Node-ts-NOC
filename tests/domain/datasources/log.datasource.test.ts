import {LogDataSource} from '../../../src/domain/datasources/log.datasource';
import { LogEntity, LogSeveretyLevel } from '../../../src/domain/entities/log.entity';


describe('log.datasource.test.ts', () => {
    
    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeveretyLevel.low,
    })
    
    class MockLogDatasource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return;            
        }
        async getLog(severityLevel: LogSeveretyLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }

    test('should test the abstract class', async () => {

        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        //expect(mockLogDatasource).toHaveProperty('saveLog');        
        //expect(mockLogDatasource).toHaveProperty('getLog'); 
        expect(typeof mockLogDatasource.saveLog).toBe('function');      
        expect(typeof mockLogDatasource.getLog).toBe('function');
        
        await mockLogDatasource.saveLog(newLog);

        const logs = await mockLogDatasource.getLog(LogSeveretyLevel.low);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);


    });


});