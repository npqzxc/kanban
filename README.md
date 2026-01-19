# 🎯 Kanban Board - 看板任务管理系统

[![Docker](https://img.shields.io/badge/Docker-Compose-blue)](https://www.docker.com/)
[![Go](https://img.shields.io/badge/Go-1.21-00ADD8)](https://golang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1)](https://www.mysql.com/)

## 📝 项目介绍

这是一个类似 Trello 的看板任务管理系统,实现了任务的拖拽管理和实时数据同步。

**核心功能:**
- ✅ 任务的创建、编辑、删除
- 🔄 拖拽式任务状态切换 (Todo → Doing → Done)
- 💾 实时数据持久化
- 🎨 现代化 UI 设计
- 🐳 Docker 一键部署

## 🛠️ 技术栈

### 前端
- **React 18** - UI 框架
- **@hello-pangea/dnd** - 拖拽功能库
- **Axios** - HTTP 请求
- **CSS3** - 样式设计

### 后端
- **Go 1.21** - 后端语言
- **Gin** - Web 框架
- **GORM** - ORM 框架
- **MySQL Driver** - 数据库驱动

### 数据库
- **MySQL 8.0** - 关系型数据库

### 容器化
- **Docker** - 容器技术
- **Docker Compose** - 服务编排

## 🚀 快速开始

### 前置要求
- Docker >= 20.10
- Docker Compose >= 2.0

### 一键启动

```bash
# 克隆项目
git clone <your-repo-url>
cd kanban

# 启动所有服务
docker compose up -d

# 查看服务状态
docker compose ps
```

### 访问应用

- **前端应用**: http://localhost:3000
- **后端 API**: http://localhost:8080/api
- **健康检查**: http://localhost:8080/health

### 停止服务

```bash
# 停止所有服务
docker compose down

# 停止并删除数据卷
docker compose down -v
```

## 📁 项目结构

```
kanban/
├── frontend/                # 前端应用
│   ├── src/
│   │   ├── App.js          # 主组件
│   │   ├── App.css         # 样式文件
│   │   └── index.js        # 入口文件
│   ├── public/
│   ├── Dockerfile          # 前端容器配置
│   └── package.json        # 依赖配置
│
├── backend/                 # 后端应用
│   ├── main.go             # 主程序
│   ├── Dockerfile          # 后端容器配置
│   └── go.mod              # Go 模块配置
│
├── docker-compose.yml       # 服务编排配置
└── README.md               # 项目文档
```

## 🔌 API 接口

### 获取所有任务
```bash
GET /api/tasks
```

### 创建任务
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "任务标题",
  "description": "任务描述",
  "status": "todo"
}
```

### 更新任务
```bash
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "更新的标题",
  "description": "更新的描述",
  "status": "doing",
  "position": 0
}
```

### 删除任务
```bash
DELETE /api/tasks/:id
```

## 🎨 功能演示

1. **创建任务**: 点击 "New Task" 按钮创建新任务
2. **拖拽任务**: 鼠标拖拽任务卡片在不同列之间移动
3. **删除任务**: 点击任务卡片右上角的 × 按钮删除任务

### 任务状态

- **📝 To Do** (待办) - 蓝色
- **⚡ In Progress** (进行中) - 橙色
- **✅ Done** (已完成) - 绿色

## 🐳 Docker 配置说明

### 服务说明

| 服务 | 端口 | 描述 |
|------|------|------|
| frontend | 3000:80 | React 前端应用 |
| backend | 8080:8080 | Go API 服务 |
| db | 3306:3306 | MySQL 数据库 |

### 环境变量

后端服务支持以下环境变量:

- `DB_HOST`: 数据库主机 (默认: db)
- `DB_PORT`: 数据库端口 (默认: 3306)
- `DB_USER`: 数据库用户 (默认: kanban)
- `DB_PASSWORD`: 数据库密码 (默认: kanban123)
- `DB_NAME`: 数据库名称 (默认: kanban)
- `PORT`: 后端服务端口 (默认: 8080)

## 📊 数据库设计

### tasks 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键,自增 |
| title | VARCHAR | 任务标题 |
| description | TEXT | 任务描述 |
| status | VARCHAR | 任务状态 (todo/doing/done) |
| position | INT | 排序位置 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

## 🔧 开发说明

### 本地开发 (前端)

```bash
cd frontend
npm install
npm start
```

### 本地开发 (后端)

```bash
cd backend
go mod download
go run main.go
```

### 重新构建镜像

```bash
# 重新构建所有服务
docker compose build --no-cache

# 重新构建特定服务
docker compose build backend
docker compose build frontend
```

## 📝 注意事项

1. 首次启动时,后端会自动创建数据库表结构
2. 数据库数据持久化在 Docker volume 中
3. 前端通过 Nginx 反向代理访问后端 API
4. 所有服务都配置了健康检查

## 🎯 验收标准

✅ 执行 `docker compose up` 后,浏览器访问 `localhost:3000` 即可正常使用  
✅ 前后端及数据库均已 Docker 化  
✅ 支持任务的拖拽操作  
✅ 数据实时同步到数据库  
✅ UI 美观,具备商业级交付标准  

## 📄 License

MIT

---

**Prompt2Repo 准入考核项目** - 展示 AI Native 开发能力
