.PHONY: all db-access

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
	docker compose down
