const serviceID: string = process.env.REACT_APP_SENDER_SERVICE_ID as string;
const templateID: string = process.env.REACT_APP_SENDER_TEMPLATE_ID as string;
const publicKey: string = process.env.REACT_APP_SENDER_PUBLIC_KEY as string;

interface Sender {
    serviceID: string;
    templateID: string;
    publicKey: string;
}

class Sender implements Sender {
    constructor() {
        this.serviceID = serviceID;
        this.templateID = templateID;
        this.publicKey = publicKey;
    }
}

export default Sender;
