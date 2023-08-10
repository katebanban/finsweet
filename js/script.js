Fancybox.bind("[data-fancybox]", {
});


// menu
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


// перемещаем блок с номером в меню на экране 1024px
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


// автовычисление высоты шапки
//! размещаем в коде именно ПОСЛЕ переноса блока с номером в меню (чтобы над блоком с номером не было огромного оступа сверху после переноса в меню)
const headerHeight = header.offsetHeight; // создали переменную, в которую ложим актуальную высоту шапки
const root = document.querySelector(':root'); // нашли папку root (хранилище переменных)

root.style.setProperty('--header-height', `${headerHeight}px`); // заменили переменную с заданной высотой шапки из CSS на переменную с актуальной высотой шапки из JS