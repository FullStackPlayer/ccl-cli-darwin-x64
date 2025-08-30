#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

// 确保 bin 目录存在
const binDir = path.join(__dirname, 'bin');
if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

// 解压 zip 文件
const zipPath = path.join(__dirname, 'zip', 'ccl.zip');
const zip = new AdmZip(zipPath);

try {
  console.log('Extracting ccl binary...');
  zip.extractAllTo(binDir, true);
  
  // 清理 macOS 自动创建的 __MACOSX 目录
  const macOsDir = path.join(binDir, '__MACOSX');
  if (fs.existsSync(macOsDir)) {
    fs.rmSync(macOsDir, { recursive: true, force: true });
  }
  
  // 设置可执行权限
  const cclPath = path.join(binDir, 'ccl');
  if (fs.existsSync(cclPath)) {
    fs.chmodSync(cclPath, 0o755);
    console.log('ccl binary extracted and permissions set successfully!');
  } else {
    console.error('Error: ccl binary not found in zip file');
    process.exit(1);
  }
} catch (error) {
  console.error('Error extracting zip file:', error.message);
  process.exit(1);
}