import { LogEntity } from '../../../src/domain/entities/log.entity';
import {CheckService} from '../../../src/domain/use-cases/checks/check-service';


describe('check-service.test.ts', () => {
    
    const mockRepository = {
        saveLog: jest.fn(),
        getLog: jest.fn(),
    };

    const succesCallback = jest.fn();
    const errorCallBack = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        succesCallback,
        errorCallBack,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call succesCallback when fetch returns true', async () => {


        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(succesCallback).toHaveBeenCalled();
        expect(errorCallBack).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        
    });


    test('should call errorCallBack when fetch returns false', async () => {


        const failed = await checkService.execute('https://cualquiervaina.com');

        expect(failed).toBe(false);
        expect(succesCallback).not.toHaveBeenCalled();
        expect(errorCallBack).toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        
    });

});