import {LogEntity, LogSeveretyLevel} from  '../../../src/domain/entities/log.entity';


describe('log.entity.test.ts', () => {

    const dataObj = {
        message: 'practica todos los dias',
        level: LogSeveretyLevel.high,
        origin: 'log.entity.test.ts',
    };

    test('should create a log entity', () => {

        
        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);


    });

    test('should create a LogEntity instance from Json', () => {

        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-11-25T13:15:25.554Z","origin":"check-service.ts"}
`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('Service https://google.com working');
        expect(log.level).toBe(LogSeveretyLevel.low);
        expect(log.origin).toBe('check-service.ts');
        expect(log.createdAt).toBeInstanceOf(Date);

    });
    
    test('should create a LogEntity instace from object', () => {

        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    });
});