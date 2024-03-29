import { Logtail } from "@logtail/browser";
import { v4 as uuid } from 'uuid';

const token: string = process.env.REACT_APP_LOGGER as string;

interface Logger {
    token: string;
    logtail: Logtail;
    UUID: string;
    ID: number;
    log(message: string): void;
}

class Logger implements Logger {
    constructor() {
        this.token = token;
        this.logtail = new Logtail(this.token);
        if (!localStorage.getItem("UUID")) {
            this.UUID = uuid();
            localStorage.setItem("UUID", this.UUID);
            this.ID = 0;
            localStorage.setItem("ID", String(this.ID));
        } else {
            this.UUID = localStorage.getItem("UUID") as string;
            if (!localStorage.getItem("ID")) {
                this.ID = 0;
                localStorage.setItem("ID", String(this.ID));
            } else {
                this.ID = Number(localStorage.getItem("ID"));
                this.ID--;
            }
        }
    }

    public log(message: string) {
        if (this.ID === 0) {
            this.warn(`New UUID generated - ${this.UUID}`);
        }
        let text = `${this.UUID} - ${this.ID} - ${message}`;
        console.log(text);
        this.logtail.log(text);
        this.ID++;

        localStorage.setItem("ID", String(this.ID));
    }

    public warn(message: string) {
        let text = `${this.UUID} - ${this.ID} - ${message}`;
        console.warn(text);
        this.logtail.warn(text);
        this.ID++;
        localStorage.setItem("ID", String(this.ID));
    }
}

export default Logger;
