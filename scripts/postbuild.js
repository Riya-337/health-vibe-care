import fs from 'fs';
import path from 'path';

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

let mainJs = '';
let mainCss = '';

const assetsDir = '.output/public/assets';
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  for (const f of files) {
    if (f.startsWith('index-') && f.endsWith('.js') && f.length > mainJs.length) {
      mainJs = f;
    }
    if (f.endsWith('.css')) {
      mainCss = f;
    }
  }
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HealthVibe Care — Hospital EHR & Smart Motor Sentinel</title>
    <link rel="icon" type="image/png" href="/rv-logo-new.png" />
    ${mainCss ? `<link rel="stylesheet" href="/assets/${mainCss}" />` : ''}
  </head>
  <body class="bg-background text-foreground antialiased">
    <div id="root"></div>
    ${mainJs ? `<script type="module" src="/assets/${mainJs}"></script>` : ''}
  </body>
</html>`;

const targets = ['dist', 'dist/client', 'public', '.output/public'];

for (const dir of targets) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), htmlContent);
}

if (fs.existsSync('.output/public')) {
  copyDir('.output/public', 'public');
  copyDir('.output/public', 'dist');
  copyDir('.output/public', 'dist/client');
}
