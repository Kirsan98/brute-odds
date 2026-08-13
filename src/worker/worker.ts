import { handleRequest, type WorkerRequest } from './protocol.js';

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  self.postMessage(handleRequest(event.data));
};
