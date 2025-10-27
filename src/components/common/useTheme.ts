// src/composables/useTheme.ts
import { inject } from 'vue'
import type { Ref } from 'vue'

export interface ThemeContext {
  isDarkMode: Ref<boolean>
  toggleTheme: () => void
}

export function useTheme() {
  const theme = inject<ThemeContext>('theme')
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return theme
}
