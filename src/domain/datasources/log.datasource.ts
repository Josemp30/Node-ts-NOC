import { LogEntity, LogSeveretyLevel } from "../entities/log.entity";

export abstract class LogDataSource {
    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLog( severityLevel : LogSeveretyLevel ): Promise<LogEntity[]>;
}

