import nodemailer from 'nodemailer'
import {EmailService, SendEmailOptions} from '../../src/presentation/email.service';


describe('email.service', () => { 

    const mockSendEmail = jest.fn();

    //Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendEmail,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const emailService = new EmailService();
    
    test('should ',  async() => {


        const options: SendEmailOptions = {
            to: 'josemcp30@gmail.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        };

        await emailService.sendEmail(options);

        expect( mockSendEmail ).toHaveBeenCalledWith({
            "attachments": expect.any(Array), 
            "html": "<h1>Test</h1>", 
            "subject": "Test", 
            "to": "josemcp30@gmail.com"
        });

        
    });
    
    test('should send email with attachements', async() => {

        const email = 'josemcp30@gmail.com'
    
        await emailService.sendEmailWithFileSytemLogs(email);
    
        expect(mockSendEmail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                {filname: 'logs-all.log', path: './logs/logs-all.log'},
                {filname: 'logs-high.log', path: './logs/logs-high.log'},
                {filname: 'logs-medium.log', path: './logs/logs-medium.log'},
            ])
        });
    
    });

});