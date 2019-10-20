import fs from 'fs';
import path from 'path';

let environment = null;

export abstract class TOSEnvironment {

    public static get postgres() { return this.get()['postgres'] as Postgres; }

    private static get() {
        return environment = environment || JSON.parse(fs.readFileSync(path.join('..', 'environment.json'), 'utf8'))
    }
}

type Postgres = {
    database: string;
    host: string;
    username: string;
    password: string;
}
