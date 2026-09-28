import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Liste todas as suas outras páginas abaixo seguindo o modelo:
        lista: resolve(__dirname, 'lista.html'),
        contato: resolve(__dirname, 'contato.html'),
        // Se tiver mais páginas, adicione aqui (ex: produtos: resolve(__dirname, 'produtos.html'))
      },
    },
  },
});
