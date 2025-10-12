/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT?: string
  readonly VITE_DEV_DOMAIN?: string
  readonly VITE_DEV_NAME?: string
  readonly VITE_PROD_DOMAIN?: string
  readonly VITE_PROD_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
