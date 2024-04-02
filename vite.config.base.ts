import react from '@vitejs/plugin-react';
import path from 'path';
import { PluginOption, UserConfig } from 'vite';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export const getBaseViteConfig = (name: string): UserConfig => ({
  plugins: [react(), peerDepsExternal() as PluginOption],
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    'process.env.REACT_APP_API_URL': `'${process.env.REACT_APP_API_URL}'`,
  },
  resolve: {
    alias: {
      // global depenency packages go here (like a utils package)
    },
  },
  server: {
    open: true,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, `packages/${name}/src/index.ts`),
      name: `@cofi/${name}`,
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    copyPublicDir: false,
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
      },
      output: {
        interop: 'auto',
      },
    },
  },
});
