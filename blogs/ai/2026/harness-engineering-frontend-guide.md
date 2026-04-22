---
title: Harness Engineering：前端 AI 驱动的工程化实践完全指南
date: 2026-04-22
categories:
 - AI学习
 - AI编程
tags:
 - harness
---

> 当 AI 能编写代码时，我们面临的挑战不再是"如何写代码"，而是"如何让 AI 按照正确的意图写代码"。Harness Engineering 提供了一套结构化的方法论，将需求、设计、实现、验证串联成可追溯、可迭代的工程流程。

---

## 引言：从"手工编写"到"意图驱动"

2025 年，AI 编程助手已从"实验玩具"进化为"生产工具"。Cursor、Claude Code、GitHub Copilot 等工具能生成可运行的代码，但问题随之而来：

- **意图漂移**：AI 生成的代码偏离需求
- **质量失控**：缺乏系统性验证
- **协作混乱**：多 Agent 并行时职责不清
- **维护困难**：代码与文档脱节

Harness Engineering 的核心理念是：**用结构化文档驱动 AI，实现从需求到代码的精确映射**。它不是简单的"写更好的 Prompt"，而是一套完整的工程化流程，涵盖：

- 需求定义（PRD）
- 技术设计（Spec）
- 任务拆解（Tasks）
- 并行实现（Implementation）
- 自动验证（Validation）
- 迭代优化（Iterate）

本文将从前端开发者的视角，详细阐述如何在真实项目中落地这套流程。

---

## 一、多 Agent 并行架构：从"单兵作战"到"团队协作"

### 1.1 为什么需要多 Agent？

单个 AI Agent 虽然强大，但存在明显局限：

- **上下文窗口有限**：难以同时处理 PRD、设计稿、代码库
- **专业深度不足**：一个 Agent 难以同时精通 UI 设计、状态管理、API 调用
- **并行效率低下**：串行执行导致开发周期长

**多 Agent 架构的核心思想**：按阶段和职责拆分 Agent，每个 Agent 专注于特定领域，通过协作完成复杂任务。

### 1.2 推荐的 5-Agent 架构

```text
┌─────────────┐
│  PRD Agent  │  需求分析、用户故事、优先级排序
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Spec Agent  │  技术设计、架构决策、组件拆分
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Task Agent  │  任务拆解、依赖分析、并行化
└──────┬──────┘
       │
       ├─────────────┬─────────────┬─────────────┐
       ▼             ▼             ▼             ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ UI Agent │  │ API Agent│  │State Agent│ │Test Agent│
└────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘
     │             │             │             │
     └─────────────┴─────────────┴─────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │Review Agent │  代码审查、质量检查
                  └─────────────┘

```

**并行执行策略**：

- **UI Agent**：负责组件实现、样式、响应式布局
- **API Agent**：负责数据请求、错误处理、缓存策略
- **State Agent**：负责状态管理、数据流、副作用处理
- **Test Agent**：负责单元测试、集成测试、E2E 测试

这四个 Agent 可以同时工作，互不阻塞，大幅提升开发效率。

### 1.3 在 Cursor 中启动多 Agent 的三种方法

#### 方法 1：多对话窗口（最简单）

直接开多个 Cursor Chat 窗口：

- 窗口 1：PRD 分析（`@prd.md`）
- 窗口 2：UI 实现（`@spec.md @figma`）
- 窗口 3：API 集成（`@spec.md @api-docs`）

**优点**：零配置，即开即用  
**缺点**：需要手动同步状态，容易遗漏

#### 方法 2：Agent Prompt（推荐）

在同一个对话中，通过 Prompt 切换 Agent 角色：

```markdown
You are now the **UI Agent**.

Context:
- PRD: @docs/prd/user-list.md
- Spec: @specs/user-list.spec.md
- Figma: https://figma.com/file/xxx

Task: Implement the UserListPage component following the spec exactly.
Use design tokens from @styles/tokens.css.

Focus only on UI. Do not implement API logic.

```

```markdown
You are now the **API Agent**.

Context:
- Spec: @specs/user-list.spec.md
- API Docs: @docs/api/users.md

Task: Implement the data fetching logic for UserListPage.
Use React Query with proper error handling and caching.

Focus only on API logic. Do not touch UI components.

```

**优点**：保持上下文连续性，易于管理  
**缺点**：需要显式切换角色

#### 方法 3：MCP 多 Agent（最强）

通过 **Model Context Protocol（MCP）** 实现自动化编排：

```yaml
# mcp-config.yaml
agents:
  - name: ui-agent
    tools:
      - figma-mcp  # 连接 Figma API
      - repo-mcp   # 访问代码仓库
    focus: "UI components and styling"
  
  - name: api-agent
    tools:
      - http-mcp   # 发送 HTTP 请求
      - repo-mcp
    focus: "API integration and data fetching"
  
  - name: test-agent
    tools:
      - playwright-mcp  # E2E 测试
      - repo-mcp
    focus: "Testing and validation"

```

**MCP 的核心价值**（来源：[Anthropic 官方](https://www.anthropic.com/news/model-context-protocol)）：

> “MCP 是 AI 应用程序的 USB-C 接口。就像 USB-C 提供了连接设备的标准方式，MCP 提供了连接 AI 模型与不同数据源和工具的标准方式。”

通过 MCP，Agent 可以：

- 直接读取 Figma 设计稿（`figma-mcp`）
- 操作代码仓库（`repo-mcp`）
- 执行浏览器测试（`playwright-mcp`）
- 访问数据库（`postgres-mcp`）

**优点**：真正的自动化编排，Agent 间无需人工干预  
**缺点**：需要配置 MCP 服务器，学习成本较高

---

## 二、完整 Harness Engineering 流程：七步闭环

### 流程概览

```text
PRD → Spec → Tasks → Implementation → Validation → Review → Iterate

```

每个阶段都有明确的输入、输出和 AI 职责。

---

### 2.1 PRD 阶段（产品需求文档）

**目标**：定义"做什么"，不涉及技术细节

**目录结构**：

```text
/docs/prd/
├── 001-user-list.md
├── 002-user-edit.md
└── 003-permission-management.md

```

**文档模板**：

```markdown
# Feature: User List Page

## Goals
- Display user table with pagination
- Support search by name/email
- Show user status (active/inactive)

## Non-Goals
- Edit user details (separate feature)
- Delete users (separate feature)

## User Stories
- As an admin, I want to view all users in a table
- As an admin, I want to search users by name

## Acceptance Criteria
- ✅ Table shows 10 users per page
- ✅ Search works with partial match
- ✅ Status badge shows correct color

```

**AI 职责**：

- 从用户输入生成结构化 PRD
- 补充遗漏的边界条件
- 排序需求优先级

**推荐工具**：

- **Cursor**：直接对话生成 PRD
- **Notion AI**：协作编辑 PRD
- **Claude**：深度需求分析

**推荐 Skills**：

- `requirement-analysis`
- `user-story-generation`
- `scope-splitting`

**推荐 MCP**：

- `docs-mcp`：访问文档库
- `notion-mcp`：同步 Notion 页面

---

### 2.2 Spec 阶段（技术设计文档）

**目标**：定义"怎么做"，包括技术选型、组件设计、API 接口

**目录结构**：

```text
/specs/
├── coding.spec.md      # 通用编码规范
├── user-list.spec.md   # 功能规格
└── api.spec.md         # API 规格

```

**文档模板**：

```markdown
# Spec: User List Page

## Tech Stack
- Framework: React 18
- UI Library: Ant Design 5
- State Management: React Query
- Styling: Tailwind CSS

## Components
- `UserListPage` (page)
  - `UserSearchForm` (component)
  - `UserTable` (component)
  - `Pagination` (component)

## API Endpoints
GET /api/users
  - Query params: `page`, `pageSize`, `search`
  - Response: `{ users: User[], total: number }`

## State Management
- Use `useQuery` from React Query
- Cache key: `['users', page, search]`
- Stale time: 30s

## File Structure
src/
├── pages/
│   └── UserListPage.tsx
├── components/
│   ├── UserSearchForm.tsx
│   └── UserTable.tsx
└── services/
    └── userService.ts

```

**AI 职责**：

- 根据 PRD 生成技术方案
- 选择合适的技术栈
- 设计组件层次结构
- 定义 API 接口契约

**推荐工具**：

- **Cursor**：`Generate spec from PRD`
- **GitHub Copilot**：辅助技术决策

**推荐 Skills**：

- `architecture-design`
- `frontend-pattern`
- `component-splitting`

**推荐 MCP**：

- `repo-mcp`：访问代码仓库
- `tech-doc-mcp`：技术文档库

---

### 2.3 Tasks 阶段（可执行任务清单）

**目标**：将 Spec 拆解为 AI 可执行的小任务

**目录结构**：

```text
/tasks/
├── user-list.tasks.md
└── user-edit.tasks.md

```

**文档模板**：

```markdown
# Tasks: User List Page

## UI Tasks (assign to UI Agent)
1. Create `UserListPage.tsx` with layout
2. Create `UserSearchForm.tsx` with search input
3. Create `UserTable.tsx` with columns
4. Add pagination controls

## API Tasks (assign to API Agent)
5. Create `userService.ts` with `getUsers` function
6. Add error handling for API failures
7. Implement loading state

## State Tasks (assign to State Agent)
8. Set up React Query provider
9. Create custom hook `useUsers`
10. Implement search debouncing

## Test Tasks (assign to Test Agent)
11. Write unit tests for `UserSearchForm`
12. Write integration tests for `UserListPage`
13. Add E2E test for search flow

```

**关键原则**：

- **原子性**：每个任务独立可完成
- **并行性**：标记哪些任务可同时执行
- **依赖性**：明确任务间的前置关系

**AI 职责**：

- 从 Spec 生成任务清单
- 识别任务间的依赖关系
- 标记可并行执行的任务组

**推荐 Skills**：

- `task-breakdown`
- `dependency-graph`
- `parallelization`

---

### 2.4 Implementation 阶段（多 Agent 并行实现）

**目标**：各个 Agent 并行执行任务

**执行流程**：

```bash
# 在 Cursor 中执行
Implement tasks/user-list.tasks.md

# AI 会自动：
# 1. 读取 tasks 文件
# 2. 分配任务给不同 Agent
# 3. 并行执行
# 4. 合并结果

```

**多 Agent 并行示例**：

**UI Agent Prompt**：

```markdown
You are the **UI Agent**.

Tasks:
- Create UserListPage.tsx
- Create UserSearchForm.tsx
- Create UserTable.tsx

Spec: @specs/user-list.spec.md
Figma: https://figma.com/file/xxx

Requirements:
- Use Ant Design components
- Follow Tailwind CSS conventions
- Pixel-perfect implementation (see Figma MCP guide)
- Responsive design (mobile-first)

Do NOT:
- Implement API logic
- Handle state management

```

**API Agent Prompt**：

```markdown
You are the **API Agent**.

Tasks:
- Create userService.ts
- Add error handling
- Implement loading state

Spec: @specs/user-list.spec.md
API Docs: @docs/api/users.md

Requirements:
- Use axios for HTTP requests
- Implement proper TypeScript types
- Add request cancellation

Do NOT:
- Touch UI components
- Modify state management

```

**并行执行示意**：

```text
Time │ UI Agent        │ API Agent       │ State Agent
─────┼─────────────────┼─────────────────┼──────────────
0s   │ Start UI Task 1 │ Start API Task 5│ Start State 8
2s   │ Finish Task 1   │                 │
     │ Start UI Task 2 │                 │
4s   │                 │ Finish Task 5   │ Finish Task 8
     │                 │ Start API Task 6│ Start State 9
6s   │ Finish Task 2   │                 │
     │ Start UI Task 3 │                 │
8s   │                 │ Finish Task 6   │ Finish Task 9
     │                 │ Start API Task 7│ Start State 10
10s  │ Finish Task 3   │                 │
     │ Start UI Task 4 │                 │
12s  │ Finish Task 4   │ Finish Task 7   │ Finish Task 10
─────┴─────────────────┴─────────────────┴──────────────

```

**AI 职责**：

- 按任务清单生成代码
- 遵循 Spec 中的技术规范
- 保持与其他 Agent 的接口一致

**推荐工具**：

- **Cursor**：主要开发环境
- **Playwright**：E2E 测试
- **Storybook**：组件文档

---

### 2.5 Validation 阶段（自动验证）

**目标**：验证实现是否符合 PRD 和 Spec

**验证维度**：

1. **功能完整性**

  - 是否实现了所有 PRD 要求？
  - 边界条件是否处理？
2. **技术符合性**

  - 是否遵循 Spec 中的技术选型？
  - 代码结构是否符合约定？
3. **类型安全性**

  - TypeScript 编译是否通过？
  - 是否有 `any` 类型？
4. **UI 像素级对齐**（见第三章）

  - 是否与 Figma 设计一致？
  - 响应式布局是否正确？

**Cursor 验证命令**：

```bash
Validate implementation against PRD

# AI 会：
# 1. 读取 PRD 文件
# 2. 检查每个 Acceptance Criteria
# 3. 报告缺失或不符合的功能

```

**自动化验证脚本**：

```bash
# package.json
{
  "scripts": {
    "validate": "npm run type-check && npm run lint && npm run test",
    "type-check": "tsc --noEmit",
    "lint": "eslint src/",
    "test": "vitest run"
  }
}

```

**AI 职责**：

- 执行验证脚本
- 分析错误报告
- 提出修复建议

**推荐 Skills**：

- `ui-diff`
- `requirement-check`
- `type-check`

**推荐工具**：

- **Playwright**：E2E 测试
- **Chromatic**：视觉回归测试
- **TypeScript**：类型检查

---

### 2.6 Review 阶段（人工 + AI 审查）

**目标**：代码质量审查，确保可维护性

**审查清单**：

**代码结构**：

- 组件是否职责单一？
- 是否存在重复代码？
- 文件命名是否规范？

**性能**：

- 是否有不必要的 re-render？
- 是否有内存泄漏风险？
- 是否使用了正确的 React hooks？

**安全性**：

- 用户输入是否验证？
- API 请求是否有认证？
- 是否有 XSS 风险？

**可维护性**：

- 代码是否易于理解？
- 是否有足够的注释？
- 是否遵循团队编码规范？

**Cursor 审查命令**：

```bash
Review code and suggest improvements

# AI 会：
# 1. 分析代码结构
# 2. 检查常见反模式
# 3. 提出优化建议

```

**多模型对比审查**（来源：[Cursor 官方最佳实践](https://cursor.com/blog/agent-best-practices)）：

> “对于困难问题，可以让不同模型采用不同方法，比较代码质量，发现某个模型可能遗漏的边缘情况。”

**AI 职责**：

- 执行代码审查
- 标记潜在问题
- 提供重构建议

---

### 2.7 Iterate 阶段（迭代变更）

**目标**：处理新需求或修改现有功能

**迭代流程**：

```text
New PRD (002-user-edit.md)
    ↓
Update Spec (add edit feature)
    ↓
Generate Tasks (delta tasks)
    ↓
Implement (only changes)
    ↓
Validate (regression test)
    ↓
Review (review changes)

```

**关键原则**：

- **增量更新**：只修改变化的部分
- **向后兼容**：不破坏现有功能
- **文档同步**：PRD、Spec、Tasks 保持一致

**AI 职责**：

- 分析新旧 PRD 的差异
- 更新 Spec 中的相关部分
- 生成增量任务清单

---

## 三、UI 像素级还原 Figma：从设计到代码的精确映射

### 3.1 为什么像素级还原如此困难？

根据 [Replay.build 的研究](https://www.replay.build/blog/bridging-the-figma-to-production-gap-with-automated-token-to-code-mapping)：

> “70% 的遗留系统重写失败或超出时间表，主要原因是设计到代码的手工转换过程中存在大量’像素推动’（pixel-pushing）和手工返工。”

**核心痛点**：

1. **设计 Token 不一致**：Figma 中的 `spacing-4` 对应代码中的 `1rem` 还是 `16px`？
2. **手工转换误差**：设计师改了一个颜色，开发者忘记更新
3. **响应式适配**：Figma 通常是固定尺寸，代码需要响应式
4. **组件复用**：设计师复用了组件，开发者重新造轮子

### 3.2 Design-Driven Harness 流程

```text
Figma Design
    ↓
Figma MCP Agent (提取 Design Tokens)
    ↓
UI Agent (按 Token 实现)
    ↓
Storybook (渲染组件)
    ↓
Visual Diff Agent (对比截图)
    ↓
Auto Fix (自动修复偏差)

```

### 3.3 方法 1：Figma MCP（推荐）

**Figma MCP** 是 Anthropic 推出的标准化协议，允许 AI 直接读取 Figma 设计稿。

**安装配置**：

```bash
# 安装 Figma MCP 服务器
npm install -g @anthropic/figma-mcp-server

# 配置 MCP
export FIGMA_ACCESS_TOKEN="figd_xxx"
export FIGMA_FILE_KEY="abc123"

```

**使用示例**：

```markdown
You are the **UI Agent** with Figma MCP access.

Context:
- Figma File: https://figma.com/file/abc123/User-List
- Target Frame: "User List Page - Desktop"

Task: Extract design tokens and implement the UserListPage component.

Steps:
1. Use `figma-mcp` to read the frame
2. Extract:
   - Colors (primary, secondary, text, background)
   - Typography (font family, sizes, weights)
   - Spacing (padding, margin, gaps)
   - Border radius
3. Map tokens to Tailwind CSS classes
4. Implement component with pixel-perfect accuracy

```

**Figma MCP 能提取的信息**（来源：[Figma MCP 完全指南](https://www.seamgen.com/blog/figma-mcp-complete-guide-to-design-to-code-automation)）：

- **语义化理解**：识别按钮、输入框、卡片等组件类型
- **Design Tokens**：提取颜色、字体、间距等变量
- **Auto Layout**：理解 Figma 的自动布局，转换为 Flexbox/Grid
- **组件关系**：识别主组件和实例的关系

**关键代码示例**：

```typescript
// Figma MCP 提取的 Token 示例
const designTokens = {
  colors: {
    primary: "#1890ff",
    secondary: "#52c41a",
    text: "#333333",
    background: "#ffffff",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: {
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
    },
  },
  spacing: {
    1: "0.25rem",
    2: "0.5rem",
    4: "1rem",
    8: "2rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
  },
};

```

### 3.4 方法 2：Design Token Pipeline

如果无法使用 Figma MCP，可以建立手工的 Token 同步流程。

**步骤 1：从 Figma 导出 Token**

使用 Figma 插件（如 [Design Tokens](https://www.figma.com/community/plugin/888356632271791737)）导出：

```json
// tokens.json
{
  "color": {
    "primary": { "value": "#1890ff" },
    "secondary": { "value": "#52c41a" }
  },
  "spacing": {
    "sm": { "value": "8px" },
    "md": { "value": "16px" },
    "lg": { "value": "24px" }
  }
}

```

**步骤 2：转换为 Tailwind 配置**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#1890ff",
        secondary: "#52c41a",
      },
      spacing: {
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
    },
  },
};

```

**步骤 3：AI 按 Token 实现**

```markdown
Implement UserListPage using the design tokens from @tailwind.config.js.

Requirements:
- Use `text-primary` instead of hardcoded `#1890ff`
- Use `p-md` instead of `padding: 16px`
- All spacing values must come from Tailwind theme

```

### 3.5 方法 3：视觉 Diff 自动校验（最强）

**流程**：

```text
Figma Screenshot
    ↓
Rendered UI Screenshot
    ↓
Visual Diff Agent (对比差异)
    ↓
生成差异报告
    ↓
Auto Fix (自动调整)

```

**工具链**：

1. **Playwright**：截取 UI 截图
2. **Pixelmatch**：对比图片差异
3. **AI 分析**：识别差异类型（颜色、间距、字体）
4. **自动修复**：调整 CSS

**实现示例**：

```typescript
// visual-diff.ts
import { test, expect } from "@playwright/test";

test("UserListPage should match Figma design", async ({ page }) => {
  await page.goto("/users");

  // 截取实际 UI
  await page.screenshot({ path: "actual.png" });

  // 加载 Figma 截图
  const expected = "figma-screenshots/user-list-desktop.png";

  // 对比差异
  const diff = await compareScreenshots("actual.png", expected);

  // 允许 1% 的差异
  expect(diff.percent).toBeLessThan(0.01);
});

```

**自动修复逻辑**：

```markdown
You are the **Visual Diff Agent**.

Context:
- Expected: @figma-screenshots/user-list-desktop.png
- Actual: @screenshots/actual.png
- Diff Report: @diff-report.json

Task: Analyze the visual diff and fix the CSS.

Diff Analysis:
- Margin top: expected 16px, actual 12px (+4px)
- Font size: expected 14px, actual 16px (-2px)
- Border radius: expected 8px, actual 4px (+4px)

Fix these issues in @src/components/UserListPage.tsx

```

**推荐工具**：

- **Playwright**：UI 截图
- **Percy**：视觉回归测试平台
- **Chromatic**：Storybook 官方视觉测试

### 3.6 最佳实践：像素级对齐的 CSS 规范

**规则 1：使用 rem 而非 px**

```css
/* ❌ Bad */
.button {
  padding: 16px;
  font-size: 14px;
}

/* ✅ Good */
.button {
  padding: 1rem;      /* 16px */
  font-size: 0.875rem; /* 14px */
}

```

**规则 2：使用 Design Tokens**

```css
/* ❌ Bad */
.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
}

/* ✅ Good */
.card {
  background: var(--color-background);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

```

**规则 3：避免 Magic Numbers**

```css
/* ❌ Bad */
.user-table {
  margin-top: 37px; /* 为什么是 37px？ */
}

/* ✅ Good */
.user-table {
  margin-top: var(--spacing-lg); /* 使用语义化的 Token */
}

```

**规则 4：响应式优先**

```css
/* ❌ Bad - 固定宽度 */
.container {
  width: 1200px;
}

/* ✅ Good - 响应式 */
.container {
  max-width: 1200px;
  width: 100%;
  padding: 0 var(--spacing-md);
}

```

---

## 四、推荐工具链与 Skills

### 4.1 核心工具

| 工具                 | 用途        | 推荐场景   |
| ------------------ | --------- | ------ |
| **Cursor**         | AI 代码编辑器  | 主要开发环境 |
| **Claude Code**    | 命令行 AI 助手 | 复杂推理任务 |
| **GitHub Copilot** | 代码补全      | 日常编码   |
| **Playwright**     | E2E 测试    | UI 验证  |
| **Storybook**      | 组件文档      | UI 开发  |
| **Figma**          | 设计工具      | 设计稿源   |

### 4.2 MCP 服务器推荐

| MCP Server         | 功能           | 官方链接                                                                             |
| ------------------ | ------------ | -------------------------------------------------------------------------------- |
| **figma-mcp**      | 读取 Figma 设计稿 | [Anthropic](https://github.com/anthropics/anthropic-cookbook/tree/main/misc/mcp) |
| **repo-mcp**       | 访问代码仓库       | [Anthropic](https://github.com/anthropics/anthropic-cookbook/tree/main/misc/mcp) |
| **postgres-mcp**   | 数据库操作        | [Anthropic](https://github.com/anthropics/anthropic-cookbook/tree/main/misc/mcp) |
| **playwright-mcp** | 浏览器自动化       | [Community](https://github.com/nicholasoxford/playwright-mcp)                    |
| **http-mcp**       | HTTP 请求      | [Community](https://github.com/nicholasoxford/http-mcp)                          |

### 4.3 Skills 推荐

**需求阶段**：

- `requirement-analysis`
- `user-story-generation`
- `scope-splitting`

**设计阶段**：

- `architecture-design`
- `frontend-pattern`
- `component-splitting`

**实现阶段**：

- `task-breakdown`
- `dependency-graph`
- `parallelization`

**验证阶段**：

- `ui-diff`
- `requirement-check`
- `type-check`

---

## 五、最佳实践与常见陷阱

### 5.1 最佳实践

**1\. 小步迭代，频繁验证**

不要试图一次性完成所有功能：

```markdown
❌ Bad: "Implement the entire admin dashboard"

✅ Good: 
- Iteration 1: User list page
- Iteration 2: User edit page
- Iteration 3: Permission management

```

**2\. 保持文档同步**

每次代码变更后，更新相关文档：

```bash
# 提交前检查
npm run validate
npm run docs:update
git add docs/ specs/ tasks/

```

**3\. 使用共享 Spec**

避免每个功能重复定义技术栈：

```markdown
# specs/coding.spec.md (通用规范)
- Framework: React 18
- UI Library: Ant Design 5
- State Management: React Query
- Styling: Tailwind CSS
- Testing: Vitest + Playwright

```

**4\. 多模型对比审查**

对于关键代码，使用不同模型生成，对比质量：

```bash
# Cursor 中的实践
Generate UserListPage using Claude 3.5
Generate UserListPage using GPT-4
Compare both implementations and choose the best

```

**5\. 人类审查不可少**

AI 生成的代码必须经过人工审查（来源：[IBM AI Agents 2025 报告](https://www.ibm.com/think/insights/ai-agents-2025-expectations-vs-reality)）：

> “人类将始终保持在循环中。即使 AI 模型决定项目工作流程，人类审查仍然是确保质量和安全的关键。”

### 5.2 常见陷阱

**陷阱 1：过度依赖 AI**

❌ 问题：盲目接受 AI 生成的代码，不加审查  
✅ 解决：建立审查清单，逐项检查

**陷阱 2：Spec 过于抽象**

❌ 问题：

```markdown
# Bad Spec
Implement user list with table.

```

✅ 解决：

```markdown
# Good Spec
Implement UserListPage with:
- Ant Design Table component
- Columns: name, email, status, actions
- Pagination: 10 items per page
- Search: debounce 300ms
- Loading: Ant Design Spin overlay

```

**陷阱 3：忽视边缘情况**

❌ 问题：只处理 happy path  
✅ 解决：在 Spec 中明确列出边缘情况

```markdown
## Edge Cases
- Empty state: show "No users found"
- Loading error: show error message with retry button
- Network timeout: show toast notification

```

**陷阱 4：多 Agent 协作混乱**

❌ 问题：多个 Agent 同时修改同一文件  
✅ 解决：明确文件所有权

```markdown
File Ownership:
- UI Agent: src/components/**, src/styles/**
- API Agent: src/services/**, src/api/**
- State Agent: src/hooks/**, src/store/**
- Test Agent: src/**/*.test.ts, e2e/**

```

**陷阱 5：文档与代码脱节**

❌ 问题：代码更新了，文档还是旧的  
✅ 解决：将文档更新纳入 Definition of Done

```bash
# Pre-commit hook
npm run validate
npm run docs:sync

```

---

## 六、完整案例：用户列表页面

### 6.1 PRD 文档

```markdown
# /docs/prd/001-user-list.md

# Feature: User List Page

## Goals
- Display users in a table with pagination
- Support search by name/email
- Show user status (active/inactive)
- Allow admin to view user details

## Non-Goals
- Edit user (separate feature)
- Delete user (separate feature)
- Bulk operations (future iteration)

## User Stories
1. As an admin, I want to view all users in a paginated table
2. As an admin, I want to search users by name or email
3. As an admin, I want to quickly identify active vs inactive users

## Acceptance Criteria
- ✅ Table displays: name, email, status, created date, actions
- ✅ Pagination shows 10 users per page
- ✅ Search works with partial match (case-insensitive)
- ✅ Status badge shows green for active, gray for inactive
- ✅ Clicking "View" navigates to user detail page
- ✅ Empty state shows "No users found" message
- ✅ Loading state shows spinner overlay

```

### 6.2 Spec 文档

```markdown
# /specs/user-list.spec.md

# Spec: User List Page

## Tech Stack
- React 18.3
- Ant Design 5.x
- React Query 5.x
- Tailwind CSS 3.x
- React Router 6.x

## Components

### Pages
- `UserListPage` (src/pages/UserListPage.tsx)

### Components
- `UserSearchForm` (src/components/UserSearchForm.tsx)
- `UserTable` (src/components/UserTable.tsx)
- `StatusBadge` (src/components/StatusBadge.tsx)

### Services
- `userService` (src/services/userService.ts)
  - `getUsers(params): Promise<UserListResponse>`

### Hooks
- `useUsers` (src/hooks/useUsers.ts)

## API Contract

### GET /api/users

Query Parameters:
- `page` (number, default: 1)
- `pageSize` (number, default: 10)
- `search` (string, optional)

Response:
```json
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "status": "active" | "inactive",
      "createdAt": "ISO 8601 date string"
    }
  ],
  "total": number,
  "page": number,
  "pageSize": number
}

```

## State Management

- Use React Query’s `useQuery` for data fetching
- Cache key: `['users', page, search]`
- Stale time: 30 seconds
- Retry: 1 time on failure

## Styling

- Use Tailwind CSS utility classes
- Follow Ant Design theming
- Responsive breakpoints:  
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## File Structure

```text
src/
├── pages/
│   └── UserListPage.tsx
├── components/
│   ├── UserSearchForm.tsx
│   ├── UserTable.tsx
│   └── StatusBadge.tsx
├── services/
│   └── userService.ts
├── hooks/
│   └── useUsers.ts
└── types/
    └── user.ts

```

### 6.3 Tasks 文档

```markdown
# /tasks/user-list.tasks.md

# Tasks: User List Page

## Phase 1: Foundation (parallel)

### Type Definitions
- [ ] Create `src/types/user.ts` with User and UserListResponse types

### Services
- [ ] Create `src/services/userService.ts` with getUsers function
- [ ] Add axios instance with base URL
- [ ] Add error handling for API failures

### Hooks
- [ ] Create `src/hooks/useUsers.ts` with React Query hook
- [ ] Implement search debouncing (300ms)

## Phase 2: UI Components (parallel)

### StatusBadge
- [ ] Create `src/components/StatusBadge.tsx`
- [ ] Use Ant Design Tag component
- [ ] Colors: green for active, gray for inactive

### UserSearchForm
- [ ] Create `src/components/UserSearchForm.tsx`
- [ ] Use Ant Design Input.Search
- [ ] Add debounced onChange handler

### UserTable
- [ ] Create `src/components/UserTable.tsx`
- [ ] Use Ant Design Table component
- [ ] Columns: name, email, status, createdAt, actions
- [ ] Add "View" button in actions column

## Phase 3: Page Assembly

- [ ] Create `src/pages/UserListPage.tsx`
- [ ] Compose UserSearchForm + UserTable
- [ ] Add pagination controls
- [ ] Add loading state (Spin overlay)
- [ ] Add empty state message

## Phase 4: Routing

- [ ] Add route `/users` to React Router config
- [ ] Add navigation link in sidebar

## Phase 5: Testing

- [ ] Write unit tests for StatusBadge
- [ ] Write unit tests for UserSearchForm
- [ ] Write integration tests for UserListPage
- [ ] Write E2E test for search flow

```

### 6.4 实现示例

**UI Agent 执行**：

```markdown
You are the **UI Agent**.

Tasks: Implement UserTable component

Spec: @specs/user-list.spec.md
Design Tokens: @tailwind.config.js

Requirements:
- Use Ant Design Table
- Follow Tailwind CSS conventions
- Responsive design (mobile-first)

Columns:
1. Name (sortable)
2. Email
3. Status (use StatusBadge component)
4. Created At (format: YYYY-MM-DD)
5. Actions (View button)

Create file: src/components/UserTable.tsx

```

**生成的代码**：

```typescript
// src/components/UserTable.tsx
import { Table, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { StatusBadge } from "./StatusBadge";
import type { User } from "@/types/user";
import dayjs from "dayjs";

interface UserTableProps {
  users: User[];
  loading: boolean;
  onView: (userId: string) => void;
}

export function UserTable({ users, loading, onView }: UserTableProps) {
  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      className: "font-medium",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "text-gray-600",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusBadge status={status} />,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
      className: "text-gray-500",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => onView(record.id)}
          className="text-primary"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Table<User>
      columns={columns}
      dataSource={users}
      loading={loading}
      rowKey="id"
      pagination={false}
      className="bg-white rounded-lg shadow-sm"
    />
  );
}

```

---

## 七、总结：Harness Engineering 的核心价值

### 7.1 核心收益

1. **意图精确传递**：从 PRD → Spec → Tasks → Code，每一步都有明确的映射
2. **并行开发效率**：多 Agent 同时工作，开发速度提升 3-5 倍
3. **质量可控**：自动验证 + 人工审查，确保代码符合标准
4. **文档同步**：文档即代码，永远不会脱节
5. **可追溯性**：每个功能都能追溯到原始需求

### 7.2 关键成功因素

1. **结构化文档**：PRD、Spec、Tasks 必须清晰、完整、可执行
2. **MCP 工具链**：选择合适的 MCP 服务器，连接 AI 与外部世界
3. **多 Agent 协作**：明确职责分工，避免冲突
4. **持续验证**：每个阶段都要验证，不要等到最后
5. **人类监督**：AI 是工具，人类是决策者

### 7.3 未来展望

根据 [The New Stack 的 2025 前端 AI 趋势报告](https://thenewstack.io/2025s-radical-frontend-ai-shift/)：

> “2025 年最激进的前端变革是生成式 UI（Generative UI）的兴起，界面由 AI 根据用户提示动态组装。”

Harness Engineering 是通向这一未来的桥梁。通过结构化的文档驱动和 AI Agent 协作，我们正在重新定义软件开发的范式：

- **从"写代码"到"描述意图"**
- **从"手工实现"到"自动生成"**
- **从"单兵作战"到"AI 团队协作"**

---

## 参考资料

1. [Anthropic - Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
2. [Cursor - Agent Best Practices](https://cursor.com/blog/agent-best-practices)
3. [Replay.build - Bridging the Figma-to-Production Gap](https://www.replay.build/blog/bridging-the-figma-to-production-gap-with-automated-token-to-code-mapping)
4. [IBM - AI Agents 2025: Expectations vs. Reality](https://www.ibm.com/think/insights/ai-agents-2025-expectations-vs-reality)
5. [The New Stack - 2025’s Radical Frontend AI Shift](https://thenewstack.io/2025s-radical-frontend-ai-shift/)
6. [Digital Applied - AI Agent Orchestration Workflows Guide](https://www.digitalapplied.com/blog/ai-agent-orchestration-workflows-guide)
7. [Seamgen - Figma MCP: Complete Guide to Design-to-Code Automation](https://www.seamgen.com/blog/figma-mcp-complete-guide-to-design-to-code-automation)
8. [Martin Fowler - Spec-Driven Development Tools](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)

---

> “Harness Engineering 不是替代开发者，而是让开发者从重复劳动中解放，专注于创造性工作。”  
> — 本文核心理念

引用自

[Harness Engineering：前端 AI 驱动的工程化实践完全指南 | zayfEn'Closure](https://www.zayfen.com/posts/harness-engineering-frontend-guide/)
