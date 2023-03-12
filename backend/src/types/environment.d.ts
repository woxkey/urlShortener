declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_CONN_STRING: string;
      DB_NAME: string;
      LINKS_COLLECTION_NAME: string;
      BASE_URL: string;
    }
  }
}

export {};
