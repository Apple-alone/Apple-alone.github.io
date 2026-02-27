<<<<<<< HEAD
import postcssImport from 'postcss-import';
import postcssNesting from 'tailwindcss/nesting/index.js';
import tailwindcss from 'tailwindcss';
=======
// PostCSS config for CSS imports
// Tailwind v4 is handled by @tailwindcss/vite plugin in astro.config.mjs
import postcssImport from 'postcss-import';
>>>>>>> upstream/main


export default {
    plugins: {
<<<<<<< HEAD
        'postcss-import': postcssImport, // to combine multiple css files
        'tailwindcss/nesting': postcssNesting,
        tailwindcss: tailwindcss,
=======
        'postcss-import': postcssImport,
>>>>>>> upstream/main
    }
};