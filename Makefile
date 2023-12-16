.PHONY: all db-access rebuild down integration-test

UNAME ?= postgres
DBNAME ?= cms-db
CONTAINER ?= cong-manager-db-1


all:
	@echo "Specify a command to run."

db-access:
	docker exec -it $(CONTAINER) psql -U $(UNAME) -d $(DBNAME)

rebuild:
	docker compose up --build

down:
	docker compose -f docker-compose.yml -f docker-compose.test.yml down

integration-tests:
	docker compose -f docker-compose.yml -f docker-compose.test.yml build
	docker compose -f docker-compose.yml up -d

	docker compose -f docker-compose.yml -f docker-compose.test.yml run --rm integration-test

	docker compose -f docker-compose.yml -f docker-compose.test.yml down
