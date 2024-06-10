## Chat API NestJS

Приложение представляет собой API чата на NestJS.

### Инструкции по запуску приложения в docker-контейнере

1) склонировать данный репозиторий `git clone https://github.com/karintsev52rus/chat-api.git`
2) создать в корне проекта конфигурационный файл .env и заполнить его как в примере (.example.env)
3) перейти в терминале в корневую папку проекта и ввести команду `docker compose up`

### Методы API

- Создание пользователя: `curl --header "Content-Type: application/json" \
--request POST \
--data '{"username": "user_1"}' \
http://localhost:9000/users/add`

- Создание чата: `curl --header "Content-Type: application/json" \
--request POST \
--data '{"name": "chat_1", "users": ["<USER_ID_1>", "<USER_ID_2>"]}' \
http://localhost:9000/chats/add`

- Создание сообщения от лица пользователя: `curl --header "Content-Type: application/json" \
--request POST \
--data '{"chat": "<CHAT_ID>", "author": "<USER_ID>", "text": "hi"}' \
http://localhost:9000/messages/add`

- Получение всех чатов пользователя: `curl --header "Content-Type: application/json" \
--request POST \
--data '{"user": "<USER_ID>"}' \
http://localhost:9000/chats/get`

- Получение сообщений из конкретного чата: `curl --header "Content-Type: application/json" \
--request POST \
--data '{"chat": "<CHAT_ID>"}' \
http://localhost:9000/messages/get`
