import {defineConfig} from 'vite'
import {resolve, dirname} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    base: '/HardwareLizard-webshop/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                accessibility: resolve(__dirname, 'src/pages/accessibility/accessibility.html'),
                legalNotice: resolve(__dirname, 'src/pages/legal-notice/legal-notice.html'),
                dataPrivacy: resolve(__dirname, 'src/pages/data-privacy/data-privacy.html'),
                license: resolve(__dirname, 'src/pages/license/license.html'),
                aboutUs: resolve(__dirname, 'src/pages/about-us/about-us.html'),
                moreInfo: resolve(__dirname, 'src/pages/more-info/more-info.html'),
            },
        },
    },
})