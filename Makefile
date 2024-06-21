build:
		docker build -t sibarifly-dashboard-webapp --build-arg VITE_API_URL=/api .
run:
		docker run --rm -p 8080:8080 sibarifly-dashboard-webapp

.PHONY: build clean
