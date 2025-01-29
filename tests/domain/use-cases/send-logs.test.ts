import { LogEntity } from '../../../src/domain/entities/log.entity';
import { SendEmailLogs} from '../../../src/domain/use-cases/email/send-logs';
import { EmailService } from '../../../src/presentation/email.service';


describe('send-logs.test.ts', () => {

    const mockEmailService = {
        sendEmailWithFileSytemLogs: jest.fn().mockReturnValue( true ),
    }

    const mockRepository = {
        saveLog: jest.fn(),
        getLog: jest.fn(),
    }
    
    const sendEmail = new SendEmailLogs(mockEmailService as any, mockRepository);
    
    const mail = 'dkfnkdsnfkksdfjlkjsdksj@gmail.com';

    beforeEach(() => {
        jest.clearAllMocks();
    })


    test('should call sendEmail and saveLog', async() => {


        const result = await sendEmail.execute(mail);
        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSytemLogs).toHaveBeenCalledTimes(1);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Email sent",
            origin: "send-logs.ts",
        });
        
    });

    test('should log in case of error', async() => {

        mockEmailService.sendEmailWithFileSytemLogs.mockReturnValue(false);

        const result = await sendEmail.execute(mail);
        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSytemLogs).toHaveBeenCalledTimes(1);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "high",
            message: "Error: Email log not sent",
            origin: "send-logs.ts",
        });
        
    });

});