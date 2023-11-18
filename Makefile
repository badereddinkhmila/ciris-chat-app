#*============================================================================*#
#*=====*                          Start App	                            *=====*#
#*============================================================================*#
.PHONY: docker-start

docker-start:
		@docker compose up

local-deps-install:
		cd frontend && npm install && cd ../backend && npm install

local-serve:
		cd frontend && npm run dev & cd backend && npm run start:dev