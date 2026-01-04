import {defineConfig} from 'vite'
import {resolve, dirname} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    base: '/HardwareLizard-webshop/',
    preview: {
        open: '/HardwareLizard-webshop/',
    },
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),

                'accessibility': resolve(__dirname, 'src/pages/accessibility/accessibility.html'),
                'legal-notice': resolve(__dirname, 'src/pages/legal-notice/legal-notice.html'),
                'data-privacy': resolve(__dirname, 'src/pages/data-privacy/data-privacy.html'),
                'license': resolve(__dirname, 'src/pages/license/license.html'),
                'about-us': resolve(__dirname, 'src/pages/about-us/about-us.html'),
                'more-info': resolve(__dirname, 'src/pages/more-info/more-info.html'),
                'trademark-search': resolve(__dirname, 'src/pages/trademark-search/trademark-search.html'),
                'copyright': resolve(__dirname, 'src/pages/copyright/copyright.html'),
                'contact': resolve(__dirname, 'src/pages/contact/contact.html'),
            },
        },
    },
})