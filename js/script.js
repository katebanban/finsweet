Fancybox.bind("[data-fancybox]", {
});


//* MENU
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-btn');
const menuLinks = document.querySelectorAll('.menu a'); // нашли все ссылки, что находятся в классе .menu
const header = document.querySelector('.header'); // нашли header

menuBtn.addEventListener('click', function() {
	menu.classList.toggle('active');
	menuBtn.classList.toggle('active');
	document.body.classList.toggle('no-scroll');
	header.classList.toggle('active');
});

// после нажатия на любой пункт меню оно закроется
for (let i = 0; i < menuLinks.length; i++) {
	let menuLink = menuLinks[i]; // получаем каждую отдельную ссылку

	menuLink.addEventListener('click', function() {
		menu.classList.remove('active');
		menuBtn.classList.remove('active');
		document.body.classList.remove('no-scroll');
		header.classList.remove('active');
	});
}


//* ПЕРЕМЕЩАЕМ БЛОК С НОМЕРОМ В МЕНЮ (на экране 1024px)
const headerContact = document.querySelector('.header__contact');
const headerBody = document.querySelector('.header__body');
const screen = window.matchMedia('(max-width: 1024px)');

function moveElement(screen) {
	if (screen.matches) {
		menu.prepend(headerContact); // prepend перемещает в начало
	} else {
		headerBody.append(headerContact); // append перемещает в конец
	}
}

moveElement(screen);
screen.addListener(moveElement);


//* АВТОВЫЧИСЛЕНИЕ ВЫСОТЫ ШАПКИ
//! размещаем в коде именно ПОСЛЕ переноса блока с номером в меню (чтобы над блоком с номером не было огромного оступа сверху после переноса в меню)
const headerHeight = header.offsetHeight; // создали переменную, в которую ложим актуальную высоту шапки
const root = document.querySelector(':root'); // нашли папку root (хранилище переменных)

root.style.setProperty('--header-height', `${headerHeight}px`); // заменили переменную с заданной высотой шапки из CSS на переменную с актуальной высотой шапки из JS


//* СОРТИРОВКА СТАТЕЙ
// находим массив с кнопками переключения
const allCategoryBtn = document.querySelectorAll('.categories__btn');
// находим массив со статьями
const allArticles = document.querySelectorAll('.article');
const listContainer = document.querySelector('.blog__articles-list');

//* ФУНКЦИИ
// Сортировка статей по категориям
function sortArticles(category) {
	// переводим из NodeList в Array наши статьи, чтобы можно было пользоваться методои sort
	let allArticlesArray = Array.from(allArticles);

	// отсортировать статьи в порядке убывания (b - a)
	allArticlesArray.sort(function (a, b) {
		// указываем ключ в квадратных скобках, т.к. мы ссылаемся на переменную category
		return b.dataset[category] - a.dataset[category];
	});

	// добавить отсортрованный список обратно
	allArticlesArray.forEach((article) => {
		listContainer.appendChild(article);
	})
}

// перебор массива кнопок
allCategoryBtn.forEach(function (btn) {
	btn.addEventListener('click', function () {
		// опять перебираем массив, чтобы у всех кнопок забрать класс active
		allCategoryBtn.forEach(function (btn) {
			btn.classList.remove('active');
		})

		// добавляем класс active нажатой кнопке
		btn.classList.add('active');
		const currentBtnName = btn.getAttribute('data-btn');

		// прячем все элементы списка
		allArticles.forEach(function (article) {
			article.remove();
		})

		// отсортировать массив со статьями
		if (currentBtnName === 'latest') {
			sortArticles('id'); // 'id' === указываем по какому типу сортировать
		}

		// отсортировать массив со статьями
		if (currentBtnName === 'popular') {
			sortArticles('views');
		}

		// отсортировать массив со статьями
		if (currentBtnName === 'favorites') {
			sortArticles('likes');
		}
	})
})

// когда страница загрузится
window.addEventListener('load', function() {
	sortArticles('id');
})

