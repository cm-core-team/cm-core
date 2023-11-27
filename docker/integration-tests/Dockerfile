FROM debian:buster-slim

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y nodejs unzip npm curl \
    && curl -fsSL https://bun.sh/install | bash \
    && echo 'export PATH="$HOME/.bun/bin:$PATH"' >> $HOME/.bashrc

ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /root/app

COPY packages/ packages/
COPY package.json .
COPY bun.lockb .

RUN bun i --dev

CMD ["bun", "test", "--verbose", "--preload", "./packages/integration-tests/setupTests.ts", "--timeout", "15000", "packages/integration-tests"]
