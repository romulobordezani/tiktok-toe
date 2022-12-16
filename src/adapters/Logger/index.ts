class Logger  {
    log (data: any) {
        console.log(data);
    }

    table (data: any) {
        console.table(data);
    }
}


export const logger = new Logger();
