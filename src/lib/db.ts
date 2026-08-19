import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { BriefingFormState } from "../state/types";

const DB_NAME = "oliva-briefing";
const DB_VERSION = 1;
const DRAFT_STORE = "draft";
const AUDIO_STORE = "audio";
const DRAFT_KEY = "current";

interface OlivaBriefingDB extends DBSchema {
  [DRAFT_STORE]: {
    key: string;
    value: BriefingFormState;
  };
  [AUDIO_STORE]: {
    key: string;
    value: Blob;
  };
}

let dbPromise: Promise<IDBPDatabase<OlivaBriefingDB>> | null = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<OlivaBriefingDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(DRAFT_STORE)) db.createObjectStore(DRAFT_STORE);
        if (!db.objectStoreNames.contains(AUDIO_STORE)) db.createObjectStore(AUDIO_STORE);
      },
    });
  }
  return dbPromise;
}

export async function loadDraft(): Promise<BriefingFormState | undefined> {
  try {
    const db = await getDb();
    return await db.get(DRAFT_STORE, DRAFT_KEY);
  } catch {
    return undefined;
  }
}

export async function saveDraft(state: BriefingFormState): Promise<void> {
  try {
    const db = await getDb();
    await db.put(DRAFT_STORE, state, DRAFT_KEY);
  } catch {
    /* IndexedDB unavailable — draft just won't persist across reloads */
  }
}

export async function loadAllAudioBlobs(): Promise<Record<string, Blob>> {
  try {
    const db = await getDb();
    const keys = await db.getAllKeys(AUDIO_STORE);
    const values = await db.getAll(AUDIO_STORE);
    const result: Record<string, Blob> = {};
    keys.forEach((key, i) => { result[key] = values[i]; });
    return result;
  } catch {
    return {};
  }
}

export async function saveAudioBlob(qid: string, blob: Blob): Promise<void> {
  try {
    const db = await getDb();
    await db.put(AUDIO_STORE, blob, qid);
  } catch {
    /* IndexedDB unavailable — audio just won't persist across reloads */
  }
}

export async function deleteAudioBlob(qid: string): Promise<void> {
  try {
    const db = await getDb();
    await db.delete(AUDIO_STORE, qid);
  } catch {
    /* no-op */
  }
}

export async function clearAll(): Promise<void> {
  try {
    const db = await getDb();
    await db.clear(DRAFT_STORE);
    await db.clear(AUDIO_STORE);
  } catch {
    /* no-op */
  }
}
