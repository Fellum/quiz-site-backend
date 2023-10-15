dev-up:
	docker compose -f docker-compose.dev.yml up

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-restart: dev-down dev-up

dev-psql:
	docker exec -it backend-postgres-1 psql -U quiz_site

create-jwt-keys:
	mkdir -p keys

	ssh-keygen -t rsa -b 4096 -m PEM -f ./keys/authAccessPrivate.key -N ''
	openssl rsa -in ./keys/authAccessPrivate.key -pubout -outform PEM -out ./keys/authAccessPublic.key

	ssh-keygen -t rsa -b 4096 -m PEM -f ./keys/authRefreshPrivate.key -N ''
	openssl rsa -in ./keys/authRefreshPrivate.key -pubout -outform PEM -out ./keys/authRefreshPublic.key
