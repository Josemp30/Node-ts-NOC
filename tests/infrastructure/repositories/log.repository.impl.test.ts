import { LogEntity, LogSeveretyLevel } from '../../../src/domain/entities/log.entity';
import {LogRepositoryImpl} from '../../../src/infrastructure/repositories/log.repository.impl';


describe('log.repository.impl', () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLog: jest.fn(),
    };

    const logRepository = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('saveLog should call the datasource with arguments', async() => {

        const log = {level: LogSeveretyLevel.low, message: 'hola'} as LogEntity;
        await logRepository.saveLog(log);

        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);

    });
    
    test('getLog should call the datasource with arguments', async() => {

        const lowSeverity = LogSeveretyLevel.low;
        
        await logRepository.getLog(lowSeverity);

        expect(mockLogDatasource.getLog).toHaveBeenCalledWith(lowSeverity);

    });



});