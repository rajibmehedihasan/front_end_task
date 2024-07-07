#Python Image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the required packages
RUN pip install --no-cache-dir flask openai gunicorn

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run container
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]