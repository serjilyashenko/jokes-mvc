FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && \
    pnpm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 3000

USER node

CMD ["node", "dist/main"]