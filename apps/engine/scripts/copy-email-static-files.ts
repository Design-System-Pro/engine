import * as fs from 'fs-extra';
import * as path from 'path';
import * as url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = '../../..';
const emailDir = '/packages/email/src/templates/static';
const engineDir = '/apps/engine/public/static/email';

const staticSrcDir = path.join(__dirname, `${rootDir}${emailDir}`);
const staticDestDir = path.join(__dirname, `${rootDir}${engineDir}`);

async function copyStaticFiles() {
  try {
    await fs.ensureDir(staticDestDir);
    await fs.copy(staticSrcDir, staticDestDir);
    console.log(`
        ✨ Email static files copied successfully.
        📄 Summary:
        ${emailDir} ➡️  ${engineDir}
      `);
  } catch (err) {
    console.error('💥 Error copying email static files:', err);
  }
}

async function main() {
  await copyStaticFiles();
}

main();
