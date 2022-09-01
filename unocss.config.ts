import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['scale', 'hover:scale-110 hover:transition-all duration-200 ease-in-out'],
    ['cp', 'cursor-pointer'],
    ['rf', 'rounded-full'],
    ['r', 'rounded'],
    ['r-lg', 'rounded-lg'],
    ['r-md', 'rounded-md'],
    ['r-sm', 'rounded-sm'],
    ['r-none', 'rounded-none'],
    ['col', 'flex flex-col'],
    ['row', 'flex flex-row'],
    ['center', 'items-center justify-center'],
    ['start', 'items-start justify-start'],
    ['end', 'items-end justify-end'],
    ['tr', 'top-0 right-0'],
    ['br', 'bottom-0 right-0'],
    ['bl', 'bottom-0 left-0'],
    ['tl', 'top-0 left-0'],
    ['sh-sm', 'shadow-sm'],
    ['sh-md', 'shadow-md'],
    ['sh-lg', 'shadow-lg'],
    ['sh-xl', 'shadow-xl'],
    ['sh-2xl', 'shadow-2xl'],
    ['scale', 'hover:scale-110 hover:transition-all duration-200 ease-in-out'],
    ['grid2', 'grid grid-cols-2'],
    ['grid3', 'grid grid-cols-3'],
    ['grid4', 'grid grid-cols-4'],
    ['grid5', 'grid grid-cols-5'],
    ['grid6', 'grid grid-cols-6'],
    ['btn-post', 'bg-secondary text-light hover:bg-accent hover:text-success hover:shadow-success r cp scale shadow-md px-4 py-2'],
    ['btn-get', 'bg-primary text-light  hover:bg-success hover:text-secondary cp hover:shadow-light shadow-md px-4 py-2'],
    ['btn-del', 'bg-danger text-white hover:bg-warning hover:text-white hover:shadow-danger shadow-md px-2 py-1'],
    ['btn-circle', 'rf p-1 m-1 cp scale'],
    ['text-menu', 'text-xs text-center dark:text-white text-accent p-1'],
    ['slide-up', 'animate-slide-in-up animate-duration-300'],
    ['slide-down', 'animate-slide-in-down animate-duration-300'],
    ['slide-left', 'animate-slide-in-left animate-duration-300'],
    ['slide-right', 'animate-slide-in-right animate-duration-300'],
    ['fade-in', 'animate-fade-in animate-duration-300'],
    ['fade-in-up', 'animate-fade-in-up animate-duration-300'],
    ['fade-in-down', 'animate-fade-in-down animate-duration-300'],
    ['fade-in-left', 'animate-fade-in-left animate-duration-300'],
    ['fade-in-right', 'animate-fade-in-right animate-duration-300'],
    ['no-outline', 'outline-none focus:outline-none hover:outline-none'],
    
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'Ubuntu Mono',
        script: 'Merienda',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
  theme: {
    colors: {
      primary: '#1cead3',
      secondary: '#2c5cc0',
      accent: '#061468',
      success: '#07fe11',
      warning: '#FF8B8B',
      danger: '#FF1818',
      info: '#111322',
      light: '#ffffff',
    },

  },
  rules: [
    [
      /^x(\d+)$/, ([, d]) => ({
        height: `${d}em`,
        width: `${d}em`,
      }),
    ],
    [/^[bg|border|color|fill|outline|shadow|text]-(.*)$/, ([, attr, color], { theme }) => {
      if (color in theme.colors) {
        switch (attr) {
          case 'bg':
            return {
              backgroundColor: theme.colors[color]
            }
          case 'border':
            return {
              borderColor: theme.colors[color]
            }
          case 'color':
            return {
              color: theme.colors[color]
            }
          case 'fill':
            return {
              fill: theme.colors[color]
            }
          case 'outline':
            return {
              outlineColor: theme.colors[color]
            }
          case 'shadow':
            return {
              shadowColor: theme.colors[color]
            }
          case 'text':
            return {
              color: theme.colors[color]
            }
        }
      }
    }]
  ]
})

