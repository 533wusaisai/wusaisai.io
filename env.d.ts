/// <reference types="vite/client" />

// env.d.ts
interface ImportMeta {
  glob<Module = any>(
    pattern: string, 
    options?: { 
      eager?: boolean;
      import?: string;
      query?: string | Record<string, string>;
    }
  ): Record<string, () => Promise<Module>>;
}