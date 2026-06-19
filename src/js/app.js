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
	if (document.querySelector('.steps__slider')) {
		new StepsSlider('.steps__slider');
	}
});

class AccessForm {
  constructor(section) {
    this.section = section;

    this.form = section.querySelector('.access__form');
    this.input = section.querySelector('.access__input');
    this.button = section.querySelector('.access__submit');
    this.success = section.querySelector('.access__success');

    this.disabledClass = 'is-disabled';
    this.successClass = 'is-success';

    this.init();
  }

  init() {
    this.input.addEventListener('input', () => this.onInput());
    this.form.addEventListener('submit', (e) => this.onSubmit(e));

    this.updateButtonState();
  }

  onInput() {
    this.updateButtonState();
  }

  updateButtonState() {
    const value = this.input.value.trim();

    if (value.length > 5) {
      this.button.classList.remove(this.disabledClass);
      this.button.disabled = false;
    } else {
      this.button.classList.add(this.disabledClass);
      this.button.disabled = true;
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.input.value.trim();

    if (!this.isValidEmail(email)) return;

    this.success.classList.add(this.successClass);
	this.form.classList.add(this.successClass);
    this.form.reset();
    this.updateButtonState();
  }
}

// init только если есть форма
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.access');

  if (section) {
    new AccessForm(section);
  }
});

const bookData = [
	{
		image: 'assets/images/book-slide-1.png',
		text: 'ты впервые подключаешься к системе челленджей. Здесь начинается маршрут: приложение помогает понять, с чего начать и какой первый шаг будет достаточно маленьким, чтобы его действительно выполнить'
	},
	{
		image: 'assets/images/book-slide-2.png',
		text: 'перед стартом важно понять своё состояние: сколько у тебя энергии, времени, мотивации и какой формат изменений тебе сейчас подходит. это не тест ради теста, а настройка челленджа под реальную жизнь'
	},
	{
		image: 'assets/images/book-slide-3.png',
		text: 'ты выбираешь профиль прохождения: мягкий, активный, социальный, творческий или дисциплинарный. от этого зависит темп заданий, сложность и способ поддержки внутри приложения'
	},
	{
		image: 'assets/images/book-slide-4.png',
		text: 'челлендж запускается не с большого обещания, а с маленького действия. приложение даёт первое задание, которое помогает почувствовать движение уже сегодня'
	},
	{
		image: 'assets/images/book-slide-5.png',
		text: 'финал челленджа — это момент, когда действие выходит за пределы экрана. новая привычка, навык или опыт становятся частью повседневной жизни'
	}
];

class BookSlider {
	constructor(selector, data) {
		this.root = document.querySelector(selector);

		if (!this.root) return;

		this.data = data;

		this.buttons = this.root.querySelectorAll('.book__list-item');
		this.text = this.root.querySelector('.book__text');
		this.image = this.root.querySelector('.book__image');

		this.init();
	}

	init() {
		this.buttons.forEach(button => {
			button.addEventListener('click', () => {
				this.setSlide(Number(button.dataset.index));
			});
		});
	}

	setSlide(index) {
		const slide = this.data[index];

		if (!slide) return;

		this.buttons.forEach(btn => {
			btn.classList.toggle(
				'is-active',
				Number(btn.dataset.index) === index
			);
		});

		this.text.textContent = slide.text;
		this.image.src = slide.image;
	}
}

new BookSlider('.book', bookData);