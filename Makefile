unit:
	npm run test

lint: 
	npm run lint

check:
	npm run check

format: 
	npm run format

up:
	docker-compose -f ./docker-compose.yaml build
	docker-compose -f ./docker-compose.yaml up -d --force-recreate

down:
	docker-compose -f ./docker-compose.yaml down --remove-orphans

migrate:
	npm run migrate

generate:
	npm run migrate:generate