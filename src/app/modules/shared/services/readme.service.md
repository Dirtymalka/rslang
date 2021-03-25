
# Примеры получения данных из провайдеров.
Интерфейсы объектов прописаны в каждом из сервисов внизу
## Работа со словами
### Слова
        const words = await WordService.getWords(0, 0); // Получение слов по группе и странице
        const wordsPageCount = await WordService.getWordsPageCount(1, 30, 133); // Получение количества страниц - группа 1, больше 30 слов в предложении, 133 слова на странице
        const wordsExt = await WordService.getWordsExt(1, wordsPageCount, 30, pageSize); // Получение слов с заданием количества слов в предложении и размером страницы

### Слова пользователя
        const userWords = await WordService.getUserWords(); // Получение всех слов пользователя
        const userWord = await WordService.getUserWord(userWords[0].wordId); // Получение слова пользователя по id
        const newUserWord = words[6];
        const userWordPost = await WordService.postWord(newUserWord.id, WordService.createWordPost('weak', false, false)); // Добавление слова пользователю. createWordPost используется для типизации сохраняемых данных. По мере необходимости будет расширяться
        const userWordPut = await WordService.putWord(userWordPost.wordId, WordService.createWordPost('hard', userWordPost.optional.isDel, true)); // Обновление слова пользователя
        const userWordDel = await WordService.deleteWord(userWordPut.wordId); // Удаление слова у пользователя

### Агригированные запросы (слово + слово пользователя)
        const userAggWord = await WordService.getUserAggWord(userWordPut.wordId); // Получение агригированного слова по id
        const userAggWords = await WordService.getUserAggWords(0, { 'userWord.difficulty': 'hard' }); // Получение списка агрегированных слов по группе, фильтру, количеству слов на странице
Примеры фильтраций:
Фильтр по объединенным полям слов. Это должен быть строковый объект, который соответствует условиям объекта запроса MongoDB.
Получите все слова, у которых difficulte="hard и optional.key="value"
        {"$and":[{"userWord.difficulty":"hard", "userWord.optional.key":"value"}]}
Получите все слова, у которых difficulty equal="easy" или слово не сохранено у пользователя
        {"$or":[{"userWord.difficulty":"easy"},{"userWord":null}]}
Получите все слова, у которых difficulty equal="easy" и optional.repeat=true, или слово не сохранено у пользователя
        {"$or":[{"$and":[{"userWord.difficulty":"easy", "userWord.optional.repeat":true}]},{"userWord":null}]}

## Работа с настройками
        const setting = await SettingService.get(); // Получить настройки пользователя
        const settingPut = await SettingService.put(SettingService.createObject(1, 'test')); // Сохранить настройки пользователя. createObject используется для типизации сохраняемых данных. По мере необходимости будет расширяться. Возможно не потребуется

## Работа со статистикой
        const statistic = await StatisticService.get(); // Получить статистику пользователя
        const statisticPut = await StatisticService.put(StatisticService.createObject(1, true)); // Сохранить статистику пользователя. createObject используется для типизации сохраняемых данных. По мере необходимости будет расширяться. Возможно не потребуется
