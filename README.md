# SIP chrome-расширение для звонков.

Для установки расширения в режиме браузера использовать команду `npm run build`, загружать как распакованное расширение только папку `dist`.

Расширение проверяет, зарегистрирован ли пользователь на сервере и после проверки открывает окно наборной панели (dialpad), если пользователь зарегистрирован. Если пользователь не зарегистрирован на сервере, выводится форма с возможностью регистрации.

Также есть история звонков. При нажатии на иконку телефона инициируется звонок контакту. Для звонка последнему контакту из истории звонков также используется шорткат `ctrl + Enter`

При звонке осуществляется переход на страницу с информацией о текущем звонке - длительность звонка, статус звонка, номер контакта и кнопка сброса звонка. 
Есть возможность принимать входящие звонки.

На иконку расширения навешивается бейдж с текущим статусом звонка.

Расширение можно запустить как приложение командой `npm start`.
