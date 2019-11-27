/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import { createServer } from 'http';
// import { dialogflow } from './dialogflow';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as path from 'path';
import * as cors from 'cors';

import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

export class App {
    public static readonly PORT:number = 3000;
    private app: express.Application;
    private server: any;
    private io: SocketIO.Server;

    constructor() {
        this.createApp();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.static(path.join(__dirname, '../dist/app')));

        this.app.get('/', (_req, res) => {
            res.sendfile('../dist/app/index.html');
        });
        this.app.get('/test', function(_req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ results: true }));
        });
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(App.PORT, () => {
            console.log('Running server on port %s', App.PORT);
        });
        let me = this;

        this.io.on('connect', (client: any) => {
            console.log(`Client connected [id=${client.id}]`);
            me.io.emit('setup', `Client connected [id=${client.id}]`);

            client.on('meta', (_meta: any) => {
                console.log('Connected client on port %s.', App.PORT);
                //dialogflow.setupDialogflow(meta);
            });

            client.on('message', (stream: any, herz: number) => {
                console.log(herz);
                console.log(stream);
                // start streaming from client app to dialogflow
                // dialogflow.prepareStream(stream, function(audioBuffer: any){
                    // sending to individual socketid (private message)
                    // client.emit('broadcast', audioBuffer);
                    // dialogflow.detectStreamCall.end();
                // });
                // dialogflow.createAudioFile(stream);
            });
            client.on('stop', () => {
                console.log('finalize stream');
                // stop the client stream, and start detecting
                // dialogflow.finalizeStream();
                // dialogflow.detectIntent(function(audioBuffer: any){
                    // sending to individual socketid (private message)
                    // client.emit('broadcast', audioBuffer);
                //});
            });

            client.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}

export let app = new App();
