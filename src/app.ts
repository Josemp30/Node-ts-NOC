import 'dotenv/config';
import { Server } from '../src/presentation/server';
import { MongoDatabase } from './data/mongo';
import { envs } from './config/plugins/envs.plugin';
//import { PrismaClient } from '@prisma/client';

(async ()=> {
    main();
})();

async function main() {
    
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    //const prisma = new PrismaClient();
    //
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // });

    // console.log({newLog});
    
    
    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'MEDIUM',
    //     }
    // });
    // console.log(logs); 

    Server.start();

}