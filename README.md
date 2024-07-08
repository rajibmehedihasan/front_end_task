# Chat Assistant

This project is a chat assistant web application using Flask and OpenAI's GPT-3.5 Turbo.

## Running Locally

To run this application locally, ensure you have Python installed. Follow these steps:

1. Install dependencies:

    ```sh
    pip install flask openai
    ```

2. Run the application:
    ```sh
    python app.py
    ```

The app will be accessible at `http://127.0.0.1:5000`.

## Running with Docker

To run this application using Docker, follow these steps:

1. Build the Docker image:

    ```sh
    docker build -t chat-assistant .
    ```

2. Run the Docker container:
    ```sh
    docker run -p 5000:5000 chat-assistant
    ```

The app will be accessible at `http://127.0.0.1:5000`.
