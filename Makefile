dev-up:
	docker compose -f docker-compose.dev.yml up

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-restart: dev-down dev-up

dev-psql:
	docker exec -it backend-postgres-1 psql -U quiz_site

create-jwt-keys:
	mkdir keys
	ssh-keygen -t rsa -b 4096 -m PEM -f ./keys/authPrivate.key -N ''
	openssl rsa -in ./keys/authPrivate.key -pubout -outform PEM -out ./keys/authPublic.key