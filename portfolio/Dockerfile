# Use a minimal base image with Python 3.12 installed
FROM python:3.14-slim

# Install curl for healthchecks, then clean up to reduce image size
RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container to /app
WORKDIR /app

# Copy only the requirements file first (for better layer caching)
COPY requirements.txt .

# Install Python dependencies without keeping cache (reduces image size)
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .