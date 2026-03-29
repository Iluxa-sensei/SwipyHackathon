/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_OPENAI_API_KEY?: string;
    NEXT_PUBLIC_OPENAI_MODEL?: string;
    NEXT_PUBLIC_ELEVENLABS_API_KEY?: string;
    NEXT_PUBLIC_ELEVENLABS_VOICE_ID?: string;
  }
}
