FROM oven/bun:latest

WORKDIR /root/app

COPY packages/ packages/
COPY package.json .
COPY bun.lockb .

RUN bun i --dev

CMD ["bun", "test", "--verbose", "--preload", "./packages/integration-tests/setupTests.ts", "--timeout", "15000", "packages/integration-tests"]
