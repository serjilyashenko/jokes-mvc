FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable
RUN pnpm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]