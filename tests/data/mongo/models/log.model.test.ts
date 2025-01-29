import {MongoDatabase} from '../../../../src/data/mongo/init';
import {envs} from '../../../../src/config/plugins/envs.plugin';
import {LogModel} from '../../../../src/data/mongo/models/log.model';
import mongoose from 'mongoose';


describe('log.model.test.ts', () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        })
    });

    afterAll(() => {
        mongoose.connection.close();
    })

    test('should return LogModel', async () => {
        
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-massage',
            level: 'low',
        }

        const log = await LogModel.create(logData);

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String),
        }));

        await LogModel.findByIdAndDelete( log.id );
    
    });

    test('should return the schema', () => {

        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            level: {
              type: expect.any(Function),
              enum: [ 'low', 'medium', 'high' ],
              default: 'low'
            },
            origin: { type: expect.any(Function) },
            createdAt: { type: expect.any(Function), default: expect.any(Date) } //It could be: expect.any(Object)
          }))

    });



});