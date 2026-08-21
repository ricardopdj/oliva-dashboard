export function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | undefined {
  return window.SpeechRecognition ?? window.webkitSpeechRecognition;
}

// Evaluated once at module load — browser support doesn't change mid-session.
export const SPEECH_RECOGNITION_SUPPORTED: boolean = !!getSpeechRecognitionCtor();
