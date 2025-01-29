import nodemailer from 'nodemailer';
import { envs } from '../config/plugins/envs.plugin';
import { LogEntity, LogSeveretyLevel } from '../domain/entities/log.entity';

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

export interface Attachment {
    filname: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor(){}

    async sendEmail(options: SendEmailOptions):Promise<boolean> {
        const {to, subject, htmlBody, attachments = []} = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            //console.log(sentInformation);

            return true;
        } catch (error) {
            
            return false;
        }
    }

    async sendEmailWithFileSytemLogs( to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `<h2>Logs de Sistema - NOC</h2>
        <p>Testing attachementes</p>
        <p>Ver logs adjuntos</p>       
        `;

        const attachments: Attachment[] = [
            {filname: 'logs-all.log', path: './logs/logs-all.log'},
            {filname: 'logs-high.log', path: './logs/logs-high.log'},
            {filname: 'logs-medium.log', path: './logs/logs-medium.log'},
        ];

        return this.sendEmail({
            to, subject, htmlBody, attachments
        });
    }
}