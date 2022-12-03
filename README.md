1/ 43 урок - контейнерные и презентационные компоненты.
задача контейнерной компоненты удовлетворить нужды презентационной компоненты,
ради которой она и была создана. Задача контейнерной компоненты просто взять и
отрисовать презентационную компоненту и снабдить ее необходимыми данными
Презентационная компонента д.б. "чистая"(т.е. не получать ничего лишнего) и сильно не знависеть от конкретного BLL,
чтобы мы могли возможность переиспользовать её в каком-то другом коде.
А контейнерной компоненте наоборот, можно передать весь store, т.к. она "грязная" компонента.
Оборачиваем компоненту в контейнерную компоненту в том случае, если она выполняет какую-либо логику

2/ 44 урок - контекст.
Используется в случае, когда мы не хотим прокидывать пропсы через кучу компонент,
чтобы в итоге донести их до гр=лубоко вложенной компоненты, т.е. когда в приложении много
слоев компонент.
Используется не всегда, все подряд в него переносить не нужно, но может быть полезен для работы с какими-то
глобальными данными (store, изменить тему, язык и прочее.). Актуальный синтаксис объявления контекста смотреть
в документации реакта. Для меня пока в режиме ознакомления.

1. создание - см. файл StoreContext(архив)
2. оборачиваем App (к примеру) в <StoreContext.Provider value={/* some value */}>, после чего все дети
   обернутой компоненты смогут обращаться к данным из контекста напрямую
3. оборачиваем компоненту, которой нужны данные из контекста в <StoreContext.Consumer> (смотри пример в
   MyPostsContainer)

!!! export type ReduxStoreType = typeof store - команда для создания типа Store из Redux. См. файл redux-store.tsx
исправлено на - export type ReduxStoreType = ReturnType<typeof rootReducer> (из видео по типизации 45 и 49 уроков)

3/ 45 урок - библиотека React-Redux.
Имеет свой Provider (см. index.tsx). По-этому контекст вручную создавать больше не нужно.
connect возвращает нам новую контейнерную компоненту (см. файлы с контейнерными компонентами, напр. DialogsContainer)

пример создания контейнерной компоненты:
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);// во вторых скобках помещаем
презентационную компоненту,
вокруг которой мы хотим создать контейнерную компоненту. Этой строчкой кода мы презентационную компоненту dialogs
законнектили к стору. А в первых скобках указаны функции, которые возвращают презент. компоненте нужные ей пропсы

4/ 47 урок -
store.subscribe(() => {
let state = store.getState();
rerenderEntireTree(state);
}) в index.tsx убираем, т.к. перерисовка теперь происходит за счет локального subscribe в connect контейнерной
компоненты.
НО ВАЖНО - для того, чтобы этот локальный subscribe срабатывал, т.е. происходила перерисовка, при изменении стейта
соблюдать принцип иммутабельности!

5/ 49 урок -
компонента Route отрисовывает указанную в ней компоненту или html-разметку, когда в адресной строке браузера появится
указанный в ее атрибуте адрес.
Если спросят на собесе, зачем нужна строка "import React from "react";", ответ - JSX не работает без реакта
Reducer - это чистая функция, которая принимает старый стейт и action и возвращает измененную копию стейта из этой
функции или старый стейт, если ничего менять не пришлось. Через Reducer идет модификация стейта.
Деструктурировать массив можно двумя путями - при помощи спред-оператора или при помощи .map()

Отрисовываем новую страницу с юзерами:

* Работа начинается с создания reducer (файл users-reducer)
* Далее в redux-store добавляем новую ветку стора (usersPage, которая обслуживается UsersReducer-ом)
* Если нашей новой компоненте нужны пропсы из стора, то мы делаем ее презентационной,
  и создаем над ней контейнерную компоненту (UsersContainer)

6/ Видео по типизации 45 и 49 уроков:
*обязательно типизировать возвращаемые редьюсером значения, а также значения, возвращаемые в функциях
контейнерных компонент (пр. см. UsersContainer)
*типизация Dispatch - см. файл UsersContainer
общие правила типизации:

1 вариант:

1. элементы стейта типизируем в файле с редьюсером к этой части стейта (напр. profile-reducer)
2. тип презентационной компоненты прописываем в файле контейнерной компоненты. Тип презентационной компоненты
   является собирательным из типов функции, возвращающей стейт для этой през. комп., и функции, возвращающей нужные
   коллбэки для этой през. компоненты (см. любой файл с контейнерной компонентой, станет понятно).

2 вариант (более предпочтительный и лёгкий):
см. файл dialogs-reducer

7/ 52 урок - Side Effect
функциональная компонента не должна поизводить никаких Side Effects, а именно:
*делать запросы на сервер
*изменять приходящие к ней параметры
*менять DOM напрямую
*менять какие-дибо внешние переменные

8/ 53 урок - классовые компоненты
классы нужны для создания нескольких однотипных объектов ("штамповки объектов")
constructor класса вызывается в момент вызова "new", вручную не вызывается никогда
классовая компонента возвращает JSX с помощью метода render()

9/ 54 жизненный цикл классовой компоненты
! side-эффекты, в т.ч. запросы на сервер делать не в constructor, а в методе componentDidMount()

10/ 55 pagination (постраничный вывод)
get запрос на сервер всегда ограничивается тольк url-адресом
API - это интерфейс взаимодействия с чем-либо (application program interface)
get параметры для отправки на сервер определены в его API
get параметры в строке браузера начинаются после "?". Пример

- https://social-network.samuraijs.com/api/1.0/users?page=3&count=2

11/ 56 урок
презентационная компонента всегда функциональная, не имеет side-эффектов
т.к. наша user компонента перестала быть чистой (т.к. она делает ajax запросы и перестала быть функциональной),
необходимо создать третью компоненту, функциональную, которая и будет презентационной. А две другие компоненты
(UserContainer и UsersAPIComponent (бывш. User)) станут контейнерными. Вся контейнерная логика (комп. UserContainer и
UsersAPIComponent) лежат в
одном файле - UsersContainer.
!!!UsersAPIComponent переименована в UsersContainer (смотри файл UsersContainer)

12/ 57 урок
Preloader (кружочек загрузки)
кнопка "No throttling" в разделе Network в консоли Chrome позволяет замедлить скорость интернета до
нужных параметров

13/ 58 урок
в контейнерной компоненте UsersContainer избавляемся от функции mapDispatchToProps, вместо нее в connect вторым
параметром передаем объект с АС (подробнее - см.файл UsersContainer), а connect уже самостоятельно приводит этот объект
к тому коду, который был в функции mapDispatchToProps. Цель всего этого - значительное сокращение кода.
Далее переименовали названия функций AC (убрали AC на конце),
чтобы еще больше сократить код (объект, передаваемый вторым параметром в connect).

14/ 59 урок
<Route path={'/dialogs'}
render={() => <DialogsContainer/>}/> - в path после '/dialogs' может стоять что угодно, не важно,
компонента все равно отрисуется, главное, чтобы был /dialogs в адресной строке

15/ 60 урок
HOC WithRouter
функция WithRouter аналог connect. Она также создает контейнерную компоненту и передаёт данные в виде пропсов из
контейнерной в дочернюю компоненту, но в отличие от connect, данные для прокидки в пропсы она берет не из state, а из
URL.
(как правильно до нужных нам данных достучаться, см. через debugger)

Итого нашу изначальную презентационную компоненту Profile мы обернули еще в 3 контейнерных:

1. ProfileContainer (для отправки запроса на сервер, делает "грязную" работу)
2. Далее ProfileContainer обернули в WithUrlDataContainerComponent (передаем из WithUrlDataContainerComponent в
   ProfileContainer
   данные из URL)
3. WithUrlDataContainerComponent обернули еще в одну контейнерную комп. с помощью connect для передачи в нее пропсов из
   state

16/ 61 урок. Логинизация
при кроссдоменном запросе (когда, например, у нас сайт загружен через порт 3000, а за данными мы идем на другой домен,
в данном случае апишка соцсети) при запросе на сервер авторизация автоматически может не происходить (даже если в файле
куки
указано, что мы авторизованы), так устроена политика безопасности браузера. Чтобы этого избежать, при отправке запроса
на сервер в команде axios.get вторым параметром нужно указать этот объект:
{ withCredentials: true } (см. файл HeaderContainer)

17/ 62 урок. Follow-unfollow API

!!!Затипизировать 61 урок (работа с хедером)
