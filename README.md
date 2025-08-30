# ccl-cli-darwin-x64

适用于 darwin-x64 架构（Intel Mac）的 ccl-cli 包。

## 描述

此软件包为 macOS 上的 x64 架构（Intel 芯片）专门编译的 ccl 命令行工具。

## 安装

### 使用 npm 安装（推荐）

```bash
npm install -g ccl-cli-darwin-x64
```

## 使用方法

安装完成后，您可以使用 `ccl-darwin-x64` 命令：

```bash
# 显示版本
ccl-darwin-x64 --version

# 显示帮助信息
ccl-darwin-x64 --help
```

注意：命令名称是 `ccl-darwin-x64`，而不是 `ccl`，这样可以明确表示此二进制文件是为特定架构编译的。如果你想要直接使用 `ccl` 命令，请全局安装 `ccl-cli` 包。

## 架构

此软件包专门为以下架构构建：
- 操作系统：darwin（macOS）
- CPU：x64（Intel）

它将无法在其他架构或操作系统上工作。

## 发布说明

此 npm 包使用以下文件控制策略：
- `bin/` 目录：作为空目录包含在包中，用于存放解压后的二进制文件
- `zip/` 目录：包含实际的 ccl.zip 文件，用于安装时解压
- `postinstall.js`：安装后脚本，负责解压二进制文件并设置权限
- 使用 `.npmignore` 和 `package.json` 中的 `files` 字段来精确控制包含的文件

## 许可证

MIT