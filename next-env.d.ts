/// <reference types="next" />
/// <reference types="next/types/global" />

/// <reference types="next-images" />

declare module 'worker-loader!*' {
  export default class WebpackWorker extends Worker {
    constructor()
  }
}
