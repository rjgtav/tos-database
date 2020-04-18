import axios from 'axios';
import {Express, NextFunction, Request, Response} from "express";

export abstract class ApiTinyUrlService {

    public static handler(app: Express, endpoint: string) {
        app.post(`${ endpoint }/create`, (req, res, next) => this.create(req, res, next));
        app.get(`${ endpoint }/get`, (req, res, next) => this.get(req, res, next));
    }

    private static async create(request: Request, response: Response, next: NextFunction) {
        try {
            let get = await axios.get<string>('http://tinyurl.com/api-create.php?url=' + encodeURIComponent(request.body.url));

            response.send(get.data);
        } catch(error) {
            next(error);
        }
    }

    private static async get(request: Request, response: Response, next: NextFunction) {
        try {
            let get = await axios.get<string>('http://tinyurl.com/' + request.query.id, { maxRedirects: 0, validateStatus: (status) => status === 301 });

            response.send(get.headers.location);
        } catch (error) {
            next(error);
        }

    }

}
