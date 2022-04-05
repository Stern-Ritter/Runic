# Проект "Runic"

## Описание проекта

![Coverage](https://github.com/Stern-Ritter/Runic/actions/workflows/coverage.yml/badge.svg)
![Sanity-check](https://github.com/Stern-Ritter/Runic/actions/workflows/sanity-check.yml/badge.svg)

Мобильное приложение для отслеживания тренировок.

## Идея проекта

Мобильное приложение, которое позволит пользователю отслеживать свои тренировки по бегу: дистанцию, время, темп, калории, маршрут на карте.
Проект на текущий момент тестировался только для android смартфонов.

## Функциональность проекта

![1. Preview](https://github.com/Stern-Ritter/images/blob/5a905fe01e19c07250d02f823cfe81c69e08ef6c/1.%20Preview.jpg?raw=true)

### Экран регистрации":

![2. Registration form](https://github.com/Stern-Ritter/images/blob/5a905fe01e19c07250d02f823cfe81c69e08ef6c/2.%20Registration%20form.jpg?raw=true)

1. Форма регистрации нового пользователя;

### Экран аутентификации":

![3. Authentication form](https://github.com/Stern-Ritter/images/blob/5a905fe01e19c07250d02f823cfe81c69e08ef6c/3.%20Authentication%20form.jpg?raw=true)

1. Форма входа в приложение дл зарегистрированного пользователя;

### Главный экран тренировки:

![4. Map](https://github.com/Stern-Ritter/images/blob/5a905fe01e19c07250d02f823cfe81c69e08ef6c/4.%20Map.jpg?raw=true)

1. Запрос разрешения на отслеживание геопозиции пользователя;
1. Начало, пауза, завершение тренировки;
1. Отрисовка маркеров начала и завершения тренировки, маршрута тренировки на карте;
1. Отслеживание основных показателей: время, расстояние, темп, калории;
1. При завершении данные о тренировке сохраняются в Firebase Firestore для данного пользователя.

### Экран списка тренировок:

![5. Activity-list](https://github.com/Stern-Ritter/images/blob/5a905fe01e19c07250d02f823cfe81c69e08ef6c/5.%20Activity-list.jpg?raw=true)

1. Отображение списка тренировок за последние 7 дней;
1. Изменение с помощью фильтров диапазона дат отображаемых тренировок;
1. Удаление тренировок;

### Экран аналитики:

![6. Analytics- progress ring](https://github.com/Stern-Ritter/images/blob/5a905fe01e19c07250d02f823cfe81c69e08ef6c/6.%20Analytics-%20progress%20ring.jpg?raw=true)

1. 'Кольца прогресса' для показаталей: дистанция, калории (используются данные тренировок за последнюю неделю и соотносятся с установленными целями);  
   ![7. Analytics - line chart](https://github.com/Stern-Ritter/images/blob/5a905fe01e19c07250d02f823cfe81c69e08ef6c/7.%20Analytics%20-%20line%20chart.jpg?raw=true)
2. Линейная диграмма для показателя дистация за последние 6 месяцев;  
   ![8. Analytics - contribution graph](https://github.com/Stern-Ritter/images/blob/5a905fe01e19c07250d02f823cfe81c69e08ef6c/8.%20Analytics%20-%20contribution%20graph.jpg?raw=true)
3. Тепловая карта для отображения активности по показателю дистанция за последние 130 дней.

### Экран настроек пользователя:

![9. Profile settings](https://github.com/Stern-Ritter/images/blob/5a905fe01e19c07250d02f823cfe81c69e08ef6c/9.%20Profile%20settings.jpg?raw=true)

1. Измение личных данных пользователя;
2. Изменение целей на неделю для показателей: дистанция, калории;
3. Смена пользователя, выход из аккаунта.

## Использованные технологии

- React-native
- React
- Expo
- Redux
- TypeScript,
- Firebase FireStore,
- Enzyme,
- ESLint,
- Prettier.
