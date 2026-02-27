---
title: '使用Github Action'

published: 2025-08-15T03:00:00+08:00
tags: [教程]
author: Applesaber
---

# 什么是Github Action

GitHub Actions 是 GitHub 提供的持续集成和持续（CI/CD）交付平台

可以自动化构建、测试和部署流程，为编译测试提供了一些方便（比如又大又慢的臭Java）

其中术语了解一下：
* `Workflow (工作流)`: 一个可配置的自动化流程，由 YAML 文件定义
* `Job (作业)`: 工作流中的一组步骤，在同一个运行器上执行
* `Step (步骤)`: 可以运行命令或执行动作的任务单元，这步骤可以是
    - Shell 命令（RUN）
    - 调用预定义动作（USES）
    - 自定义脚本
* `Action`: 可重复使用的代码单元，可通过 [GitHub Marketplace](https://github.com/marketplace) 获取现成动作
* `Runner (运行器)`: 执行工作流的服务器，可以是 GitHub 托管的或自托管的

Workflow文件存在仓库的 `.github/workflows/` 路径下，文件后缀一般为 `.yaml` 或 `.yml`

文件结构示意
```
Project/
├── .github/
│   └── workflows/
│       ├── ci.yml      # 持续集成工作流
│       └── deploy.yml  # 部署工作流
└── src/
```

# 创建第一个工作流
我以一份 [.NET C#的项目](https://github.com/Apple-alone/PerformaiConfigEditor) 来演示
1. 在仓库中创建 `.github/workflows` 目录
2. 在该目录下创建 `dotnet-desktop.yaml` 文件 （文件名随意，后缀必须为 `yml` 或者 `yaml`）
3. 添加内容：
    * 添加基本信息
    ```yaml
    name: .NET Core Desktop
    on:
    push:
        branches: [ "master" ]
    pull_request:
        branches: [ "master" ]
    ```
    解析：
    ```
    1.工作流名称：".NET Core Desktop"

    2.触发条件：推送到 master 分支或创建针对 master 分支的 PR 时触发
    ```
    * 作业配置
    ```yaml
    jobs:
      build:
        strategy:
          matrix:
            configuration: [Debug, Release]
        runs-on: windows-latest
        env:
          Solution_Name: your-solution-name #  解决方案名称(.sln)
          Test_Project_Path: your-test-project-path #  指定测试项目的路径
          Wap_Project_Directory: your-wap-project-directory-name #  指定Windows应用程序打包项目(WAP)的目录
          Wap_Project_Path: your-wap-project-path #  指定.wapproj文件的完整路径
    ```
    解析
    ```
    1.使用矩阵策略构建 Debug 和 Release 配置
    2.运行环境：Windows 最新版
    3.环境变量定义了解方案和项目路径
    ```
4. 设置任务单元
* 基础设置
```yaml
steps:
- name: Checkout
  uses: actions/checkout@v4
  with:
    fetch-depth: 0  # 获取完整历史记录，对某些版本工具可能需要

- name: Install .NET Core
  uses: actions/setup-dotnet@v4
  with:
    dotnet-version: |
      8.0.x
      7.0.x  # 可添加多个.NET版本支持
```
* 构建和测试
```yaml
- name: Setup MSBuild.exe
  uses: microsoft/setup-msbuild@v2

- name: Restore NuGet packages
  run: dotnet restore $env:Solution_Name

- name: Build solution
  run: dotnet build $env:Solution_Name --configuration ${{ matrix.configuration }} --no-restore

- name: Run unit tests
  run: dotnet test $env:Test_Project_Path --configuration ${{ matrix.configuration }} --no-build --verbosity normal
```
* 上传Release
```yaml
- name: Upload MSIX package
  uses: actions/upload-artifact@v4
  with:
    name: MSIX-Package-${{ matrix.configuration }}
    path: ${{ env.Wap_Project_Directory }}\AppPackages
    retention-days: 7  # 设置Release保留天数

- name: Upload symbols
  if: matrix.configuration == 'Release'
  uses: actions/upload-artifact@v4
  with:
    name: Symbols-${{ matrix.configuration }}
    path: ${{ env.Wap_Project_Directory }}\**\*.pdb
```
5. 完整工作流
```yaml
name: .NET Core Desktop CI/CD

on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

env:
  DOTNET_VERSION: '8.0.x'
  Solution_Name: YourSolution.sln
  Test_Project_Path: tests\YourTests.csproj
  Wap_Project_Directory: src\YourApp.Package
  Wap_Project_Path: src\YourApp.Package\YourApp.Package.wapproj

jobs:
  build:
    strategy:
      matrix:
        configuration: [Debug, Release]
    runs-on: windows-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0

    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: ${{ env.DOTNET_VERSION }}

    - name: Setup MSBuild
      uses: microsoft/setup-msbuild@v2

    - name: Restore dependencies
      run: dotnet restore ${{ env.Solution_Name }}

    - name: Build solution
      run: dotnet build ${{ env.Solution_Name }} --configuration ${{ matrix.configuration }} --no-restore

    - name: Run tests
      run: dotnet test ${{ env.Test_Project_Path }} --configuration ${{ matrix.configuration }} --no-build --verbosity normal

    - name: Decode signing certificate
      if: matrix.configuration == 'Release'
      run: |
        $pfx_cert_byte = [System.Convert]::FromBase64String("${{ secrets.Base64_Encoded_Pfx }}")
        $certificatePath = Join-Path -Path ${{ env.Wap_Project_Directory }} -ChildPath GitHubActionsWorkflow.pfx
        [IO.File]::WriteAllBytes("$certificatePath", $pfx_cert_byte)

    - name: Create app package
      run: |
        msbuild ${{ env.Wap_Project_Path }} `
          /p:Configuration=${{ matrix.configuration }} `
          /p:UapAppxPackageBuildMode=StoreUpload `
          /p:AppxBundle=Always `
          /p:AppxBundlePlatforms="x86|x64" `
          /p:PackageCertificateKeyFile=GitHubActionsWorkflow.pfx `
          /p:PackageCertificatePassword="${{ secrets.Pfx_Key }}"

    - name: Cleanup certificate
      if: matrix.configuration == 'Release'
      run: Remove-Item -path ${{ env.Wap_Project_Directory }}\GitHubActionsWorkflow.pfx -Force

    - name: Upload artifacts
      uses: actions/upload-artifact@v4
      with:
        name: AppPackage-${{ matrix.configuration }}
        path: ${{ env.Wap_Project_Directory }}\AppPackages
        retention-days: 7
```
`注：工作流也可以在Github Action 创建编辑`
# 进阶
1. 密钥管理
```yaml
- name: 安全部署应用
  env:
    API_TOKEN: ${{ secrets.API_KEY }}  # 使用仓库存储的机密凭证
  run: |
    curl -H "Authorization: Bearer $API_TOKEN" ...
```
2. 使用 `act` 本地测试: 安装 [act](https://github.com/nektos/act) 在本地运行工作流

# 相关文档
1. [官方文档](https://docs.github.com/en/actions)
2. [阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
