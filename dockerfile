# 使用带有Node.js的官方Playwright Docker镜像作为基础镜像
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# 设置工作目录
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "test"]
