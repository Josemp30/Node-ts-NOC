import { LogEntity } from '../../../src/domain/entities/log.entity';
import { CheckServiceMultiple } from '../../../src/domain/use-cases/checks/check-service-multiple';


describe('check-service-multiple.test.ts', () => {

    const mockRepository1 = {
        saveLog: jest.fn(),
        getLog: jest.fn(),
    };
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLog: jest.fn(),
    };
    const mockRepository3 = {
        saveLog: jest.fn(),
        getLog: jest.fn(),
    };

    const succesCallback = jest.fn();
    const errorCallBack = jest.fn();
    
    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepository1, mockRepository2, mockRepository3],
        succesCallback,
        errorCallBack,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call succesCallback when fetch returns true', async () => {


        const wasOk = await checkServiceMultiple.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(succesCallback).toHaveBeenCalled();
        expect(errorCallBack).not.toHaveBeenCalled();
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        
    });


    test('should call errorCallBack when fetch returns false', async () => {


        const failed = await checkServiceMultiple.execute('https://sdsdsdsdcualquiervaina.com');

        expect(failed).toBe(false);
        expect(succesCallback).not.toHaveBeenCalled();
        expect(errorCallBack).toHaveBeenCalled();
        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        
    });

});