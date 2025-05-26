FROM golang:1.24-alpine

RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/* \
    && go install github.com/air-verse/air@latest

ENV GO111MODULE=on

# show Go version
ENV PATH=$PATH:/root/go/bin
RUN go version

# Set the current working directory
WORKDIR /root/app

# Copy go mod and sum files to the workspace
COPY backend/go.mod backend/go.sum ./

# Download all dependencies
RUN go mod download

# Copy the source code into the container
COPY backend/ .

# Expose port 8080 for the application
EXPOSE 8080

# Command to run the application with realize for hot reloading
CMD ["air"]
