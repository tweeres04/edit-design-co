ssh server -T <<'EOL'
	cd edit-design-co && \
	git fetch && git reset --hard origin/main && \
	docker compose up --build -d
EOL
