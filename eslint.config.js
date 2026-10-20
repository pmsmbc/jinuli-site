import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

// FSD 의존 방향: app → pages → widgets → features → entities → shared. 아래 레이어는 위 레이어를 import 하지 못한다.
const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];
const zones = layers.flatMap((from, i) =>
  layers.slice(0, i).map((higher) => ({
    target: `./src/${from}`,
    from: `./src/${higher}`,
    message: `FSD 위반: ${from} 은 ${higher} 를 import 할 수 없다`,
  })),
);

export default tseslint.config(
  { ignores: ['dist', 'dist-ssr', 'node_modules', 'docs'] },
  { files: ['scripts/**/*.mjs', 'vite.config.ts'], languageOptions: { globals: { console: 'readonly', process: 'readonly', URL: 'readonly', window: 'readonly', document: 'readonly', getComputedStyle: 'readonly' } } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks, import: importPlugin },
    settings: {
      'import/resolver': { typescript: { project: './tsconfig.json' } },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'import/no-restricted-paths': ['error', { zones }],
      // 슬라이스 밖에서는 index.ts(배럴)로만 접근한다. shared 는 세그먼트 단위(@shared/ui/krds) 접근을 허용한다.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@pages/*/*', '@widgets/*/*', '@features/*/*', '@entities/*/*'], message: 'FSD 위반: 슬라이스는 index.ts 로만 import 한다' },
            { group: ['@app/*'], message: 'FSD 위반: app 레이어는 아무도 import 하지 않는다' },
          ],
        },
      ],
    },
  },
);
