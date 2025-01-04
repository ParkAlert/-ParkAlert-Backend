# 使用輕量級 node 鏡像
FROM node:22.12.0-slim

# 啟用 pnpm
RUN corepack enable && corepack prepare pnpm@9.15.2 --activate

# 設置工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安裝所有依賴
RUN pnpm install --frozen-lockfile

# 複製專案程式碼
COPY . .

# 編譯 TypeScript
RUN pnpm build

# 刪除開發依賴，縮小映像檔大小
RUN pnpm prune --prod

# 清理不必要檔案
RUN rm -rf src test

# 暴露埠
EXPOSE 3000

# 啟動應用程式
CMD ["node", "dist/main.js"]
