import winston, { Logger } from 'winston';
import path from 'path';

export interface ILoggerService {
  info(message: string, meta?: unknown): void;
  error(message: string, error?: unknown): void;
  warn(message: string, meta?: unknown): void;
  debug(message: string, meta?: unknown): void;
}

class LoggerService implements ILoggerService {
  private logger: Logger;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';
    const isTesting = process.env.NODE_ENV === 'testing';

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: { service: 'backend_receitas' },
      transports: [
        new winston.transports.File({
          filename: path.join('logs', 'error.log'),
          level: 'error'
        }),
        new winston.transports.File({
          filename: path.join('logs', 'combined.log')
        })
      ],
      silent: isTesting
    });

    if (!isProduction) {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.errors({ stack: true }),
            winston.format.colorize({ all: true }),
            winston.format.printf((info) => {
              const { timestamp, level, message, service, meta, error } = info;
              const base = `[${timestamp}] [${service}] ${level}: ${message}`;

              // Se há metadados aninhados em `meta`, limpar undefined
              if (meta && typeof meta === 'object') {
                const cleanMeta = Object.entries(meta)
                  .filter(([, value]) => value !== undefined)
                  .reduce(
                    (acc, [key, value]) => {
                      acc[key] = value;
                      return acc;
                    },
                    {} as Record<string, unknown>
                  );

                if (Object.keys(cleanMeta).length > 0) {
                  return `${base}\n${JSON.stringify(cleanMeta, null, 2)}`;
                }
              }

              // Se há erro aninhado
              if (error && typeof error === 'object') {
                return `${base}\n${JSON.stringify(error, null, 2)}`;
              }

              return base;
            })
          )
        })
      );
    }
  }

  info(message: string, meta?: unknown): void {
    this.logger.info(message, this.normalizeMeta(meta));
  }

  error(message: string, error?: unknown): void {
    this.logger.error(message, this.normalizeError(error));
  }

  warn(message: string, meta?: unknown): void {
    this.logger.warn(message, this.normalizeMeta(meta));
  }

  debug(message: string, meta?: unknown): void {
    this.logger.debug(message, this.normalizeMeta(meta));
  }

  private normalizeMeta(meta?: unknown): Record<string, unknown> | undefined {
    if (meta === undefined) {
      return undefined;
    }

    if (meta instanceof Error) {
      return {
        error: {
          name: meta.name,
          message: meta.message,
          stack: meta.stack
        }
      };
    }

    return { meta };
  }

  private normalizeError(error?: unknown): Record<string, unknown> | undefined {
    if (error === undefined) {
      return undefined;
    }

    if (error instanceof Error) {
      return {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      };
    }

    return { error };
  }
}

export const logging = new LoggerService();
