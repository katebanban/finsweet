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


//* SWIPER
const testimonialsSlider = new Swiper('.testimonials-slider', {
	slidesPerView: 1,
	spaceBetween: 48,
	loop: true,
	autoHeight: true, //! Чтобы пагинация и стрелки не стояли на месте, когда слайды разной высоты, а двигались вверх/вниз

	// Стрелки навигации
	navigation: {
		nextEl: ".testimonials-slider__btn-next",
		prevEl: ".testimonials-slider__btn-prev",
	},

	// Пагинация (точки)
	pagination: {
		el: ".testimonials-slider__pagination",
		clickable: true,
	},

	// Адаптив (свыше 1024px будет показано 2 слайда, при 1024px и ниже = 1 слайд)
	breakpoints: {
		1025: {
			slidesPerView: 2,
		}
	}
})


//* SPOILER
const allSpoilerEl = document.querySelectorAll('.spoiler');

allSpoilerEl.forEach((spoiler) => {
	let title = spoiler.querySelector('.spoiler__title'); // spoiler.children[0]
	let content = spoiler.querySelector('.spoiler__content'); // spoiler.children[1]
	let contentHeight = content.scrollHeight; // scrollHeight взяли из инструмента разработчика

	if (spoiler.classList.contains('active')) {
		content.style.height = `${contentHeight}px`;
	} else {
		content.style.height = 0;
	}

	title.addEventListener('click', () => {
		if (spoiler.classList.contains('active')) {
			spoiler.classList.remove('active');
			content.style.height = 0;
		} else {
			spoiler.classList.add('active');
			content.style.height = `${contentHeight}px`;
		}
	})
})


//* CUSTOM SELECT
const select = document.querySelector('[data-select]');
const selectInput = document.querySelector('[data-select-input]');
const selectList = document.querySelector('[data-select-list]');
const allSelectItems = document.querySelectorAll('[data-select-list] li');

// убираем возможность что-то писать в input
selectInput.setAttribute('readonly', "");

// при нажатии переключает (включает/выключает) класс active ===> список выпадает/прячется и стрелочка переворачивается вверх/вниз
selectInput.addEventListener('click', () => {
	selectList.classList.toggle('active');
	select.classList.toggle('active');
})

// перебираем все пункты списка селектора
allSelectItems.forEach((item) => {
	// при нажатии на пункт списка
	item.addEventListener('click', () => {
		// сначала уберётся класс active у ВСЕХ пунктов списка
		allSelectItems.forEach((item) => {
			item.classList.remove('active');
		})

		// затем класс active ДОБАВИТСЯ непосредственно к нажатому пункту списка и УБЕРЁТСЯ у списка и у селектора (чтобы после нажатия на пункт списка -> список спрятался, а стрелка селектора повернулась в обратную сторону)
		item.classList.add('active');
		selectList.classList.remove('active');
		select.classList.remove('active');

		// в конце (после нажатия на пункт списка) в инпуте отобразится значение, которое мы взяли из дата-атрибута нажатого пункта списка
		selectInput.value = item.getAttribute('data-select-value');
	})
})


//* АВТОВЫЧИСЛЕНИЕ ВЫСОТЫ selectInput
const selectInputHeight = selectInput.offsetHeight;

// меняем переменную c высотой инпута из SCSS на переменную c высотой инпута из JS
root.style.setProperty('--input-height', `${selectInputHeight}px`);
