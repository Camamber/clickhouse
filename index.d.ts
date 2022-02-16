/// <reference types="node" />

declare module 'clickhouse' {
  import {Stream} from 'stream';

  type callbackExec = (error: Error, rows?: Object[]) => void;

  export class ClickHouse {
    constructor(opts: Object);
    query(query: String, reqParams?: object): QueryCursor;
    insert(query: String, data?: object): QueryCursor;
    sessionId: string;
  }

  export class WriteStream extends Stream.Transform {
    writeRow(data: Array<any> | string): Promise<void>;
    exec(): Promise<{}>;
  }

  class QueryCursor {
    toPromise(): Promise<Object[]>;
    exec(callback: callbackExec): void;
    stream(): Stream & WriteStream;
  }

  export class UInt64 {
    constructor(uint64Value: string);
    getValue(): string;
    toString(): string;
    static fromString(uint64Value: string): UInt64
  }
}
