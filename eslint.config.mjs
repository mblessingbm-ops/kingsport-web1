import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

// Next 16 removed `next lint`; `npm run lint` is the ESLint CLI with the one preset
// the old .eslintrc.json extended.
export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    // New in Next 16's preset and not yet adopted here: it flags seven effects that
    // set state. Off so lint checks what it checked on Next 14; adopting it is its
    // own task (the Next 16 upgrade, 2026-10-08).
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
