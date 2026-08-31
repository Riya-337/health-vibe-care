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

const targets = ['dist', 'dist/client', 'public', '.output/public'];

for (const dir of targets) {
  fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(path.join(dir, 'index.html'))) {
    fs.writeFileSync(
      path.join(dir, 'index.html'),
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HealthVibe Care</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`
    );
  }
}

if (fs.existsSync('.output/public')) {
  copyDir('.output/public', 'public');
  copyDir('.output/public', 'dist');
  copyDir('.output/public', 'dist/client');
}
