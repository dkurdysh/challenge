console.log("init new challenges app");

const navToggle = document.querySelector('[data-element~="navToggle"]');
const body = document.body;

const toggleNav = () => {
  body.classList.toggle("is-nav-open");
};

if (navToggle) {
  navToggle.addEventListener('click', toggleNav);
}

class StepsSlider {
	constructor(selector) {
		this.root = document.querySelector(selector);

		if (!this.root) return;

		this.slides = [
			{
				caption: 'выбери челлендж',
				content: `
					<p>
						открой каталог челленджей и выбери направление:
						спорт, саморазвитие, творчество, социальные навыки,
						забота о себе или бытовые привычки.
					</p>
					<p>
						каждый челлендж имеет уровень сложности, срок прохождения
						и понятный результат, к которому ты придёшь.
					</p>
				`
			},
			{
				caption: 'выполняй задания',
				content: `
					<p>
						после выбора челленджа приложение выдаёт задания по шагам:
						простые, выполнимые и не перегружающие.
					</p>
				`
			},
			{
				caption: 'получай результат',
				content: `
					<p>
						финал челленджа — это не просто бейдж в приложении.
						Ты получаешь ощутимый результат: новую привычку,
						завершённое действие, улучшенный навык, собранный опыт
						или конкретное изменение в повседневной жизни.
					</p>
				`
			}
		];

		this.currentIndex = 0;

		this.counter = this.root.querySelector(
			'[data-element="stepsCounter"]'
		);

		this.caption = this.root.querySelector(
			'.steps__content-caption'
		);

		this.content = this.root.querySelector(
			'.steps__content-main'
		);

		this.prevBtn = this.root.querySelector('.prev');
		this.nextBtn = this.root.querySelector('.next');

		this.bindEvents();
		this.render();
	}

	bindEvents() {
		this.prevBtn.addEventListener('click', () => this.prev());
		this.nextBtn.addEventListener('click', () => this.next());
	}

	prev() {
		if (this.currentIndex === 0) return;

		this.currentIndex--;
		this.render();
	}

	next() {
		if (this.currentIndex >= this.slides.length - 1) return;

		this.currentIndex++;
		this.render();
	}

	render() {
		const slide = this.slides[this.currentIndex];

		this.counter.textContent = this.currentIndex + 1;
		this.caption.textContent = slide.caption;
		this.content.innerHTML = slide.content;

		const isFirst = this.currentIndex === 0;
		const isLast = this.currentIndex === this.slides.length - 1;

		this.prevBtn.classList.toggle('is-disabled', isFirst);
		this.nextBtn.classList.toggle('is-disabled', isLast);

		this.prevBtn.disabled = isFirst;
		this.nextBtn.disabled = isLast;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new StepsSlider('.steps__slider');
});