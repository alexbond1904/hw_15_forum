import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Response, Request, NextFunction } from 'express';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: Error, request: Request, response: Response, next: NextFunction) {
        const status = error.message && error.message.includes('not found') ? 404 : 400;

        return response.status(status).json({
            timestamp: new Date().toISOString(),
            status,
            error: status === 404 ? 'Not Found' : 'Bad Request',
            message: error.message || 'Internal server error',
            path: request.originalUrl
        });
    }
}
