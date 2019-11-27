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

import * as dotenv from 'dotenv';
import * as df from 'dialogflow';
import * as uuid from 'uuid';

// import * as fs from 'fs';
// import * as pump from 'pump';
// import * as through2 from 'through2';

/*
const wav = require('wav');
*/

dotenv.config();

export class Dialogflow {
    private projectId: string;
    private sessionClient: any;
    private sessionPath: any;
    private sessionId: string;
    private languageCode: string;
    private encoding: string;
    private sampleRateHertz: Number;
    private singleUtterance: Boolean;

    /*
    private fileWriter: any;
    private isInitialRequest: Boolean;
    public detectStreamCall: any;*/

    constructor() {
        this.languageCode = process.env.LANGUAGE_CODE;
        this.projectId = process.env.PROJECT_ID;
        this.encoding = process.env.ENCODING;
        this.singleUtterance = (process.env.SINGLE_UTTERANCE == 'true')
        this.isInitialRequest = true;
        this.detectStreamCall = null;
    }*/

    /*
     * Setup the Dialogflow Agent
     *
    public setupDialogflow(meta: any) {
        this.sessionId = uuid.v4();
        this.sessionClient = new df.v2beta1.SessionsClient();
        this.sessionPath = this.sessionClient.sessionPath(
            this.projectId, this.sessionId);

        this.sampleRateHertz = meta.sampleHerz;

        this.fileWriter = new wav.FileWriter(
          'temp/' + this.sessionId + '.wav', {
            channels: meta.channels,
            sampleRate: this.sampleRateHertz,
            bitDepth: 16
        });

    }

    public createAudioFile(audio: any) {
        // create a wav file
        this.fileWriter.write(audio);
    }

    public async detectIntent(cb:Function) {
      // Read the content of the audio file and send it
      // as part of the request.
      const inputAudio = fs.createReadStream('temp/' + this.sessionId + '.wav');
      console.log(inputAudio);
      const request = {
        session: this.sessionPath,
        queryInput: {
          audioConfig: {
            sampleRateHertz: this.sampleRateHertz,
            audioEncoding: this.encoding,
            languageCode: this.languageCode,
          },
        },
        inputAudio: inputAudio,
        outputAudioConfig: {
          audioEncoding: 'OUTPUT_AUDIO_ENCODING_LINEAR_16',
          sampleRateHertz: 48000,
          synthesizeSpeechConfig: {
            voice: {
              ssmlGender: 'SSML_VOICE_GENDER_FEMALE'
            },
            speakingRate: 1.5,
            pitch: 7
          }
        }
      };

      // Recognizes the speech in the audio and detects its intent.
      const [response] = await this.sessionClient.detectIntent(request);

      console.log(response);

      cb(response);
    }*/

    /*
     * Detect Intent based on Audio Stream
     * @param audio
     * @param cb Callback function to send results
     *
    public prepareStream(audio: any, cb:Function){
      const initialStreamRequest = {
        session: this.sessionPath,
        queryParams: {
          session: this.sessionClient.sessionPath(
              this.projectId, this.sessionId),
        },
        queryInput: {
          audioConfig: {
            sampleRateHertz: this.sampleRateHertz,
            audioEncoding: this.encoding,
            languageCode: this.languageCode,
          },
          singleUtterance: this.singleUtterance
        },
        outputAudioConfig: {
          audioEncoding: 'OUTPUT_AUDIO_ENCODING_LINEAR_16',
          sampleRateHertz: 48000,
          synthesizeSpeechConfig: {
            voice: {
              ssmlGender: 'SSML_VOICE_GENDER_FEMALE'
            },
            speakingRate: 1.5,
            pitch: 7
          }
        }
      };

      // Create a stream for the streaming request.
      this.detectStreamCall = this.sessionClient
      .streamingDetectIntent()
        .on('error', (e: any) => {
          console.log(e);
        }).on('data', (data: any) => {
          if (data.recognitionResult) {
            console.log(
              `Intermediate transcript:
              ${data.recognitionResult.transcript}`
            );
          } else {
              console.log(`Detected intent:`);
              console.log(data.outputAudio);
              cb(data.outputAudio);
          }
        }).on('end', () => {
          console.log('on end');
        });
        
        // Write the initial stream request to config for audio input.
        if(this.isInitialRequest) {
          this.detectStreamCall.write(initialStreamRequest);
        }

        // create a wav file
        this.fileWriter.write(audio);
    }*/

    /*
     * When Streaming stops, remove the temp wav file.
     *
    public finalizeStream() {

      // start streaming the contents of the wav file
      // to the Dialogflow Streaming API
      pump(
        fs.createReadStream('temp/' + this.sessionId + '.wav'),
        // Format the audio stream into the request format.
        through2.obj((obj:any, _:any, next:any) => {
          next(null, {inputAudio: obj});
        }),
        this.detectStreamCall
      );

      fs.unlink('temp/' + this.sessionId + '.wav', (err) => {
        if (err) throw console.log(err);
        console.log('Audio file was deleted');
      });
    }*/
}

export let dialogflow = new Dialogflow();
