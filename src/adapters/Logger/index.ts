class Logger  {
    log (data: any) {
        console.log(data);
    }

    clear () {
        console.clear();
    }
}

export const logger = new Logger();
