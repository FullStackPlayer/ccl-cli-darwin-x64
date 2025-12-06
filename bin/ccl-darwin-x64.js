#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// 获取实际的 ccl 二进制文件路径
const binaryPath = path.join(__dirname, 'ccl');

// 检查二进制文件是否存在
if (!fs.existsSync(binaryPath)) {
  console.error('Error: ccl binary not found.');
  console.error('Please try reinstalling the package: npm install -g ccl-cli-darwin-x64');
  process.exit(1);
}

// 检查二进制文件是否有执行权限
try {
  fs.accessSync(binaryPath, fs.constants.X_OK);
} catch (err) {
  console.error('Error: ccl binary is not executable.');
  console.error('Please try reinstalling the package: npm install -g ccl-cli-darwin-x64');
  process.exit(1);
}

// 将所有参数传递给实际的 ccl 二进制文件
const args = process.argv.slice(2);
const child = spawn(binaryPath, args, {
  stdio: 'inherit',
  env: process.env
});

// 处理子进程退出
child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code || 0);
  }
});

// 处理错误
child.on('error', (err) => {
  console.error('Error executing ccl:', err.message);
  process.exit(1);
});
