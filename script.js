class Card { // класс создания карточки, лайка и удаления
  
  constructor(name, link) {
    
    this.newCard = this.create(name, link);

    this.newCard.
    querySelector('.place-card__like-icon').
    addEventListener('ckick', this.like);
    this.newCard.
    querySelector('.place-card__delete-icon').
    addEventListener('ckick', this.remove);
  }

  create(nameValue, linkValue) {
    const placesCard = document.createElement('div');
    const cardImage = document.createElement('div');
    const buttonDeleteIcon = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const buttonLike = document.createElement('button');

    placesCard.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    cardImage.setAttribute('style', `background-image: url(${linkValue})`);
    buttonDeleteIcon.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    cardName.textContent = nameValue;
    buttonLike.classList.add('place-card__like-icon');

    placesCard.appendChild(cardImage);
    cardImage.appendChild(buttonDeleteIcon);
    placesCard.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(buttonLike);

    return placesCard;
  }

  like(e) {
    e.target.classList.toggle('place-card__like-icon_liked');
  }
  remove(e) {
    placesList.removeChild(e.target.closest('.place-card'));
  }
}

class CardList { // класс отрисовки существующих карт и добавления новых

  constructor(list, arr) {

    this.list = list;
    this.arr = arr;
    this.render();
  }

  addCard(name, link) {
    
    const { newCard } = new Card(name, link);
    this.list.appendChild(newCard);
  }

  render() {

    this.arr.forEach(e => {
      const { newCard } = new Card(e.name, e.link);
      this.list.appendChild(newCard);
    });
  }
}

class Popup { // класс открытия, закрытия попапов
  constructor() {

    this.popupNew = document.querySelector('.popup');
    this.popupEdit = document.querySelector('.popup_edit');
    this.popupButtonOpen = document.querySelector('.profile');

    this.popupButtonOpen.
    addEventListener('click', this.open); // открыть попап

    this.popupNew.
    querySelector('.popup__close').
    addEventListener('click', this.close); // закрытие попапа "новое место"

    this.popupEdit.
    querySelector('.popup__close_edit').
    addEventListener('click', this.close); // закрытие попапа "инфо о пользователе"
  }

  open(e) {

    if (e.target.classList.contains('user-info__button_info')) {
      popupNew.classList.add('popup_is-opened');
      submitActiveFormNew();
    }
    if (e.target.classList.contains('user-info__button_edit-button')) {
      popupEdit.classList.add('popup_is-opened');
      submitActiveFormEdit();
      userNameInput.value = document.querySelector('.user-info__name').textContent;
      userAboutInput.value = document.querySelector('.user-info__job').textContent;
    }
    } 

  close(e) {

    if (e.target.classList.contains('popup__close')) {
      popupNew.classList.remove('popup_is-opened');
    }
    if (e.target.classList.contains('popup__close_edit')) {
      popupEdit.classList.remove('popup_is-opened');
    }
  }
}

// переменные

const root = document.querySelector('.root');
const placesList = root.querySelector('.places-list');
const popupNew = root.querySelector('.popup');
const popupEdit = root.querySelector('.popup_edit');

const formNew = document.forms.new;
const titleNewInput = formNew.elements.name;
const addLinkNewInput = formNew.elements.link;
const buttonNew = document.querySelector('.popup__button');
const submitActiveFormNew = validButton.bind(formNew);

const formEdit = document.forms.edit;
const userNameInput = formEdit.elements.nameuser;
const userAboutInput = formEdit.elements.aboutuser;
const buttonEdit = document.querySelector('.popup__button_edit');
const submitActiveFormEdit = validButton.bind(formEdit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
  }
];

const existingCard = new CardList(placesList, initialCards);
const open = new Popup();

const errorCollection = { // коллекция ошибок валидации

  errorAlways: 'Это обязательное поле',
  errorLength: 'Должно быть от 2 до 30 символов',
  errorLink: 'Здесь должна быть ссылка'
};

const popupImage = imageLink => { //функция добавляющая затемняющий фон и увеличенную картинку

  const darkLayer = document.createElement('div');
  darkLayer.classList.add('dark-layer');
  root.appendChild(darkLayer);

  const divChild = document.createElement('div');
  divChild.classList.add('dark-layer_child');
  darkLayer.appendChild(divChild);

  const imageMax = document.createElement('div');
  imageMax.classList.add('place-card__image');
  imageMax.classList.add('place-card__image_max');
  imageMax.setAttribute('style', `background-image: url(${imageLink})`);
  darkLayer.appendChild(imageMax);

  const imageClose = document.createElement('img');
  imageClose.classList.add('popup__close-image');
  imageClose.setAttribute('src', './images/close.svg');
  imageMax.appendChild(imageClose);
  
  imageClose.addEventListener('click', () => {
  root.removeChild(darkLayer);
});
};

const openImage = e => { //функция открытия картинки, лайк, удалить

  if (e.target.classList.contains('place-card__image')) { //открытие большого изображения
    let a = e.target.getAttribute('style');
    let b = a.slice(22, -1);
    popupImage(b);
  }
  if (e.target.closest('.place-card__like-icon')) { //лайкнуть карточку
    e.target.classList.toggle('place-card__like-icon_liked');
  }
  if (e.target.closest('.place-card__delete-icon')) { //удалить карточку
    placesList.removeChild(e.target.closest('.place-card'));
  }
};

function validatorForm(event) { //валидация формы

  const validator = event.target.name === 'link' ?
   validLinkInput :
   validTextInput;

  validator(event.target);
  submitActiveFormNew();
  submitActiveFormEdit();
}

function validTextInput(textInput) { //валидация поля ввода "текст"

  let error = '';

  if (!textInput.checkValidity()) {
    if (textInput.validity.tooShort || textInput.validity.tooLong) {
      error = errorCollection.errorLength;
    }
    if (textInput.validity.valueMissing) {
      error = errorCollection.errorAlways; 
    }
  }
  
  textInput.nextElementSibling.textContent = error;  
}

function validLinkInput(linkInput) { // валидация поля ввода "ссылка"

  let error = '';

  if (!linkInput.checkValidity()) {
    if (linkInput.validity.valueMissing) {
      error = errorCollection.errorAlways; 
    }
    if (linkInput.validity.typeMismatch) {
      error = errorCollection.errorLink; 
    }
  } 
  
  linkInput.nextElementSibling.textContent = error;
}

function validButton() { // активация кнопки добавить или сохранить в попапе
  if (this.checkValidity()) {
    this.querySelector('[type=submit]').setAttribute('style', 'background-color: black; color: white;');
  } else this.querySelector('[type=submit]').removeAttribute('style', 'background-color: black; color: white;');

  this.querySelector('[type=submit]').disabled = !this.checkValidity();
}

const createInfo = (nameUs, aboutUs) => { //функция изменения инфо о пользователе

  const userInfoName = document.querySelector('.user-info__name');
  const userInfoJob = document.querySelector('.user-info__job');
  
  userInfoName.textContent = nameUs;
  userInfoJob.textContent = aboutUs;
};

const addInfo = event => { //функция добавления инфо о пользователе

  event.preventDefault();

  let userInfo = document.querySelector('.user-info');

  userInfo = createInfo(userNameInput.value, userAboutInput.value);
  
  formEdit.reset();

  popupEdit.classList.remove('popup_is-opened');
};

const keyHandler = event => { // функция добавления карточек и изменении инфо о пользователе при нажатии Enter
  
  if(event.key === 'Enter') {
    addCard();
    addInfo();
  }
};

formNew.addEventListener('input', validatorForm); // валидация формы "новое место" при нажатии клавиши

formEdit.addEventListener('input', validatorForm); // валидация формы "инфо о пользователе" при нажатии клавиши

titleNewInput.addEventListener('click', validatorForm); // валидация поля "наименование" при клике

addLinkNewInput.addEventListener('click', validatorForm); // валидация поля "ссылка" при клике

userNameInput.addEventListener('click', validatorForm); // валидация поля "имя" при клике

userAboutInput.addEventListener('click', validatorForm); // валидация поля "о" при клике

formNew.addEventListener('submit', function(e) {

  e.preventDefault();
  
  existingCard.addCard(titleNewInput.value, addLinkNewInput.value);

  formNew.reset();

  popupNew.classList.remove('popup_is-opened');
}); //добавить новую карточку

formEdit.addEventListener('submit', addInfo); // обновить инфо о пользователе

placesList.addEventListener('click', openImage); // открыть изображение
