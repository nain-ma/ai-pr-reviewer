# QLJ - AI PR Reviewer

基于人工智能的代码审查工具，利用大型语言模型自动分析 pull request 并提供专业的代码评审意见。

## 功能特点

- **自动代码审查**：分析 PR 中的代码变更，提出改进建议
- **代码质量评估**：检查逻辑、安全性、性能、错误处理等多个方面
- **PR 内容总结**：生成简洁明了的 PR 内容概述
- **支持多种语言**：可根据需求配置响应语言
- **高度定制化**：灵活的系统提示和过滤器设置

## 工作原理

该工具作为GitHub Action运行，当有新的PR创建或更新时，它会：

1. 获取PR中的代码变更
2. 逐文件分析代码修改
3. 使用AI模型评审代码质量
4. 生成审查评论和总结
5. 将结果作为评论发布到PR上

## 安装配置

### 环境要求

- GitHub仓库权限
- Dify API密钥

### 配置步骤

1. **创建GitHub Action工作流文件**

   在你的仓库中创建`.github/workflows/ai-pr-reviewer.yml`文件：

   ```yaml
   name: AI PR Reviewer
   
   on:
     pull_request:
       types: [opened, synchronize, reopened]
   
   jobs:
     review:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
           with:
             fetch-depth: 0
         - name: AI PR Reviewer
           uses: qiliangjia/ai-pr-reviewer@main
           env:
             DIFY_API_KEY: ${{ secrets.DIFY_API_KEY }}
           with:
             debug: "false"
             review_simple_changes: "true"
             review_comment_lgtm: "false"
             path_filters: |
               !dist/**
               !node_modules/**
             language: "zh-CN"  # 设置为中文响应
   ```

2. **配置Dify API**

   - 在你的GitHub仓库设置中添加`DIFY_API_KEY`作为密钥
   - 确保你的Dify API有足够的权限和配额

## 接入自定义API

如果你想使用自己的AI服务而不是默认的OpenAI，可以按照以下步骤进行配置：

## 配置选项

| 选项 | 描述 | 默认值 |
|------|------|--------|
| `debug` | 启用调试模式 | false |
| `max_files` | 要审查的最大文件数 | 150 |
| `review_simple_changes` | 是否审查简单更改 | false |
| `path_filters` | 路径过滤器 | 见action.yml |
| `language` | 响应语言的ISO代码 | en-US |
| `system_message` | 发送给AI模型的系统消息 | 见action.yml |

## 问题排查

如果遇到以下问题，可尝试以下解决方法：

1. **API调用失败**：检查API密钥是否正确设置
2. **评论缺失**：确保GitHub Action有正确的权限
3. **审查不完整**：调整`max_files`和`openai_timeout_ms`参数

