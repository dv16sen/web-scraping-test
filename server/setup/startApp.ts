import {log} from "../utils/log";
import http from "http";
import {setupApp} from "./setupApp";
import {constants} from "../utils/constants";

export interface AppOptions {
    productionHost?: string,
    host: string,
    port: number
}

export const startApp = async (appOptions: AppOptions): Promise<http.Server> => {
    const app = setupApp();

    log.sectionTitle(`Starting Server`);

    return new Promise<http.Server>(resolve => {
        const port = process.env.PORT || appOptions.port;
        const homeUrl = (constants.isProduction)
            ? `https://${appOptions.productionHost}/\n`
            : `http://${appOptions.host}:${port}/\n`;

        const server = app.listen(port, () => {
            log.title("The server is now running.");
            log.message(homeUrl);
            log.apiPoints();
            log.endOfSection();
            resolve(server);
        });
    });
};