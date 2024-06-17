## Отчет по бэкенду
Структура проекта: 
```
FinalProject/
    backend/
        database/
            create_tables.sql
            data.sqlite
        models/
            model.py
        main.py
    frontend/
        ...
    requirements.txt
```
Инструкция по развертыванию:
1. Клонировать репозиторий
2. Перейти в корневую директорию проекта
* `cd FinalProject`
3. Создать и активировать виртуальное окружение
* `python -m venv venv`
* `venv\Scripts\activate`
4. Установить необходимые пакеты
* `pip install -r requirements.txt`
5. Запустить сервер FastAPI
* `uvicorn backend.main:app --reload`
6. API доступен по адресу http://127.0.0.1:8000
    
   Реализованы 2 запроса:
   * `GET /buildings`
   * `GET /chart`
   
   Ответ: JSON-образная строка.

База данных (директория /backend/database): 
* Готовая БД SQLite - data.sqlite
* Скрипт для создания таблиц - /backend/database/create_tables.sql
