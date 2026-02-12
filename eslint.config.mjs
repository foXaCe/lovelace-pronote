import tseslint from 'typescript-eslint';

export default tseslint.config(
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.{ts,js}'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
    },
);
