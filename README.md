# Автотесты для проекта [Дашборд-Админка](https://github.com/MaksimusWeb/admin-dashboard)

![Playwright Tests](https://github.com/MaksimusWeb/dashboard-autotests/actions/workflows/playwright.yml/badge.svg)
![Node.js](https://img.shields.io/badge/node-20-green)
![Playwright](https://img.shields.io/badge/playwright-1.58.1-blue)

## Тестовые сценарии:

1. <a id="login"></a>Логин в админку:

- Переход на [сайт](https://admin-dashboard-eight-rust-37.vercel.app/)
- Авторизация: автоввод данных через переменные(уникальный Email)
- Проверка успешного входа администратора

2. <a id="addingUser"></a>Добавление пользователя:

- Предусловие с [логином](#login)
- Переход на страницу с "Пользователи"
- Добавление юзера в таблицу через специальную форму "Добавить пользователя"
- Заполнение данных нового юзера через переменные
- Проверка наличия юзера в таблице

3. Изменение пользователя:

- Предусловие с [логином](#login)
- Предусловие с [добавлением юзера](#addingUser)
- Поиск юзера по уникальному Email
- Редактирование имени, email и роли через новые переменные
- Проверка изменений в таблице

4. Удаление пользователя:

- Предусловие с [логином](#login)
- Предусловие с [добавлением юзера](#addingUser)
- Поиск юзера по уникальному Email и удаление юзера из таблицы
- Обработка alert/confirm при удалении
- Проверка, что пользователь удалён

## Запуск тестов

- npm install
- npx playwright install
- npx playwright test или npx playwright test "имя теста, к примеру add-user.spec.js" --headed(для наглядности)
