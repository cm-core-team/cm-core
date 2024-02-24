FROM oven/bun:latest AS builder

WORKDIR /

COPY packages/ packages/
COPY package.json .
COPY bun.lockb .

RUN bun i --dev


FROM builder AS runtime

WORKDIR /app

COPY --from=builder /package.json .
COPY --from=builder /bun.lockb .
COPY --from=builder /node_modules .
COPY --from=builder /packages ./packages

CMD ["bun", "test", "--verbose", "--preload", "./packages/integration-tests/setupTests.ts", "--timeout", "15000", "packages/integration-tests"]
