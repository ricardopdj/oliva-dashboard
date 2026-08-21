export {};

declare global {
  interface SpeechRecognitionConstructor {
    new (): SpeechRecognition;
  }

  // lib.dom.d.ts already ships SpeechRecognitionEvent, SpeechRecognitionErrorEvent,
  // SpeechRecognitionResult(List), SpeechRecognitionAlternative and SpeechRecognitionErrorCode —
  // only the recognizer interface itself and the Window hookup are missing.
  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
    onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  }

  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}
