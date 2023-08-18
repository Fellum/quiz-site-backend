dev-up:
	docker compose -f docker-compose.dev.yml up

dev-create-volume:
	docker volume create quizpostgres

dev-start: dev-create-volume dev-up


dev-delete-volume:
	docker volume rm quizpostgres

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-restart: dev-down dev-delete-volume dev-up
