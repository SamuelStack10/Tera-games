import { defineConfig } from 'vite';
import { resolve, relative, extname } from 'path';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Procura todos os arquivos .html no projeto, ignorando a pasta node_modules
const htmlFiles = globSync('**/*.html', {
  ignore: ['node_modules/**', 'dist/**']
});

// Transforma a lista de arquivos no formato que o Vite precisa
const inputEntries = {};
htmlFiles.forEach(file => {
  // Cria uma chave única baseada no caminho do arquivo (ex: "paginas/sobre")
  const key = relative(__dirname, file).replace(extname(file), '');
  inputEntries[key] = resolve(__dirname, file);
});

export default defineConfig({
  build: {
    rollupOptions: {
      input: inputEntries,
    },
  },
});

