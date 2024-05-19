
# Define the image name and container name
IMAGE_NAME = ravendb-image
CONTAINER_NAME = ravendb-container 

# Default target
all: build run

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
run:
	docker run -d -p 8080:8080 -p 38888:38888 --name $(CONTAINER_NAME) $(IMAGE_NAME)

# Stop the Docker container
stop:
	docker stop $(CONTAINER_NAME)

# Remove the Docker container
remove:
	docker rm $(CONTAINER_NAME)

# Clean up: stop and remove the container
clean: stop remove

# Rebuild the image and restart the container
restart: clean build run
