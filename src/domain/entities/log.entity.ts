export enum LogSeveretyLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}


export interface LogEntityOptios {

    level: LogSeveretyLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeveretyLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options : LogEntityOptios) {

        const {message, level, origin, createdAt = new Date()} = options;
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
        this.origin = origin;

    }

    static fromJson = (json : string): LogEntity => {
       json = (json === '') ? '{}': json;
        
        const { message, level, createdAt, origin } = JSON.parse(json);

        const log = new LogEntity({
            message,
            level,
            createdAt: new Date(createdAt),
            origin,
        });
        
        return log;
    }

    static fromObject = (object: { [key: string ]: any } ): LogEntity => {

        const {message, level, origin, createdAt} = object;
        // Here validations can be declared

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt,
        });

        return log;

    }
}