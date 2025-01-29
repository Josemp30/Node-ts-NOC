import {envs} from '../../src/config/plugins/envs.plugin';


describe('envs.plugin,ts', () => {



    test('should return env optios', () => {

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'josemcp30@gmail.com',
            MAILER_SECRET_KEY: 'msmdcsnxwcvkeauy',
            PROD: false,
            MONGO_URL: 'mongodb://josemp30:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'josemp30',
            MONGO_PASS: '123456789'
        });

    });

    test('should return error if not found env', async () => {

        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('../../src/config/plugins/envs.plugin');
            expect(true).toBeFalsy();
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }

    });

});