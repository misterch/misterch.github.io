import{_ as i,r as l,o,c as p,b as n,d as s,e,a as t}from"./app-ee99a4c6.js";const c={},r=t(`<blockquote><p>当 AI 能编写代码时，我们面临的挑战不再是&quot;如何写代码&quot;，而是&quot;如何让 AI 按照正确的意图写代码&quot;。Harness Engineering 提供了一套结构化的方法论，将需求、设计、实现、验证串联成可追溯、可迭代的工程流程。</p></blockquote><hr><h2 id="引言-从-手工编写-到-意图驱动" tabindex="-1"><a class="header-anchor" href="#引言-从-手工编写-到-意图驱动" aria-hidden="true">#</a> 引言：从&quot;手工编写&quot;到&quot;意图驱动&quot;</h2><p>2025 年，AI 编程助手已从&quot;实验玩具&quot;进化为&quot;生产工具&quot;。Cursor、Claude Code、GitHub Copilot 等工具能生成可运行的代码，但问题随之而来：</p><ul><li><strong>意图漂移</strong>：AI 生成的代码偏离需求</li><li><strong>质量失控</strong>：缺乏系统性验证</li><li><strong>协作混乱</strong>：多 Agent 并行时职责不清</li><li><strong>维护困难</strong>：代码与文档脱节</li></ul><p>Harness Engineering 的核心理念是：<strong>用结构化文档驱动 AI，实现从需求到代码的精确映射</strong>。它不是简单的&quot;写更好的 Prompt&quot;，而是一套完整的工程化流程，涵盖：</p><ul><li>需求定义（PRD）</li><li>技术设计（Spec）</li><li>任务拆解（Tasks）</li><li>并行实现（Implementation）</li><li>自动验证（Validation）</li><li>迭代优化（Iterate）</li></ul><p>本文将从前端开发者的视角，详细阐述如何在真实项目中落地这套流程。</p><hr><h2 id="一、多-agent-并行架构-从-单兵作战-到-团队协作" tabindex="-1"><a class="header-anchor" href="#一、多-agent-并行架构-从-单兵作战-到-团队协作" aria-hidden="true">#</a> 一、多 Agent 并行架构：从&quot;单兵作战&quot;到&quot;团队协作&quot;</h2><h3 id="_1-1-为什么需要多-agent" tabindex="-1"><a class="header-anchor" href="#_1-1-为什么需要多-agent" aria-hidden="true">#</a> 1.1 为什么需要多 Agent？</h3><p>单个 AI Agent 虽然强大，但存在明显局限：</p><ul><li><strong>上下文窗口有限</strong>：难以同时处理 PRD、设计稿、代码库</li><li><strong>专业深度不足</strong>：一个 Agent 难以同时精通 UI 设计、状态管理、API 调用</li><li><strong>并行效率低下</strong>：串行执行导致开发周期长</li></ul><p><strong>多 Agent 架构的核心思想</strong>：按阶段和职责拆分 Agent，每个 Agent 专注于特定领域，通过协作完成复杂任务。</p><h3 id="_1-2-推荐的-5-agent-架构" tabindex="-1"><a class="header-anchor" href="#_1-2-推荐的-5-agent-架构" aria-hidden="true">#</a> 1.2 推荐的 5-Agent 架构</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>┌─────────────┐
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>并行执行策略</strong>：</p><ul><li><strong>UI Agent</strong>：负责组件实现、样式、响应式布局</li><li><strong>API Agent</strong>：负责数据请求、错误处理、缓存策略</li><li><strong>State Agent</strong>：负责状态管理、数据流、副作用处理</li><li><strong>Test Agent</strong>：负责单元测试、集成测试、E2E 测试</li></ul><p>这四个 Agent 可以同时工作，互不阻塞，大幅提升开发效率。</p><h3 id="_1-3-在-cursor-中启动多-agent-的三种方法" tabindex="-1"><a class="header-anchor" href="#_1-3-在-cursor-中启动多-agent-的三种方法" aria-hidden="true">#</a> 1.3 在 Cursor 中启动多 Agent 的三种方法</h3><h4 id="方法-1-多对话窗口-最简单" tabindex="-1"><a class="header-anchor" href="#方法-1-多对话窗口-最简单" aria-hidden="true">#</a> 方法 1：多对话窗口（最简单）</h4><p>直接开多个 Cursor Chat 窗口：</p><ul><li>窗口 1：PRD 分析（<code>@prd.md</code>）</li><li>窗口 2：UI 实现（<code>@spec.md @figma</code>）</li><li>窗口 3：API 集成（<code>@spec.md @api-docs</code>）</li></ul><p><strong>优点</strong>：零配置，即开即用<br><strong>缺点</strong>：需要手动同步状态，容易遗漏</p><h4 id="方法-2-agent-prompt-推荐" tabindex="-1"><a class="header-anchor" href="#方法-2-agent-prompt-推荐" aria-hidden="true">#</a> 方法 2：Agent Prompt（推荐）</h4><p>在同一个对话中，通过 Prompt 切换 Agent 角色：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>You are now the <span class="token bold"><span class="token punctuation">**</span><span class="token content">UI Agent</span><span class="token punctuation">**</span></span>.

Context:
<span class="token list punctuation">-</span> PRD: @docs/prd/user-list.md
<span class="token list punctuation">-</span> Spec: @specs/user-list.spec.md
<span class="token list punctuation">-</span> Figma: https://figma.com/file/xxx

Task: Implement the UserListPage component following the spec exactly.
Use design tokens from @styles/tokens.css.

Focus only on UI. Do not implement API logic.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>You are now the <span class="token bold"><span class="token punctuation">**</span><span class="token content">API Agent</span><span class="token punctuation">**</span></span>.

Context:
<span class="token list punctuation">-</span> Spec: @specs/user-list.spec.md
<span class="token list punctuation">-</span> API Docs: @docs/api/users.md

Task: Implement the data fetching logic for UserListPage.
Use React Query with proper error handling and caching.

Focus only on API logic. Do not touch UI components.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优点</strong>：保持上下文连续性，易于管理<br><strong>缺点</strong>：需要显式切换角色</p><h4 id="方法-3-mcp-多-agent-最强" tabindex="-1"><a class="header-anchor" href="#方法-3-mcp-多-agent-最强" aria-hidden="true">#</a> 方法 3：MCP 多 Agent（最强）</h4><p>通过 <strong>Model Context Protocol（MCP）</strong> 实现自动化编排：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># mcp-config.yaml</span>
<span class="token key atrule">agents</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ui<span class="token punctuation">-</span>agent
    <span class="token key atrule">tools</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> figma<span class="token punctuation">-</span>mcp  <span class="token comment"># 连接 Figma API</span>
      <span class="token punctuation">-</span> repo<span class="token punctuation">-</span>mcp   <span class="token comment"># 访问代码仓库</span>
    <span class="token key atrule">focus</span><span class="token punctuation">:</span> <span class="token string">&quot;UI components and styling&quot;</span>
  
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> api<span class="token punctuation">-</span>agent
    <span class="token key atrule">tools</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> http<span class="token punctuation">-</span>mcp   <span class="token comment"># 发送 HTTP 请求</span>
      <span class="token punctuation">-</span> repo<span class="token punctuation">-</span>mcp
    <span class="token key atrule">focus</span><span class="token punctuation">:</span> <span class="token string">&quot;API integration and data fetching&quot;</span>
  
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>agent
    <span class="token key atrule">tools</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> playwright<span class="token punctuation">-</span>mcp  <span class="token comment"># E2E 测试</span>
      <span class="token punctuation">-</span> repo<span class="token punctuation">-</span>mcp
    <span class="token key atrule">focus</span><span class="token punctuation">:</span> <span class="token string">&quot;Testing and validation&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,32),d=n("strong",null,"MCP 的核心价值",-1),u={href:"https://www.anthropic.com/news/model-context-protocol",target:"_blank",rel:"noopener noreferrer"},v=t(`<blockquote><p>“MCP 是 AI 应用程序的 USB-C 接口。就像 USB-C 提供了连接设备的标准方式，MCP 提供了连接 AI 模型与不同数据源和工具的标准方式。”</p></blockquote><p>通过 MCP，Agent 可以：</p><ul><li>直接读取 Figma 设计稿（<code>figma-mcp</code>）</li><li>操作代码仓库（<code>repo-mcp</code>）</li><li>执行浏览器测试（<code>playwright-mcp</code>）</li><li>访问数据库（<code>postgres-mcp</code>）</li></ul><p><strong>优点</strong>：真正的自动化编排，Agent 间无需人工干预<br><strong>缺点</strong>：需要配置 MCP 服务器，学习成本较高</p><hr><h2 id="二、完整-harness-engineering-流程-七步闭环" tabindex="-1"><a class="header-anchor" href="#二、完整-harness-engineering-流程-七步闭环" aria-hidden="true">#</a> 二、完整 Harness Engineering 流程：七步闭环</h2><h3 id="流程概览" tabindex="-1"><a class="header-anchor" href="#流程概览" aria-hidden="true">#</a> 流程概览</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PRD → Spec → Tasks → Implementation → Validation → Review → Iterate

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>每个阶段都有明确的输入、输出和 AI 职责。</p><hr><h3 id="_2-1-prd-阶段-产品需求文档" tabindex="-1"><a class="header-anchor" href="#_2-1-prd-阶段-产品需求文档" aria-hidden="true">#</a> 2.1 PRD 阶段（产品需求文档）</h3><p><strong>目标</strong>：定义&quot;做什么&quot;，不涉及技术细节</p><p><strong>目录结构</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/docs/prd/
├── 001-user-list.md
├── 002-user-edit.md
└── 003-permission-management.md

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>文档模板</strong>：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> Feature: User List Page</span>

<span class="token title important"><span class="token punctuation">##</span> Goals</span>
<span class="token list punctuation">-</span> Display user table with pagination
<span class="token list punctuation">-</span> Support search by name/email
<span class="token list punctuation">-</span> Show user status (active/inactive)

<span class="token title important"><span class="token punctuation">##</span> Non-Goals</span>
<span class="token list punctuation">-</span> Edit user details (separate feature)
<span class="token list punctuation">-</span> Delete users (separate feature)

<span class="token title important"><span class="token punctuation">##</span> User Stories</span>
<span class="token list punctuation">-</span> As an admin, I want to view all users in a table
<span class="token list punctuation">-</span> As an admin, I want to search users by name

<span class="token title important"><span class="token punctuation">##</span> Acceptance Criteria</span>
<span class="token list punctuation">-</span> ✅ Table shows 10 users per page
<span class="token list punctuation">-</span> ✅ Search works with partial match
<span class="token list punctuation">-</span> ✅ Status badge shows correct color

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>AI 职责</strong>：</p><ul><li>从用户输入生成结构化 PRD</li><li>补充遗漏的边界条件</li><li>排序需求优先级</li></ul><p><strong>推荐工具</strong>：</p><ul><li><strong>Cursor</strong>：直接对话生成 PRD</li><li><strong>Notion AI</strong>：协作编辑 PRD</li><li><strong>Claude</strong>：深度需求分析</li></ul><p><strong>推荐 Skills</strong>：</p><ul><li><code>requirement-analysis</code></li><li><code>user-story-generation</code></li><li><code>scope-splitting</code></li></ul><p><strong>推荐 MCP</strong>：</p><ul><li><code>docs-mcp</code>：访问文档库</li><li><code>notion-mcp</code>：同步 Notion 页面</li></ul><hr><h3 id="_2-2-spec-阶段-技术设计文档" tabindex="-1"><a class="header-anchor" href="#_2-2-spec-阶段-技术设计文档" aria-hidden="true">#</a> 2.2 Spec 阶段（技术设计文档）</h3><p><strong>目标</strong>：定义&quot;怎么做&quot;，包括技术选型、组件设计、API 接口</p><p><strong>目录结构</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/specs/
├── coding.spec.md      # 通用编码规范
├── user-list.spec.md   # 功能规格
└── api.spec.md         # API 规格

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>文档模板</strong>：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> Spec: User List Page</span>

<span class="token title important"><span class="token punctuation">##</span> Tech Stack</span>
<span class="token list punctuation">-</span> Framework: React 18
<span class="token list punctuation">-</span> UI Library: Ant Design 5
<span class="token list punctuation">-</span> State Management: React Query
<span class="token list punctuation">-</span> Styling: Tailwind CSS

<span class="token title important"><span class="token punctuation">##</span> Components</span>
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`UserListPage\`</span> (page)
  <span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`UserSearchForm\`</span> (component)
  <span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`UserTable\`</span> (component)
  <span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`Pagination\`</span> (component)

<span class="token title important"><span class="token punctuation">##</span> API Endpoints</span>
GET /api/users
  <span class="token list punctuation">-</span> Query params: <span class="token code-snippet code keyword">\`page\`</span>, <span class="token code-snippet code keyword">\`pageSize\`</span>, <span class="token code-snippet code keyword">\`search\`</span>
  <span class="token list punctuation">-</span> Response: <span class="token code-snippet code keyword">\`{ users: User[], total: number }\`</span>

<span class="token title important"><span class="token punctuation">##</span> State Management</span>
<span class="token list punctuation">-</span> Use <span class="token code-snippet code keyword">\`useQuery\`</span> from React Query
<span class="token list punctuation">-</span> Cache key: <span class="token code-snippet code keyword">\`[&#39;users&#39;, page, search]\`</span>
<span class="token list punctuation">-</span> Stale time: 30s

<span class="token title important"><span class="token punctuation">##</span> File Structure</span>
src/
├── pages/
│   └── UserListPage.tsx
├── components/
│   ├── UserSearchForm.tsx
│   └── UserTable.tsx
└── services/
    └── userService.ts

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>AI 职责</strong>：</p><ul><li>根据 PRD 生成技术方案</li><li>选择合适的技术栈</li><li>设计组件层次结构</li><li>定义 API 接口契约</li></ul><p><strong>推荐工具</strong>：</p><ul><li><strong>Cursor</strong>：<code>Generate spec from PRD</code></li><li><strong>GitHub Copilot</strong>：辅助技术决策</li></ul><p><strong>推荐 Skills</strong>：</p><ul><li><code>architecture-design</code></li><li><code>frontend-pattern</code></li><li><code>component-splitting</code></li></ul><p><strong>推荐 MCP</strong>：</p><ul><li><code>repo-mcp</code>：访问代码仓库</li><li><code>tech-doc-mcp</code>：技术文档库</li></ul><hr><h3 id="_2-3-tasks-阶段-可执行任务清单" tabindex="-1"><a class="header-anchor" href="#_2-3-tasks-阶段-可执行任务清单" aria-hidden="true">#</a> 2.3 Tasks 阶段（可执行任务清单）</h3><p><strong>目标</strong>：将 Spec 拆解为 AI 可执行的小任务</p><p><strong>目录结构</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/tasks/
├── user-list.tasks.md
└── user-edit.tasks.md

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>文档模板</strong>：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> Tasks: User List Page</span>

<span class="token title important"><span class="token punctuation">##</span> UI Tasks (assign to UI Agent)</span>
<span class="token list punctuation">1.</span> Create <span class="token code-snippet code keyword">\`UserListPage.tsx\`</span> with layout
<span class="token list punctuation">2.</span> Create <span class="token code-snippet code keyword">\`UserSearchForm.tsx\`</span> with search input
<span class="token list punctuation">3.</span> Create <span class="token code-snippet code keyword">\`UserTable.tsx\`</span> with columns
<span class="token list punctuation">4.</span> Add pagination controls

<span class="token title important"><span class="token punctuation">##</span> API Tasks (assign to API Agent)</span>
<span class="token list punctuation">5.</span> Create <span class="token code-snippet code keyword">\`userService.ts\`</span> with <span class="token code-snippet code keyword">\`getUsers\`</span> function
<span class="token list punctuation">6.</span> Add error handling for API failures
<span class="token list punctuation">7.</span> Implement loading state

<span class="token title important"><span class="token punctuation">##</span> State Tasks (assign to State Agent)</span>
<span class="token list punctuation">8.</span> Set up React Query provider
<span class="token list punctuation">9.</span> Create custom hook <span class="token code-snippet code keyword">\`useUsers\`</span>
<span class="token list punctuation">10.</span> Implement search debouncing

<span class="token title important"><span class="token punctuation">##</span> Test Tasks (assign to Test Agent)</span>
<span class="token list punctuation">11.</span> Write unit tests for <span class="token code-snippet code keyword">\`UserSearchForm\`</span>
<span class="token list punctuation">12.</span> Write integration tests for <span class="token code-snippet code keyword">\`UserListPage\`</span>
<span class="token list punctuation">13.</span> Add E2E test for search flow

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关键原则</strong>：</p><ul><li><strong>原子性</strong>：每个任务独立可完成</li><li><strong>并行性</strong>：标记哪些任务可同时执行</li><li><strong>依赖性</strong>：明确任务间的前置关系</li></ul><p><strong>AI 职责</strong>：</p><ul><li>从 Spec 生成任务清单</li><li>识别任务间的依赖关系</li><li>标记可并行执行的任务组</li></ul><p><strong>推荐 Skills</strong>：</p><ul><li><code>task-breakdown</code></li><li><code>dependency-graph</code></li><li><code>parallelization</code></li></ul><hr><h3 id="_2-4-implementation-阶段-多-agent-并行实现" tabindex="-1"><a class="header-anchor" href="#_2-4-implementation-阶段-多-agent-并行实现" aria-hidden="true">#</a> 2.4 Implementation 阶段（多 Agent 并行实现）</h3><p><strong>目标</strong>：各个 Agent 并行执行任务</p><p><strong>执行流程</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在 Cursor 中执行</span>
Implement tasks/user-list.tasks.md

<span class="token comment"># AI 会自动：</span>
<span class="token comment"># 1. 读取 tasks 文件</span>
<span class="token comment"># 2. 分配任务给不同 Agent</span>
<span class="token comment"># 3. 并行执行</span>
<span class="token comment"># 4. 合并结果</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>多 Agent 并行示例</strong>：</p><p><strong>UI Agent Prompt</strong>：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>You are the <span class="token bold"><span class="token punctuation">**</span><span class="token content">UI Agent</span><span class="token punctuation">**</span></span>.

Tasks:
<span class="token list punctuation">-</span> Create UserListPage.tsx
<span class="token list punctuation">-</span> Create UserSearchForm.tsx
<span class="token list punctuation">-</span> Create UserTable.tsx

Spec: @specs/user-list.spec.md
Figma: https://figma.com/file/xxx

Requirements:
<span class="token list punctuation">-</span> Use Ant Design components
<span class="token list punctuation">-</span> Follow Tailwind CSS conventions
<span class="token list punctuation">-</span> Pixel-perfect implementation (see Figma MCP guide)
<span class="token list punctuation">-</span> Responsive design (mobile-first)

Do NOT:
<span class="token list punctuation">-</span> Implement API logic
<span class="token list punctuation">-</span> Handle state management

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>API Agent Prompt</strong>：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>You are the <span class="token bold"><span class="token punctuation">**</span><span class="token content">API Agent</span><span class="token punctuation">**</span></span>.

Tasks:
<span class="token list punctuation">-</span> Create userService.ts
<span class="token list punctuation">-</span> Add error handling
<span class="token list punctuation">-</span> Implement loading state

Spec: @specs/user-list.spec.md
API Docs: @docs/api/users.md

Requirements:
<span class="token list punctuation">-</span> Use axios for HTTP requests
<span class="token list punctuation">-</span> Implement proper TypeScript types
<span class="token list punctuation">-</span> Add request cancellation

Do NOT:
<span class="token list punctuation">-</span> Touch UI components
<span class="token list punctuation">-</span> Modify state management

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>并行执行示意</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Time │ UI Agent        │ API Agent       │ State Agent
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>AI 职责</strong>：</p><ul><li>按任务清单生成代码</li><li>遵循 Spec 中的技术规范</li><li>保持与其他 Agent 的接口一致</li></ul><p><strong>推荐工具</strong>：</p><ul><li><strong>Cursor</strong>：主要开发环境</li><li><strong>Playwright</strong>：E2E 测试</li><li><strong>Storybook</strong>：组件文档</li></ul><hr><h3 id="_2-5-validation-阶段-自动验证" tabindex="-1"><a class="header-anchor" href="#_2-5-validation-阶段-自动验证" aria-hidden="true">#</a> 2.5 Validation 阶段（自动验证）</h3><p><strong>目标</strong>：验证实现是否符合 PRD 和 Spec</p><p><strong>验证维度</strong>：</p><ol><li><strong>功能完整性</strong></li></ol><ul><li>是否实现了所有 PRD 要求？</li><li>边界条件是否处理？</li></ul><ol start="2"><li><strong>技术符合性</strong></li></ol><ul><li>是否遵循 Spec 中的技术选型？</li><li>代码结构是否符合约定？</li></ul><ol start="3"><li><strong>类型安全性</strong></li></ol><ul><li>TypeScript 编译是否通过？</li><li>是否有 <code>any</code> 类型？</li></ul><ol start="4"><li><strong>UI 像素级对齐</strong>（见第三章）</li></ol><ul><li>是否与 Figma 设计一致？</li><li>响应式布局是否正确？</li></ul><p><strong>Cursor 验证命令</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Validate implementation against PRD

<span class="token comment"># AI 会：</span>
<span class="token comment"># 1. 读取 PRD 文件</span>
<span class="token comment"># 2. 检查每个 Acceptance Criteria</span>
<span class="token comment"># 3. 报告缺失或不符合的功能</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自动化验证脚本</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># package.json</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;scripts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;validate&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;npm run type-check &amp;&amp; npm run lint &amp;&amp; npm run test&quot;</span>,
    <span class="token string">&quot;type-check&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;tsc --noEmit&quot;</span>,
    <span class="token string">&quot;lint&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;eslint src/&quot;</span>,
    <span class="token string">&quot;test&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;vitest run&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>AI 职责</strong>：</p><ul><li>执行验证脚本</li><li>分析错误报告</li><li>提出修复建议</li></ul><p><strong>推荐 Skills</strong>：</p><ul><li><code>ui-diff</code></li><li><code>requirement-check</code></li><li><code>type-check</code></li></ul><p><strong>推荐工具</strong>：</p><ul><li><strong>Playwright</strong>：E2E 测试</li><li><strong>Chromatic</strong>：视觉回归测试</li><li><strong>TypeScript</strong>：类型检查</li></ul><hr><h3 id="_2-6-review-阶段-人工-ai-审查" tabindex="-1"><a class="header-anchor" href="#_2-6-review-阶段-人工-ai-审查" aria-hidden="true">#</a> 2.6 Review 阶段（人工 + AI 审查）</h3><p><strong>目标</strong>：代码质量审查，确保可维护性</p><p><strong>审查清单</strong>：</p><p><strong>代码结构</strong>：</p><ul><li>组件是否职责单一？</li><li>是否存在重复代码？</li><li>文件命名是否规范？</li></ul><p><strong>性能</strong>：</p><ul><li>是否有不必要的 re-render？</li><li>是否有内存泄漏风险？</li><li>是否使用了正确的 React hooks？</li></ul><p><strong>安全性</strong>：</p><ul><li>用户输入是否验证？</li><li>API 请求是否有认证？</li><li>是否有 XSS 风险？</li></ul><p><strong>可维护性</strong>：</p><ul><li>代码是否易于理解？</li><li>是否有足够的注释？</li><li>是否遵循团队编码规范？</li></ul><p><strong>Cursor 审查命令</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Review code and suggest improvements

<span class="token comment"># AI 会：</span>
<span class="token comment"># 1. 分析代码结构</span>
<span class="token comment"># 2. 检查常见反模式</span>
<span class="token comment"># 3. 提出优化建议</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,104),m=n("strong",null,"多模型对比审查",-1),k={href:"https://cursor.com/blog/agent-best-practices",target:"_blank",rel:"noopener noreferrer"},b=t(`<blockquote><p>“对于困难问题，可以让不同模型采用不同方法，比较代码质量，发现某个模型可能遗漏的边缘情况。”</p></blockquote><p><strong>AI 职责</strong>：</p><ul><li>执行代码审查</li><li>标记潜在问题</li><li>提供重构建议</li></ul><hr><h3 id="_2-7-iterate-阶段-迭代变更" tabindex="-1"><a class="header-anchor" href="#_2-7-iterate-阶段-迭代变更" aria-hidden="true">#</a> 2.7 Iterate 阶段（迭代变更）</h3><p><strong>目标</strong>：处理新需求或修改现有功能</p><p><strong>迭代流程</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>New PRD (002-user-edit.md)
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关键原则</strong>：</p><ul><li><strong>增量更新</strong>：只修改变化的部分</li><li><strong>向后兼容</strong>：不破坏现有功能</li><li><strong>文档同步</strong>：PRD、Spec、Tasks 保持一致</li></ul><p><strong>AI 职责</strong>：</p><ul><li>分析新旧 PRD 的差异</li><li>更新 Spec 中的相关部分</li><li>生成增量任务清单</li></ul><hr><h2 id="三、ui-像素级还原-figma-从设计到代码的精确映射" tabindex="-1"><a class="header-anchor" href="#三、ui-像素级还原-figma-从设计到代码的精确映射" aria-hidden="true">#</a> 三、UI 像素级还原 Figma：从设计到代码的精确映射</h2><h3 id="_3-1-为什么像素级还原如此困难" tabindex="-1"><a class="header-anchor" href="#_3-1-为什么像素级还原如此困难" aria-hidden="true">#</a> 3.1 为什么像素级还原如此困难？</h3>`,15),g={href:"https://www.replay.build/blog/bridging-the-figma-to-production-gap-with-automated-token-to-code-mapping",target:"_blank",rel:"noopener noreferrer"},h=t(`<blockquote><p>“70% 的遗留系统重写失败或超出时间表，主要原因是设计到代码的手工转换过程中存在大量’像素推动’（pixel-pushing）和手工返工。”</p></blockquote><p><strong>核心痛点</strong>：</p><ol><li><strong>设计 Token 不一致</strong>：Figma 中的 <code>spacing-4</code> 对应代码中的 <code>1rem</code> 还是 <code>16px</code>？</li><li><strong>手工转换误差</strong>：设计师改了一个颜色，开发者忘记更新</li><li><strong>响应式适配</strong>：Figma 通常是固定尺寸，代码需要响应式</li><li><strong>组件复用</strong>：设计师复用了组件，开发者重新造轮子</li></ol><h3 id="_3-2-design-driven-harness-流程" tabindex="-1"><a class="header-anchor" href="#_3-2-design-driven-harness-流程" aria-hidden="true">#</a> 3.2 Design-Driven Harness 流程</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Figma Design
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-方法-1-figma-mcp-推荐" tabindex="-1"><a class="header-anchor" href="#_3-3-方法-1-figma-mcp-推荐" aria-hidden="true">#</a> 3.3 方法 1：Figma MCP（推荐）</h3><p><strong>Figma MCP</strong> 是 Anthropic 推出的标准化协议，允许 AI 直接读取 Figma 设计稿。</p><p><strong>安装配置</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 Figma MCP 服务器</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> @anthropic/figma-mcp-server

<span class="token comment"># 配置 MCP</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">FIGMA_ACCESS_TOKEN</span><span class="token operator">=</span><span class="token string">&quot;figd_xxx&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">FIGMA_FILE_KEY</span><span class="token operator">=</span><span class="token string">&quot;abc123&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用示例</strong>：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>You are the <span class="token bold"><span class="token punctuation">**</span><span class="token content">UI Agent</span><span class="token punctuation">**</span></span> with Figma MCP access.

Context:
<span class="token list punctuation">-</span> Figma File: https://figma.com/file/abc123/User-List
<span class="token list punctuation">-</span> Target Frame: &quot;User List Page - Desktop&quot;

Task: Extract design tokens and implement the UserListPage component.

Steps:
<span class="token list punctuation">1.</span> Use <span class="token code-snippet code keyword">\`figma-mcp\`</span> to read the frame
<span class="token list punctuation">2.</span> Extract:
   <span class="token list punctuation">-</span> Colors (primary, secondary, text, background)
   <span class="token list punctuation">-</span> Typography (font family, sizes, weights)
   <span class="token list punctuation">-</span> Spacing (padding, margin, gaps)
   <span class="token list punctuation">-</span> Border radius
<span class="token list punctuation">3.</span> Map tokens to Tailwind CSS classes
<span class="token list punctuation">4.</span> Implement component with pixel-perfect accuracy

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),f=n("strong",null,"Figma MCP 能提取的信息",-1),y={href:"https://www.seamgen.com/blog/figma-mcp-complete-guide-to-design-to-code-automation",target:"_blank",rel:"noopener noreferrer"},q=t(`<ul><li><strong>语义化理解</strong>：识别按钮、输入框、卡片等组件类型</li><li><strong>Design Tokens</strong>：提取颜色、字体、间距等变量</li><li><strong>Auto Layout</strong>：理解 Figma 的自动布局，转换为 Flexbox/Grid</li><li><strong>组件关系</strong>：识别主组件和实例的关系</li></ul><p><strong>关键代码示例</strong>：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// Figma MCP 提取的 Token 示例</span>
<span class="token keyword">const</span> designTokens <span class="token operator">=</span> <span class="token punctuation">{</span>
  colors<span class="token operator">:</span> <span class="token punctuation">{</span>
    primary<span class="token operator">:</span> <span class="token string">&quot;#1890ff&quot;</span><span class="token punctuation">,</span>
    secondary<span class="token operator">:</span> <span class="token string">&quot;#52c41a&quot;</span><span class="token punctuation">,</span>
    text<span class="token operator">:</span> <span class="token string">&quot;#333333&quot;</span><span class="token punctuation">,</span>
    background<span class="token operator">:</span> <span class="token string">&quot;#ffffff&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  typography<span class="token operator">:</span> <span class="token punctuation">{</span>
    fontFamily<span class="token operator">:</span> <span class="token string">&quot;Inter, sans-serif&quot;</span><span class="token punctuation">,</span>
    fontSize<span class="token operator">:</span> <span class="token punctuation">{</span>
      sm<span class="token operator">:</span> <span class="token string">&quot;0.875rem&quot;</span><span class="token punctuation">,</span>
      base<span class="token operator">:</span> <span class="token string">&quot;1rem&quot;</span><span class="token punctuation">,</span>
      lg<span class="token operator">:</span> <span class="token string">&quot;1.125rem&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  spacing<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&quot;0.25rem&quot;</span><span class="token punctuation">,</span>
    <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&quot;0.5rem&quot;</span><span class="token punctuation">,</span>
    <span class="token number">4</span><span class="token operator">:</span> <span class="token string">&quot;1rem&quot;</span><span class="token punctuation">,</span>
    <span class="token number">8</span><span class="token operator">:</span> <span class="token string">&quot;2rem&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  borderRadius<span class="token operator">:</span> <span class="token punctuation">{</span>
    sm<span class="token operator">:</span> <span class="token string">&quot;0.25rem&quot;</span><span class="token punctuation">,</span>
    md<span class="token operator">:</span> <span class="token string">&quot;0.5rem&quot;</span><span class="token punctuation">,</span>
    lg<span class="token operator">:</span> <span class="token string">&quot;1rem&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-方法-2-design-token-pipeline" tabindex="-1"><a class="header-anchor" href="#_3-4-方法-2-design-token-pipeline" aria-hidden="true">#</a> 3.4 方法 2：Design Token Pipeline</h3><p>如果无法使用 Figma MCP，可以建立手工的 Token 同步流程。</p><p><strong>步骤 1：从 Figma 导出 Token</strong></p>`,6),w={href:"https://www.figma.com/community/plugin/888356632271791737",target:"_blank",rel:"noopener noreferrer"},x=t(`<div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// tokens.json</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;primary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#1890ff&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;secondary&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#52c41a&quot;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;spacing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;sm&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;8px&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;md&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;16px&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;lg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;24px&quot;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤 2：转换为 Tailwind 配置</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// tailwind.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">extend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">colors</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">primary</span><span class="token operator">:</span> <span class="token string">&quot;#1890ff&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">secondary</span><span class="token operator">:</span> <span class="token string">&quot;#52c41a&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">spacing</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">sm</span><span class="token operator">:</span> <span class="token string">&quot;8px&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">md</span><span class="token operator">:</span> <span class="token string">&quot;16px&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">lg</span><span class="token operator">:</span> <span class="token string">&quot;24px&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤 3：AI 按 Token 实现</strong></p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>Implement UserListPage using the design tokens from @tailwind.config.js.

Requirements:
<span class="token list punctuation">-</span> Use <span class="token code-snippet code keyword">\`text-primary\`</span> instead of hardcoded <span class="token code-snippet code keyword">\`#1890ff\`</span>
<span class="token list punctuation">-</span> Use <span class="token code-snippet code keyword">\`p-md\`</span> instead of <span class="token code-snippet code keyword">\`padding: 16px\`</span>
<span class="token list punctuation">-</span> All spacing values must come from Tailwind theme

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-方法-3-视觉-diff-自动校验-最强" tabindex="-1"><a class="header-anchor" href="#_3-5-方法-3-视觉-diff-自动校验-最强" aria-hidden="true">#</a> 3.5 方法 3：视觉 Diff 自动校验（最强）</h3><p><strong>流程</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Figma Screenshot
    ↓
Rendered UI Screenshot
    ↓
Visual Diff Agent (对比差异)
    ↓
生成差异报告
    ↓
Auto Fix (自动调整)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>工具链</strong>：</p><ol><li><strong>Playwright</strong>：截取 UI 截图</li><li><strong>Pixelmatch</strong>：对比图片差异</li><li><strong>AI 分析</strong>：识别差异类型（颜色、间距、字体）</li><li><strong>自动修复</strong>：调整 CSS</li></ol><p><strong>实现示例</strong>：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// visual-diff.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> test<span class="token punctuation">,</span> expect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@playwright/test&quot;</span><span class="token punctuation">;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&quot;UserListPage should match Figma design&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> page <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">goto</span><span class="token punctuation">(</span><span class="token string">&quot;/users&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 截取实际 UI</span>
  <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">screenshot</span><span class="token punctuation">(</span><span class="token punctuation">{</span> path<span class="token operator">:</span> <span class="token string">&quot;actual.png&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 加载 Figma 截图</span>
  <span class="token keyword">const</span> expected <span class="token operator">=</span> <span class="token string">&quot;figma-screenshots/user-list-desktop.png&quot;</span><span class="token punctuation">;</span>

  <span class="token comment">// 对比差异</span>
  <span class="token keyword">const</span> diff <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">compareScreenshots</span><span class="token punctuation">(</span><span class="token string">&quot;actual.png&quot;</span><span class="token punctuation">,</span> expected<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 允许 1% 的差异</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>diff<span class="token punctuation">.</span>percent<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeLessThan</span><span class="token punctuation">(</span><span class="token number">0.01</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自动修复逻辑</strong>：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>You are the <span class="token bold"><span class="token punctuation">**</span><span class="token content">Visual Diff Agent</span><span class="token punctuation">**</span></span>.

Context:
<span class="token list punctuation">-</span> Expected: @figma-screenshots/user-list-desktop.png
<span class="token list punctuation">-</span> Actual: @screenshots/actual.png
<span class="token list punctuation">-</span> Diff Report: @diff-report.json

Task: Analyze the visual diff and fix the CSS.

Diff Analysis:
<span class="token list punctuation">-</span> Margin top: expected 16px, actual 12px (+4px)
<span class="token list punctuation">-</span> Font size: expected 14px, actual 16px (-2px)
<span class="token list punctuation">-</span> Border radius: expected 8px, actual 4px (+4px)

Fix these issues in @src/components/UserListPage.tsx

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>推荐工具</strong>：</p><ul><li><strong>Playwright</strong>：UI 截图</li><li><strong>Percy</strong>：视觉回归测试平台</li><li><strong>Chromatic</strong>：Storybook 官方视觉测试</li></ul><h3 id="_3-6-最佳实践-像素级对齐的-css-规范" tabindex="-1"><a class="header-anchor" href="#_3-6-最佳实践-像素级对齐的-css-规范" aria-hidden="true">#</a> 3.6 最佳实践：像素级对齐的 CSS 规范</h3><p><strong>规则 1：使用 rem 而非 px</strong></p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* ❌ Bad */</span>
<span class="token selector">.button</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* ✅ Good */</span>
<span class="token selector">.button</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 1rem<span class="token punctuation">;</span>      <span class="token comment">/* 16px */</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 0.875rem<span class="token punctuation">;</span> <span class="token comment">/* 14px */</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>规则 2：使用 Design Tokens</strong></p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* ❌ Bad */</span>
<span class="token selector">.card</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #ffffff<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* ✅ Good */</span>
<span class="token selector">.card</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--color-background<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--radius-md<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--spacing-md<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>规则 3：避免 Magic Numbers</strong></p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* ❌ Bad */</span>
<span class="token selector">.user-table</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 37px<span class="token punctuation">;</span> <span class="token comment">/* 为什么是 37px？ */</span>
<span class="token punctuation">}</span>

<span class="token comment">/* ✅ Good */</span>
<span class="token selector">.user-table</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--spacing-lg<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* 使用语义化的 Token */</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>规则 4：响应式优先</strong></p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* ❌ Bad - 固定宽度 */</span>
<span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* ✅ Good - 响应式 */</span>
<span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">max-width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0 <span class="token function">var</span><span class="token punctuation">(</span>--spacing-md<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="四、推荐工具链与-skills" tabindex="-1"><a class="header-anchor" href="#四、推荐工具链与-skills" aria-hidden="true">#</a> 四、推荐工具链与 Skills</h2><h3 id="_4-1-核心工具" tabindex="-1"><a class="header-anchor" href="#_4-1-核心工具" aria-hidden="true">#</a> 4.1 核心工具</h3><table><thead><tr><th>工具</th><th>用途</th><th>推荐场景</th></tr></thead><tbody><tr><td><strong>Cursor</strong></td><td>AI 代码编辑器</td><td>主要开发环境</td></tr><tr><td><strong>Claude Code</strong></td><td>命令行 AI 助手</td><td>复杂推理任务</td></tr><tr><td><strong>GitHub Copilot</strong></td><td>代码补全</td><td>日常编码</td></tr><tr><td><strong>Playwright</strong></td><td>E2E 测试</td><td>UI 验证</td></tr><tr><td><strong>Storybook</strong></td><td>组件文档</td><td>UI 开发</td></tr><tr><td><strong>Figma</strong></td><td>设计工具</td><td>设计稿源</td></tr></tbody></table><h3 id="_4-2-mcp-服务器推荐" tabindex="-1"><a class="header-anchor" href="#_4-2-mcp-服务器推荐" aria-hidden="true">#</a> 4.2 MCP 服务器推荐</h3>`,30),A=n("thead",null,[n("tr",null,[n("th",null,"MCP Server"),n("th",null,"功能"),n("th",null,"官方链接")])],-1),_=n("td",null,[n("strong",null,"figma-mcp")],-1),S=n("td",null,"读取 Figma 设计稿",-1),I={href:"https://github.com/anthropics/anthropic-cookbook/tree/main/misc/mcp",target:"_blank",rel:"noopener noreferrer"},P=n("td",null,[n("strong",null,"repo-mcp")],-1),U=n("td",null,"访问代码仓库",-1),T={href:"https://github.com/anthropics/anthropic-cookbook/tree/main/misc/mcp",target:"_blank",rel:"noopener noreferrer"},C=n("td",null,[n("strong",null,"postgres-mcp")],-1),F=n("td",null,"数据库操作",-1),D={href:"https://github.com/anthropics/anthropic-cookbook/tree/main/misc/mcp",target:"_blank",rel:"noopener noreferrer"},R=n("td",null,[n("strong",null,"playwright-mcp")],-1),E=n("td",null,"浏览器自动化",-1),M={href:"https://github.com/nicholasoxford/playwright-mcp",target:"_blank",rel:"noopener noreferrer"},L=n("td",null,[n("strong",null,"http-mcp")],-1),B=n("td",null,"HTTP 请求",-1),G={href:"https://github.com/nicholasoxford/http-mcp",target:"_blank",rel:"noopener noreferrer"},N=t(`<h3 id="_4-3-skills-推荐" tabindex="-1"><a class="header-anchor" href="#_4-3-skills-推荐" aria-hidden="true">#</a> 4.3 Skills 推荐</h3><p><strong>需求阶段</strong>：</p><ul><li><code>requirement-analysis</code></li><li><code>user-story-generation</code></li><li><code>scope-splitting</code></li></ul><p><strong>设计阶段</strong>：</p><ul><li><code>architecture-design</code></li><li><code>frontend-pattern</code></li><li><code>component-splitting</code></li></ul><p><strong>实现阶段</strong>：</p><ul><li><code>task-breakdown</code></li><li><code>dependency-graph</code></li><li><code>parallelization</code></li></ul><p><strong>验证阶段</strong>：</p><ul><li><code>ui-diff</code></li><li><code>requirement-check</code></li><li><code>type-check</code></li></ul><hr><h2 id="五、最佳实践与常见陷阱" tabindex="-1"><a class="header-anchor" href="#五、最佳实践与常见陷阱" aria-hidden="true">#</a> 五、最佳实践与常见陷阱</h2><h3 id="_5-1-最佳实践" tabindex="-1"><a class="header-anchor" href="#_5-1-最佳实践" aria-hidden="true">#</a> 5.1 最佳实践</h3><p><strong>1. 小步迭代，频繁验证</strong></p><p>不要试图一次性完成所有功能：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>❌ Bad: &quot;Implement the entire admin dashboard&quot;

✅ Good: 
<span class="token list punctuation">-</span> Iteration 1: User list page
<span class="token list punctuation">-</span> Iteration 2: User edit page
<span class="token list punctuation">-</span> Iteration 3: Permission management

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 保持文档同步</strong></p><p>每次代码变更后，更新相关文档：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 提交前检查</span>
<span class="token function">npm</span> run validate
<span class="token function">npm</span> run docs:update
<span class="token function">git</span> <span class="token function">add</span> docs/ specs/ tasks/

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 使用共享 Spec</strong></p><p>避免每个功能重复定义技术栈：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> specs/coding.spec.md (通用规范)</span>
<span class="token list punctuation">-</span> Framework: React 18
<span class="token list punctuation">-</span> UI Library: Ant Design 5
<span class="token list punctuation">-</span> State Management: React Query
<span class="token list punctuation">-</span> Styling: Tailwind CSS
<span class="token list punctuation">-</span> Testing: Vitest + Playwright

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4. 多模型对比审查</strong></p><p>对于关键代码，使用不同模型生成，对比质量：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Cursor 中的实践</span>
Generate UserListPage using Claude <span class="token number">3.5</span>
Generate UserListPage using GPT-4
Compare both implementations and choose the best

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5. 人类审查不可少</strong></p>`,25),V={href:"https://www.ibm.com/think/insights/ai-agents-2025-expectations-vs-reality",target:"_blank",rel:"noopener noreferrer"},H=t(`<blockquote><p>“人类将始终保持在循环中。即使 AI 模型决定项目工作流程，人类审查仍然是确保质量和安全的关键。”</p></blockquote><h3 id="_5-2-常见陷阱" tabindex="-1"><a class="header-anchor" href="#_5-2-常见陷阱" aria-hidden="true">#</a> 5.2 常见陷阱</h3><p><strong>陷阱 1：过度依赖 AI</strong></p><p>❌ 问题：盲目接受 AI 生成的代码，不加审查<br> ✅ 解决：建立审查清单，逐项检查</p><p><strong>陷阱 2：Spec 过于抽象</strong></p><p>❌ 问题：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> Bad Spec</span>
Implement user list with table.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>✅ 解决：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> Good Spec</span>
Implement UserListPage with:
<span class="token list punctuation">-</span> Ant Design Table component
<span class="token list punctuation">-</span> Columns: name, email, status, actions
<span class="token list punctuation">-</span> Pagination: 10 items per page
<span class="token list punctuation">-</span> Search: debounce 300ms
<span class="token list punctuation">-</span> Loading: Ant Design Spin overlay

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>陷阱 3：忽视边缘情况</strong></p><p>❌ 问题：只处理 happy path<br> ✅ 解决：在 Spec 中明确列出边缘情况</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">##</span> Edge Cases</span>
<span class="token list punctuation">-</span> Empty state: show &quot;No users found&quot;
<span class="token list punctuation">-</span> Loading error: show error message with retry button
<span class="token list punctuation">-</span> Network timeout: show toast notification

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>陷阱 4：多 Agent 协作混乱</strong></p><p>❌ 问题：多个 Agent 同时修改同一文件<br> ✅ 解决：明确文件所有权</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>File Ownership:
<span class="token list punctuation">-</span> UI Agent: src/components/<span class="token bold"><span class="token punctuation">**</span><span class="token content">, src/styles/</span><span class="token punctuation">**</span></span>
<span class="token list punctuation">-</span> API Agent: src/services/<span class="token bold"><span class="token punctuation">**</span><span class="token content">, src/api/</span><span class="token punctuation">**</span></span>
<span class="token list punctuation">-</span> State Agent: src/hooks/<span class="token bold"><span class="token punctuation">**</span><span class="token content">, src/store/</span><span class="token punctuation">**</span></span>
<span class="token list punctuation">-</span> Test Agent: src/*<span class="token italic"><span class="token punctuation">*</span><span class="token content">/</span><span class="token punctuation">*</span></span>.test.ts, e2e/**

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>陷阱 5：文档与代码脱节</strong></p><p>❌ 问题：代码更新了，文档还是旧的<br> ✅ 解决：将文档更新纳入 Definition of Done</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Pre-commit hook</span>
<span class="token function">npm</span> run validate
<span class="token function">npm</span> run docs:sync

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="六、完整案例-用户列表页面" tabindex="-1"><a class="header-anchor" href="#六、完整案例-用户列表页面" aria-hidden="true">#</a> 六、完整案例：用户列表页面</h2><h3 id="_6-1-prd-文档" tabindex="-1"><a class="header-anchor" href="#_6-1-prd-文档" aria-hidden="true">#</a> 6.1 PRD 文档</h3><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> /docs/prd/001-user-list.md</span>

<span class="token title important"><span class="token punctuation">#</span> Feature: User List Page</span>

<span class="token title important"><span class="token punctuation">##</span> Goals</span>
<span class="token list punctuation">-</span> Display users in a table with pagination
<span class="token list punctuation">-</span> Support search by name/email
<span class="token list punctuation">-</span> Show user status (active/inactive)
<span class="token list punctuation">-</span> Allow admin to view user details

<span class="token title important"><span class="token punctuation">##</span> Non-Goals</span>
<span class="token list punctuation">-</span> Edit user (separate feature)
<span class="token list punctuation">-</span> Delete user (separate feature)
<span class="token list punctuation">-</span> Bulk operations (future iteration)

<span class="token title important"><span class="token punctuation">##</span> User Stories</span>
<span class="token list punctuation">1.</span> As an admin, I want to view all users in a paginated table
<span class="token list punctuation">2.</span> As an admin, I want to search users by name or email
<span class="token list punctuation">3.</span> As an admin, I want to quickly identify active vs inactive users

<span class="token title important"><span class="token punctuation">##</span> Acceptance Criteria</span>
<span class="token list punctuation">-</span> ✅ Table displays: name, email, status, created date, actions
<span class="token list punctuation">-</span> ✅ Pagination shows 10 users per page
<span class="token list punctuation">-</span> ✅ Search works with partial match (case-insensitive)
<span class="token list punctuation">-</span> ✅ Status badge shows green for active, gray for inactive
<span class="token list punctuation">-</span> ✅ Clicking &quot;View&quot; navigates to user detail page
<span class="token list punctuation">-</span> ✅ Empty state shows &quot;No users found&quot; message
<span class="token list punctuation">-</span> ✅ Loading state shows spinner overlay

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-spec-文档" tabindex="-1"><a class="header-anchor" href="#_6-2-spec-文档" aria-hidden="true">#</a> 6.2 Spec 文档</h3><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> /specs/user-list.spec.md</span>

<span class="token title important"><span class="token punctuation">#</span> Spec: User List Page</span>

<span class="token title important"><span class="token punctuation">##</span> Tech Stack</span>
<span class="token list punctuation">-</span> React 18.3
<span class="token list punctuation">-</span> Ant Design 5.x
<span class="token list punctuation">-</span> React Query 5.x
<span class="token list punctuation">-</span> Tailwind CSS 3.x
<span class="token list punctuation">-</span> React Router 6.x

<span class="token title important"><span class="token punctuation">##</span> Components</span>

<span class="token title important"><span class="token punctuation">###</span> Pages</span>
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`UserListPage\`</span> (src/pages/UserListPage.tsx)

<span class="token title important"><span class="token punctuation">###</span> Components</span>
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`UserSearchForm\`</span> (src/components/UserSearchForm.tsx)
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`UserTable\`</span> (src/components/UserTable.tsx)
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`StatusBadge\`</span> (src/components/StatusBadge.tsx)

<span class="token title important"><span class="token punctuation">###</span> Services</span>
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`userService\`</span> (src/services/userService.ts)
  <span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`getUsers(params): Promise&lt;UserListResponse&gt;\`</span>

<span class="token title important"><span class="token punctuation">###</span> Hooks</span>
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`useUsers\`</span> (src/hooks/useUsers.ts)

<span class="token title important"><span class="token punctuation">##</span> API Contract</span>

<span class="token title important"><span class="token punctuation">###</span> GET /api/users</span>

Query Parameters:
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`page\`</span> (number, default: 1)
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`pageSize\`</span> (number, default: 10)
<span class="token list punctuation">-</span> <span class="token code-snippet code keyword">\`search\`</span> (string, optional)

Response:
\`\`\`json
{
  &quot;users&quot;: [
    {
      &quot;id&quot;: &quot;string&quot;,
      &quot;name&quot;: &quot;string&quot;,
      &quot;email&quot;: &quot;string&quot;,
      &quot;status&quot;: &quot;active&quot; | &quot;inactive&quot;,
      &quot;createdAt&quot;: &quot;ISO 8601 date string&quot;
    }
  ],
  &quot;total&quot;: number,
  &quot;page&quot;: number,
  &quot;pageSize&quot;: number
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="state-management" tabindex="-1"><a class="header-anchor" href="#state-management" aria-hidden="true">#</a> State Management</h2><ul><li>Use React Query’s <code>useQuery</code> for data fetching</li><li>Cache key: <code>[&#39;users&#39;, page, search]</code></li><li>Stale time: 30 seconds</li><li>Retry: 1 time on failure</li></ul><h2 id="styling" tabindex="-1"><a class="header-anchor" href="#styling" aria-hidden="true">#</a> Styling</h2><ul><li>Use Tailwind CSS utility classes</li><li>Follow Ant Design theming</li><li>Responsive breakpoints: <ul><li>Mobile: &lt; 768px</li><li>Tablet: 768px - 1024px</li><li>Desktop: &gt; 1024px</li></ul></li></ul><h2 id="file-structure" tabindex="-1"><a class="header-anchor" href="#file-structure" aria-hidden="true">#</a> File Structure</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>src/
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-tasks-文档" tabindex="-1"><a class="header-anchor" href="#_6-3-tasks-文档" aria-hidden="true">#</a> 6.3 Tasks 文档</h3><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> /tasks/user-list.tasks.md</span>

<span class="token title important"><span class="token punctuation">#</span> Tasks: User List Page</span>

<span class="token title important"><span class="token punctuation">##</span> Phase 1: Foundation (parallel)</span>

<span class="token title important"><span class="token punctuation">###</span> Type Definitions</span>
<span class="token list punctuation">-</span> [ ] Create <span class="token code-snippet code keyword">\`src/types/user.ts\`</span> with User and UserListResponse types

<span class="token title important"><span class="token punctuation">###</span> Services</span>
<span class="token list punctuation">-</span> [ ] Create <span class="token code-snippet code keyword">\`src/services/userService.ts\`</span> with getUsers function
<span class="token list punctuation">-</span> [ ] Add axios instance with base URL
<span class="token list punctuation">-</span> [ ] Add error handling for API failures

<span class="token title important"><span class="token punctuation">###</span> Hooks</span>
<span class="token list punctuation">-</span> [ ] Create <span class="token code-snippet code keyword">\`src/hooks/useUsers.ts\`</span> with React Query hook
<span class="token list punctuation">-</span> [ ] Implement search debouncing (300ms)

<span class="token title important"><span class="token punctuation">##</span> Phase 2: UI Components (parallel)</span>

<span class="token title important"><span class="token punctuation">###</span> StatusBadge</span>
<span class="token list punctuation">-</span> [ ] Create <span class="token code-snippet code keyword">\`src/components/StatusBadge.tsx\`</span>
<span class="token list punctuation">-</span> [ ] Use Ant Design Tag component
<span class="token list punctuation">-</span> [ ] Colors: green for active, gray for inactive

<span class="token title important"><span class="token punctuation">###</span> UserSearchForm</span>
<span class="token list punctuation">-</span> [ ] Create <span class="token code-snippet code keyword">\`src/components/UserSearchForm.tsx\`</span>
<span class="token list punctuation">-</span> [ ] Use Ant Design Input.Search
<span class="token list punctuation">-</span> [ ] Add debounced onChange handler

<span class="token title important"><span class="token punctuation">###</span> UserTable</span>
<span class="token list punctuation">-</span> [ ] Create <span class="token code-snippet code keyword">\`src/components/UserTable.tsx\`</span>
<span class="token list punctuation">-</span> [ ] Use Ant Design Table component
<span class="token list punctuation">-</span> [ ] Columns: name, email, status, createdAt, actions
<span class="token list punctuation">-</span> [ ] Add &quot;View&quot; button in actions column

<span class="token title important"><span class="token punctuation">##</span> Phase 3: Page Assembly</span>

<span class="token list punctuation">-</span> [ ] Create <span class="token code-snippet code keyword">\`src/pages/UserListPage.tsx\`</span>
<span class="token list punctuation">-</span> [ ] Compose UserSearchForm + UserTable
<span class="token list punctuation">-</span> [ ] Add pagination controls
<span class="token list punctuation">-</span> [ ] Add loading state (Spin overlay)
<span class="token list punctuation">-</span> [ ] Add empty state message

<span class="token title important"><span class="token punctuation">##</span> Phase 4: Routing</span>

<span class="token list punctuation">-</span> [ ] Add route <span class="token code-snippet code keyword">\`/users\`</span> to React Router config
<span class="token list punctuation">-</span> [ ] Add navigation link in sidebar

<span class="token title important"><span class="token punctuation">##</span> Phase 5: Testing</span>

<span class="token list punctuation">-</span> [ ] Write unit tests for StatusBadge
<span class="token list punctuation">-</span> [ ] Write unit tests for UserSearchForm
<span class="token list punctuation">-</span> [ ] Write integration tests for UserListPage
<span class="token list punctuation">-</span> [ ] Write E2E test for search flow

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-实现示例" tabindex="-1"><a class="header-anchor" href="#_6-4-实现示例" aria-hidden="true">#</a> 6.4 实现示例</h3><p><strong>UI Agent 执行</strong>：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>You are the <span class="token bold"><span class="token punctuation">**</span><span class="token content">UI Agent</span><span class="token punctuation">**</span></span>.

Tasks: Implement UserTable component

Spec: @specs/user-list.spec.md
Design Tokens: @tailwind.config.js

Requirements:
<span class="token list punctuation">-</span> Use Ant Design Table
<span class="token list punctuation">-</span> Follow Tailwind CSS conventions
<span class="token list punctuation">-</span> Responsive design (mobile-first)

Columns:
<span class="token list punctuation">1.</span> Name (sortable)
<span class="token list punctuation">2.</span> Email
<span class="token list punctuation">3.</span> Status (use StatusBadge component)
<span class="token list punctuation">4.</span> Created At (format: YYYY-MM-DD)
<span class="token list punctuation">5.</span> Actions (View button)

Create file: src/components/UserTable.tsx

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>生成的代码</strong>：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// src/components/UserTable.tsx</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Table<span class="token punctuation">,</span> Button <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;antd&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> EyeOutlined <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@ant-design/icons&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> ColumnsType <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;antd/es/table&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> StatusBadge <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./StatusBadge&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> User <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/types/user&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> dayjs <span class="token keyword">from</span> <span class="token string">&quot;dayjs&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">UserTableProps</span> <span class="token punctuation">{</span>
  users<span class="token operator">:</span> User<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  loading<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  <span class="token function-variable function">onView</span><span class="token operator">:</span> <span class="token punctuation">(</span>userId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">UserTable</span><span class="token punctuation">(</span><span class="token punctuation">{</span> users<span class="token punctuation">,</span> loading<span class="token punctuation">,</span> onView <span class="token punctuation">}</span><span class="token operator">:</span> UserTableProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> columns<span class="token operator">:</span> ColumnsType<span class="token operator">&lt;</span>User<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&quot;Name&quot;</span><span class="token punctuation">,</span>
      dataIndex<span class="token operator">:</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span>
      key<span class="token operator">:</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span>
      sorter<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      className<span class="token operator">:</span> <span class="token string">&quot;font-medium&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&quot;Email&quot;</span><span class="token punctuation">,</span>
      dataIndex<span class="token operator">:</span> <span class="token string">&quot;email&quot;</span><span class="token punctuation">,</span>
      key<span class="token operator">:</span> <span class="token string">&quot;email&quot;</span><span class="token punctuation">,</span>
      className<span class="token operator">:</span> <span class="token string">&quot;text-gray-600&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&quot;Status&quot;</span><span class="token punctuation">,</span>
      dataIndex<span class="token operator">:</span> <span class="token string">&quot;status&quot;</span><span class="token punctuation">,</span>
      key<span class="token operator">:</span> <span class="token string">&quot;status&quot;</span><span class="token punctuation">,</span>
      <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>StatusBadge status<span class="token operator">=</span><span class="token punctuation">{</span>status<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&quot;Created At&quot;</span><span class="token punctuation">,</span>
      dataIndex<span class="token operator">:</span> <span class="token string">&quot;createdAt&quot;</span><span class="token punctuation">,</span>
      key<span class="token operator">:</span> <span class="token string">&quot;createdAt&quot;</span><span class="token punctuation">,</span>
      <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span>date<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">dayjs</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;YYYY-MM-DD&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      className<span class="token operator">:</span> <span class="token string">&quot;text-gray-500&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      title<span class="token operator">:</span> <span class="token string">&quot;Actions&quot;</span><span class="token punctuation">,</span>
      key<span class="token operator">:</span> <span class="token string">&quot;actions&quot;</span><span class="token punctuation">,</span>
      <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span>_<span class="token punctuation">,</span> record<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>Button
          type<span class="token operator">=</span><span class="token string">&quot;link&quot;</span>
          icon<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">&lt;</span>EyeOutlined <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">}</span>
          onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">onView</span><span class="token punctuation">(</span>record<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">}</span>
          className<span class="token operator">=</span><span class="token string">&quot;text-primary&quot;</span>
        <span class="token operator">&gt;</span>
          View
        <span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>Table<span class="token operator">&lt;</span>User<span class="token operator">&gt;</span>
      columns<span class="token operator">=</span><span class="token punctuation">{</span>columns<span class="token punctuation">}</span>
      dataSource<span class="token operator">=</span><span class="token punctuation">{</span>users<span class="token punctuation">}</span>
      loading<span class="token operator">=</span><span class="token punctuation">{</span>loading<span class="token punctuation">}</span>
      rowKey<span class="token operator">=</span><span class="token string">&quot;id&quot;</span>
      pagination<span class="token operator">=</span><span class="token punctuation">{</span><span class="token boolean">false</span><span class="token punctuation">}</span>
      className<span class="token operator">=</span><span class="token string">&quot;bg-white rounded-lg shadow-sm&quot;</span>
    <span class="token operator">/</span><span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="七、总结-harness-engineering-的核心价值" tabindex="-1"><a class="header-anchor" href="#七、总结-harness-engineering-的核心价值" aria-hidden="true">#</a> 七、总结：Harness Engineering 的核心价值</h2><h3 id="_7-1-核心收益" tabindex="-1"><a class="header-anchor" href="#_7-1-核心收益" aria-hidden="true">#</a> 7.1 核心收益</h3><ol><li><strong>意图精确传递</strong>：从 PRD → Spec → Tasks → Code，每一步都有明确的映射</li><li><strong>并行开发效率</strong>：多 Agent 同时工作，开发速度提升 3-5 倍</li><li><strong>质量可控</strong>：自动验证 + 人工审查，确保代码符合标准</li><li><strong>文档同步</strong>：文档即代码，永远不会脱节</li><li><strong>可追溯性</strong>：每个功能都能追溯到原始需求</li></ol><h3 id="_7-2-关键成功因素" tabindex="-1"><a class="header-anchor" href="#_7-2-关键成功因素" aria-hidden="true">#</a> 7.2 关键成功因素</h3><ol><li><strong>结构化文档</strong>：PRD、Spec、Tasks 必须清晰、完整、可执行</li><li><strong>MCP 工具链</strong>：选择合适的 MCP 服务器，连接 AI 与外部世界</li><li><strong>多 Agent 协作</strong>：明确职责分工，避免冲突</li><li><strong>持续验证</strong>：每个阶段都要验证，不要等到最后</li><li><strong>人类监督</strong>：AI 是工具，人类是决策者</li></ol><h3 id="_7-3-未来展望" tabindex="-1"><a class="header-anchor" href="#_7-3-未来展望" aria-hidden="true">#</a> 7.3 未来展望</h3>`,44),j={href:"https://thenewstack.io/2025s-radical-frontend-ai-shift/",target:"_blank",rel:"noopener noreferrer"},Y=t('<blockquote><p>“2025 年最激进的前端变革是生成式 UI（Generative UI）的兴起，界面由 AI 根据用户提示动态组装。”</p></blockquote><p>Harness Engineering 是通向这一未来的桥梁。通过结构化的文档驱动和 AI Agent 协作，我们正在重新定义软件开发的范式：</p><ul><li><strong>从&quot;写代码&quot;到&quot;描述意图&quot;</strong></li><li><strong>从&quot;手工实现&quot;到&quot;自动生成&quot;</strong></li><li><strong>从&quot;单兵作战&quot;到&quot;AI 团队协作&quot;</strong></li></ul><hr><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>',5),z={href:"https://www.anthropic.com/news/model-context-protocol",target:"_blank",rel:"noopener noreferrer"},Q={href:"https://cursor.com/blog/agent-best-practices",target:"_blank",rel:"noopener noreferrer"},O={href:"https://www.replay.build/blog/bridging-the-figma-to-production-gap-with-automated-token-to-code-mapping",target:"_blank",rel:"noopener noreferrer"},W={href:"https://www.ibm.com/think/insights/ai-agents-2025-expectations-vs-reality",target:"_blank",rel:"noopener noreferrer"},K={href:"https://thenewstack.io/2025s-radical-frontend-ai-shift/",target:"_blank",rel:"noopener noreferrer"},X={href:"https://www.digitalapplied.com/blog/ai-agent-orchestration-workflows-guide",target:"_blank",rel:"noopener noreferrer"},J={href:"https://www.seamgen.com/blog/figma-mcp-complete-guide-to-design-to-code-automation",target:"_blank",rel:"noopener noreferrer"},Z={href:"https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html",target:"_blank",rel:"noopener noreferrer"},$=n("hr",null,null,-1),nn=n("blockquote",null,[n("p",null,[s("“Harness Engineering 不是替代开发者，而是让开发者从重复劳动中解放，专注于创造性工作。”"),n("br"),s(" — 本文核心理念")])],-1),sn=n("p",null,"引用自",-1),an={href:"https://www.zayfen.com/posts/harness-engineering-frontend-guide/",target:"_blank",rel:"noopener noreferrer"};function en(tn,ln){const a=l("ExternalLinkIcon");return o(),p("div",null,[r,n("p",null,[d,s("（来源："),n("a",u,[s("Anthropic 官方"),e(a)]),s("）：")]),v,n("p",null,[m,s("（来源："),n("a",k,[s("Cursor 官方最佳实践"),e(a)]),s("）：")]),b,n("p",null,[s("根据 "),n("a",g,[s("Replay.build 的研究"),e(a)]),s("：")]),h,n("p",null,[f,s("（来源："),n("a",y,[s("Figma MCP 完全指南"),e(a)]),s("）：")]),q,n("p",null,[s("使用 Figma 插件（如 "),n("a",w,[s("Design Tokens"),e(a)]),s("）导出：")]),x,n("table",null,[A,n("tbody",null,[n("tr",null,[_,S,n("td",null,[n("a",I,[s("Anthropic"),e(a)])])]),n("tr",null,[P,U,n("td",null,[n("a",T,[s("Anthropic"),e(a)])])]),n("tr",null,[C,F,n("td",null,[n("a",D,[s("Anthropic"),e(a)])])]),n("tr",null,[R,E,n("td",null,[n("a",M,[s("Community"),e(a)])])]),n("tr",null,[L,B,n("td",null,[n("a",G,[s("Community"),e(a)])])])])]),N,n("p",null,[s("AI 生成的代码必须经过人工审查（来源："),n("a",V,[s("IBM AI Agents 2025 报告"),e(a)]),s("）：")]),H,n("p",null,[s("根据 "),n("a",j,[s("The New Stack 的 2025 前端 AI 趋势报告"),e(a)]),s("：")]),Y,n("ol",null,[n("li",null,[n("a",z,[s("Anthropic - Model Context Protocol"),e(a)])]),n("li",null,[n("a",Q,[s("Cursor - Agent Best Practices"),e(a)])]),n("li",null,[n("a",O,[s("Replay.build - Bridging the Figma-to-Production Gap"),e(a)])]),n("li",null,[n("a",W,[s("IBM - AI Agents 2025: Expectations vs. Reality"),e(a)])]),n("li",null,[n("a",K,[s("The New Stack - 2025’s Radical Frontend AI Shift"),e(a)])]),n("li",null,[n("a",X,[s("Digital Applied - AI Agent Orchestration Workflows Guide"),e(a)])]),n("li",null,[n("a",J,[s("Seamgen - Figma MCP: Complete Guide to Design-to-Code Automation"),e(a)])]),n("li",null,[n("a",Z,[s("Martin Fowler - Spec-Driven Development Tools"),e(a)])])]),$,nn,sn,n("p",null,[n("a",an,[s("Harness Engineering：前端 AI 驱动的工程化实践完全指南 | zayfEn'Closure"),e(a)])])])}const pn=i(c,[["render",en],["__file","harness-engineering-frontend-guide.html.vue"]]);export{pn as default};
