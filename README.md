# lisse-shop - Telegram mini-app
lisse-shop -- это интернет-магазин качественной реплики брендовых товаров, таких как AirPods различных версий.

## Демонстрация приложения

Приложение доступно в мессенджере Telegram по адресу: @lisseshopBot

## Функциональность

- Просмотр информации о магазине. 
- Просмотр каталога товаров, их цены, описание и артикулы. 
- Возможность добавить товар в корзину.
- Возможность оформления товара из корзины.
- Возможность отслеживать статусы доставки, такие как: "Не оплачено", "Оплачено", "На сборке", "Отправлено" и "Доставлено".

## Технологии

- HTML
- CSS
- Vue.js
- FastAPI
- Python 3.6
- ORM

## Запуск и работа с mini-app

1. Зайдите в бота по ссылке:
```bash
@lisseshopBot
```

2. Нажмите или введите для начала:
```bash
/start
```

3. Нажмите на сообщение от бота для перехода в web-app:
```bash
За покупками
```

## Структура проекта

```
├── .cursor/
│ └── rules/
│ └── start.mdc
├── backend/
│ ├── core/
│ │ ├── init .py
│ │ ├── dal.py
│ │ └── schemas.py
│ ├── alembic/
│ │ ├── README
│ │ ├── env.py
│ │ └── script.py.mako
│ ├── src/
│ │ ├── modules/
│ │ │ ├── goods.py
│ │ │ ├── orders.py
│ │ │ ├── orders_goods.py
│ │ │ ├── users.py
│ │ │ └── init .py
│ │ ├── database.py
│ │ ├── models.py
│ │ └── repository.py
│ ├── routers/
│ │ ├── goods/
│ │ │ └── init .py
│ │ ├── order_goods/
│ │ │ └── init .py
│ │ ├── orders/
│ │ │ └── init .py
│ │ └── users/
│ │ ├── init .py
│ │ ├── dal.py
│ │ ├── repository.py
│ │ ├── router.py
│ │ └── schemas.py
│ └── init .py
├── bot/
│ ├── dialogs/
│ ├── handlers/
│ ├── states/
│ ├── Dockerfile
│ ├── config.py
│ └── main.py
├── frontend/
│ ├── .vite/deps/
│ ├── public/
│ └── src/
└── init .py        
```
## Разработчик

Клишин С.А. 
