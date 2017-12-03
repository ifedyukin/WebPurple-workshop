# Мой блог!

## О воркшопе
В ходе воркшопа мы освоим основные принципы работы "клиент-серверных" web-приложений на примере создания простой версии блоговой CMS, а так же поработаем с публичными API на примере социальной сети ВКонтакте.

Начнём с серверной части, которая будет написана на... JavaScript (потому что он клёвый :wink:), NodeJS и `Express`. Мы научимся принимать запросы и отвечать на них, а дальше реализуем несложный REST-like API.

Клиентская часть будет реализована, конечно, на JavaScript с библиотекой `ReactJS`. Мы рассмотрим компонентный подход и его применение при создании frontend'а.

В качестве базы данных воспользуемся документоориентированной СУБД `MongoDB` вместе с ODM для неё `Mongoose`, потому что в нашем случае она наиболее удобна, да и вообще NoSQL - стильно, модно и молодёжно.

## Прежде, чем начать
> :exclamation: Если вы выполняете эти задания на компьютере, расположенном в аудитории, то этот пункт пропускаем.

Для начала установим необходимый софт, если его ещё нет (все названия - ссылки на странички для загрузки):
* [NodeJS](https://nodejs.org/en/) и npm - чтобы исполнять `.js`-файлы в соответствующией среде и удобно управлять нужными пакетами (npm, скорее всего, установится вместе с `NodeJS`);
* [Git](https://git-scm.com/) - система контроля версий, нужна для корректной работы `npm` (а вообще очень полезная штука, если вы ещё не знакомы с ней, то обязательно хоть немного изучите);
* [VS Code](https://code.visualstudio.com/) - где-то же нужно писать код (да, мы будем писать код). Если вы привыкли к чему-то другому, то этот пункт можно пропустить.

Теперь нам нужно развернуть проект локально, на компьютере, и запустить его. Для этого откроем `Консоль/"Командную строку"/"git bash"` и ввёдем следующий набор команд:
* Клонируем репозиторий
  ```bash
  git clone https://github.com/ifedyukin/WebPurple-workshop
  ```
* Переходим в директорию проекта
  ```bash
  cd WebPurple-workshop
  ```
* Устанавливаем зависимости
  ```bash
  npm install
  ```
* Запускаем проект
  ```bash
  npm start
  ```
* Открывем в браузере адрес `http://localhost:3030/`
> `Консоль/"Командную строку"/"git bash"` закрывать **не нужно**.

## Общие понятия
В этом блоке мы кратко поговорим о следующих вещах:
* HTML, CSS, JavaScript;
* Клиент-серверные веб-приложения;
* React, JSX;
* NodeJS, Express;
* MongoDB, Mongoose.

> :exclamation: Если вы выполняете эти задания в аудитории, то всю эту информацию вы получите из слайдов и небольшой "лекции-диалога".    
В процессе лекции ~~нужно~~ можно задавать интересующие вопросы.    
В обратном случае можете почитать обо всём этом где-то в Google.

## Практическая часть
> :exclamation: Если вы выполняете эти задания в аудитории, то по любому возникшему вопросу можно обратиться к кому-то из присутствующих "лекторов", они объяснят и помогут.

> :exclamation: Практическую часть, связанную с серверной частью сразу просто так проверить не получится, по этому отнестись к ней нужно наиболее внимательно.

Основная часть приложения уже готова, нам остаётся доработать его до полностью рабочего состояния, что окажется совсем несложным, если вы будете следовать ниже описанным указаниям.    
### Модели
#### Теория
Для начала опишем сущности нашей системы. Для БД все наши сущности - некоторые модели, давайте опишем их.    
Описания моделей (схемы) хранятся в директории `/src/server/models/` в соответствующих файлах.    
Рассмотрим, схему пользователя (`/src/server/models/user.js`).
```javascript
const UserSchema = new Schema({
  login: { type: String, unique: true, lowercase: true, index: true, required: true },
  password: { type: String, required: true }
});
```
В этом сниппете мы создаем и записываем в константу `UserSchema` схему с полями `login` и `password`. Через двоеточие для каждой схемы располагается объект (структура типа `ключ: значение`), описывающий параметры для этого поля.     
Для поля `login` мы задали следующие параметры:
* `type: String` - тип этого поля - "строка";
* `unique: true` - значение поля должно быть уникальным;
* `lowercase: true` - значения этого поля будут храниться в нижнем регистре;
* `index: true` - значения этого поля будут использоваться как индексы объекта;
* `required: true` - поле должно быть обязательно заполнено.

#### Практика
Опишите схему для записи (`/src/server/models/post.js`).    
Запись характеризуется следующими полями: 
* `title` - строка;
* `body` - строка;
* `url` - строка, уникальная;
* `createdAt` - дата, значение по умолчанию - текущая дата;
* `userId` - ссылка на запись пользователя в БД.   
Все поля должны быть **обязательными** для заполнения.    
> Значение по умолчанию задаётся следующим образом: `default: значение`. Текущая дата - `Date.now`.    
Ссылка на запись, описанную другой схемой задаётся так: `type: mongoose.Schema.Types.ObjectId, ref: 'название схемы'`. Название схемы пользователя - `User`.

### Роутинг
#### Теория
Если не углубляться, то сейчас мы объясним серверу с помощью какой функции обрабатывать обращение к определенному адресу. Описания роутов хранятся в директории `/src/server/routes/`.     
Рассмотрим роуты для действий, связанных с пользователями:
```javascript
router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);
```

Описание роута производится вызовом метода роутера, соответствующего типу запроса, параметрами которого являются адрес, на который передан запрос, и функция, которая обработает запрос по этому адресу.    
Таким образом, в первой строке сниппета мы "говорим" роутеру, что `post`-запросы на адрес `/signup` должны обрабатываться функцией `AuthController.signup`.    
Всё слишком просто, поэтому давайте рассмотрим более сложные варианты.
```javascript
router.get('/posts/:url', PostController.getPostByUrl);
```
Мы задаём обработку `get`-запроса на `/posts/:url`. Здесь `:url` - параметр запроса. При обработке запроса к `/posts/*name*` мы можем обратиться к параметру `url` и получить `name`. Т.е. любое значение, стоящее в адресе запроса на месте `:url` будет доступно в функции обработчике по заранее заданному имени `url`.    

```javascript
router.patch('/posts/:id', checkToken, PostController.updatePost);
```
Мы задаём обработку `patch`-запроса на `/posts/:id`, однако, функций-обработчиков передано несколько. В Express широко распространено применение функций промежуточной обработки-"middleware". Сначала запрос будет обработан функцией `checkToken`, в случае успешного выполнения запрос будет передан к `PostController.updatePost`.     
> :exclamation: Более подробно механизм middleware был рассмотрен в презентации.
#### Практика
Описать следующие роуты:
* `get`-запрос на `/posts` обработать с помощью `PostController.getAll`;
* `patch`-запрос на `/posts` с параметром `:id` обработать с помощью `checkToken`, а затем - `PostController.updatePost`;
* `delete`-запрос на `/posts` с параметром `:id` обработать с помощью `checkToken`, а затем - `PostController.deletePost`.


### Контроллеры
#### Теория
Функции-обработчики, которые мы описывали в роутах называются "контроллеры". Они описаны в файлах в директории `src/server/controllers/`.    
Контроллер - простая функция, которая принимает на вход `request` (объект запроса), `response`(объект ответа) и `next` (функция следующего middleware-шага). Её задачей являет обработать запрос и вернуть ответ или передать модифицированный зарос к следующей функции.    
```javascript
export async function create(req, res, next) {
  // Получаем информацию о записи из тела запроса
  const postData = req.body;
  // Получаем id пользователя из запроса
  const userId = req.user._id;
  // Записываем пользователя в авторы поста
  postData.userId = userId;

  let post;
  try {
    // Создаём запись в БД
    post = await Post.create(postData);
  } catch ({ message }) {
    return next({
      status: 400,
      message
    });
  }

  // Записываем созданный пост в объект ответа
  res.post = post;
  // Переходим к следующему обработчику
  next();
}
```
В сниппете представлен метод, создающий запись о новом посте в базе и возвращающий этот пост. Все взаимодествия с БД мы оборачиваем в блок `try...catch`, чтобы собственноручно обрабатывать все ошибки, которые могут возникнуть в процессе работы.     
Помимо этого стоит учитывать, что обращения к БД происходят асинхронно, поэтому перед вызовом этого метода мы должны обозначить, что нужно дождаться выполнения вызова следующим образом `await Post.метод`.     
Для работы с постами в БД мы просто обращаемся к нужным нам методам ранее описанной модели `Post`.    
Нам понадобятся следующие методы:
* `find({ поля })` - вернет массив записей, удовлетворяющих поиску по переданным полям (поля можно не передавать, тогда метод вернет все записи);
* `findOne({ поле })` - вернет одну запись, которая имеет соответствующее значение поля;
* `remove()` - удаляет запись.

Предположим, нам нужно получить запись по `_id`, для этого мы просто обращаемся к соответствующему методу: `post = Post.findOne({ _id })`.     

#### Практика
В файле `src/server/controllers/post.js` доработать методы `getAll`, `getPostByUrl`, `deletePost`.


### ВКонтакте API
#### Теория
Социальная сеть ВКонтакте предоставляет публичный API для работы с сайтом.     
Запросы к API выглядят следующим образом: `https://api.vk.com/method/метод?параметры'&access_token=токен_доступа&v=версия`.     
Для получения записей пользователя мы воспользуемся методом `wall.get` и передадим в него следующие параметры:
* `filter=owner` - получить записи только этого пользователя;
* `owner_id=ID_пользователя` - id пользователя, со стены которого нужно получить записи.     
ID пользователя и токен доступа заданы в файле `src/server/config/index.js`, токен доступа менять не нужно, а вот ID пользователя нужно задать свой.     
Полностью сформированный адрес запроса для получения записей будет выглядеть следующим образом: `'https://api.vk.com/method/wall.get?filter=owner&owner_id=' + vk_user + '&access_token=' + vk_token + '&v=5.69'`.     
Для отправки запроса воспользуемся методом `fetch`, в который передадим нужный адрес, после получения ответа мы должны "разобрать" полученный JSON и записать его в переменную.    
```javascript
const wall = await fetch('https://api.vk.com/method/wall.get?filter=owner&owner_id=' + vk_user + '&access_token=' + vk_token + '&v=5.69')
    .then(response => response.json());
```
Теперь нужно обработать полученные записи, вся информация о них будет храниться в поле `wall.response.items`.    
Для начала отфильтруем записи, воспользуемся методом `filter`: `wall.response.items.filter(post => post.post_type === 'post')`.    
Вызов этого метода вернёт нам только те объекты, что имеют тип `post_type` = `post`. Затем преобразуем каждый из полученных объектов к формату нашей системы с помощью метода `map`, который возвращает массив результатов выполнения функции, переданной в него.
```javascript
const posts = wall.response.items
    .filter(/* условие фильтра */)
    .map(post => ({
      _id: post.id,
      url: `https://vk.com/wall${vk_user}_${post.id}`,
      title: post.copy_history ? '[VK-repost]' : '[VK-post]',
      createdAt: post.date * 1000,
      body: getVkPostBody(post),
      type: 'vk',
    }));
```

#### Практика
В файле `src/server/controllers/post.js` доработать метод `getVk`.

### Создание пользователя
Теперь можно попробовать зарегистрировать нашего пользователя. Для этого нам нужно отправить post-запрос на `/api/signup` со следующими параметрами:
* login;
* password;
* key - ключ из `src/server/config/index.js` - `createKey`.

> :exclamation: Для этого можно обратиться к лекторам или воспользоваться Postman, а так же можно прямо из консоли послать запрос с помощью `fetch`.

С этими данными можно зайти в панель администратора по адресу `localhost:3030/admin` и создать несколько тестовых записей.    
Записи поддерживают MarkDown разметку.

### Получение данных с сервера
На данном этапе разработка серверной части нашей системы завершена. Перейдём к более интересному - клиентской части.    
Большая часть компонентов уже готова, мы свяжем клиентскую часть с серверной и реализуем компонент, отображающий запись.    
#### Теория
Для начала рассмотрим файл `src/client/components/App.jsx`.    
В конструкторе компонента описывается начальное состояние, здесь вы можете изменить заголовок и описание блога, а так же откорректировать ссылки в меню.    
Методы `getVk` и `updatePosts` отвечают за загрузку данных с сервера. Они должны получить JSON с соответствующего адреса, "разобрать" его и записать в соответствующее состояние.
```javascript
// получаем записи из ВКонтакте и сохраняем их
fetch('http://localhost:3030/api/vk')
  .then(response => response.json())
  .then(response => this.setState({ vk: response }));
// получаем записи блога и сохраняем их
fetch('http://localhost:3030/api/posts')
  .then(response => response.json())
  .then(response => this.setState({
    posts: response.posts,
  }));
```
#### Практика
В файле `src/client/components/App.jsx` доработать методы `getVk` и `updatePosts`.    

### Отображение списка записей
#### Теория
Компонент, отображающий список постов описан в файле `src/client/components/posts/PostsList.jsx`. На вход он получает массив объектов записей, а отображает "массив" уже компонентов-записей.    
Для преобразования объектов в компоненты воспользуемся уже известным методом `map`:
```jsx
posts.map(post => <Post key={post._id} {...post} />)
```

#### Практика
Доработать компонент `src/client/components/posts/PostsList.jsx`.

### Отображение конкретной записи
#### Теория
За отображение записей отвечает компонент, описанный в файле `src/client/components/posts/Post.jsx`, а за его стилизацию файл стилей `src/client/styles/post.css`.    
Сам компонент представляет собой блок `<div className="post">...</div>`, внутрь которого должны быть вложены название записи, время публикации и сам текст записи.     
Запись может быть представлена в двух вариантах: на странице списка записей и на отдельной странице. В списке записей при клике на заголовок должен осуществляться переход к странице записи, на странице записи заголовок должен быть некликабельным. 
```jsx
{full ? <h2 className="post-title">{title}</h2> : <Link to={`${url}`}><h2 className="post-title">{title}</h2></Link>}
```
Таким образом мы определяем, что если запись полная, то отображаем просто заголовок, в обратном случае - делаем его ссылкой.    
Дата публикации записи будет обычным текстом, но саму дату мы преобразуем в удобно читаемый вид с помощью функции `convertDate`.
```jsx
<span className="post-date">{convertDate(createdAt)}</span>
```
Содержание поста нам приходит в HTML-формате, поэтому и отображать его нужно несколько необычно:
```jsx
 <div className="post-text" dangerouslySetInnerHTML={{
    __html: body, // здесь body - html-код содержания
  }} />
```
Стилизация компонента производится с помощью CSS. В разметке какого-то блока мы указываем `className="имя_класса"`, затем в файле стилей применяем необходимые нам стили для этого блока:
```css
.имя_класса {
  background-color: red; /* Для всех блоков, у которого в className содержится "имя_класса" задан красный цвет фона */
}
```

#### Практика
В файле `src/client/components/posts/Post.jsx` описать разметку поста. Произвести стилизацию компонента, описав стили в файле `src/client/styles/post.css`.
