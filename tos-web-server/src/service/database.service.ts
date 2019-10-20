import {TOSEnvironment} from "../environment";
import {Pool, PoolClient, QueryResult} from "pg";

import path from 'path';
import {TOSRegion, TOSRegionService} from "../../../tos-web/src/app/shared/domain/tos-region";

const postgres = TOSEnvironment.postgres;
const pool = new Pool({
    database: postgres.database,
    host: postgres.host,
    user: postgres.username,
    password: postgres.password,
    max: 20,
    min: 2
});

export abstract class TOSDatabaseService {

    public static async end() {
        return pool.end();
    }

    public static async entries(schema: string, table: string): Promise<TOSEntry[]> {
        return this
            .query<TOSEntry>(schema, `SELECT * FROM ${ this.sanitize(table) }`, null)
            .then(value => value.map(TOSDatabaseService.entryMapper));
    }
    public static async entryByClassID(schema: string, table: string, ClassID: number): Promise<TOSEntry> {
        return this
            .query<TOSEntry>(schema, `SELECT * FROM ${ this.sanitize(table) } WHERE "ClassID" = $1`, [ClassID])
            .then(value => value.map(TOSDatabaseService.entryMapper)[0]);
    }
    public static async entryByClassName(schema: string, table: string, ClassName: string): Promise<TOSEntry> {
        return this
            .query<TOSEntry>(schema, `SELECT * FROM ${ this.sanitize(table) } WHERE "ClassName" = $1`, [ClassName])
            .then(value => value.map(TOSDatabaseService.entryMapper)[0]);
    }
    private static entryMapper(value: TOSEntry): TOSEntry {
        delete value.__Entry_Hash;

        return value;
    }

    public static async query<T>(schema: string, query: string, values: any[]) {
        let connection: PoolClient = null;
        let result: QueryResult = null;

        try {
            connection =    await pool.connect();
            await connection.query(`BEGIN`);
            await connection.query(`SELECT set_config('search_path', $1, true)`, [schema]); // Thanks https://dba.stackexchange.com/a/222090 & https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADMIN-SET
            result =        await connection.query(query, values);
            await connection.query('COMMIT');

            return result.rows as T[];
        } catch(error) {
            connection && await connection.query('ROLLBACK');
            throw error;
        } finally {
            connection && connection.release();
        }
    }

    // Same as tos-parser/src/utils/pgutil.py > sanitize
    public static sanitize(param: string): string {
        return param.replace(/[^a-zA-Z0-9_]+/g, ''); // Remove suspicious characters to prevent SQL injection
    }

    // Same as tos-parser/src/utils/pgutil.py > schema
    public static schema(region: TOSRegion): string {
        return `${ TOSRegionService.toUrl(region) }`;
    }

    // Same as tos-parser/src/utils/pgutil.py > table_name
    public static tableName(table: string): string {
        table = path.basename(table).split('.')[0];
        table = table.replace(/-/g, '_');
        table = table.replace('statbase', 'stat');
        table = this.sanitize(table);

        return table.toLowerCase();
    };

}

export type TOSEntry = {
    ClassID?: number;
    ClassName?: string;
    __Entry_Created: string;
    __Entry_Hash: string;
    __Entry_Updated: string;
}
