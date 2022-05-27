// код для открытия и закрытия попапа редактирования профиля
const popup = document.querySelector('.popup');

const openPopup = () => {
  popup.classList.add('popup_opened');
}

const closePopup = () => {
  popup.classList.remove('popup_opened');
}

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  openPopup();
})

popup.querySelector('.popup__button_status_close').addEventListener('click', () => {
  closePopup();
})

// Код для редактирования профиля
const editButton = document.querySelector('.popup__button_status_save');
editButton.onclick = function (evt) {
  evt.preventDefault();
}
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const updateName = document.querySelector('#name');
const updateDescription = document.querySelector('#description');

function editProfile() {
  profileName.textContent = updateName.value;
  profileDescription.textContent = updateDescription.value;
}

editButton.addEventListener('click', editProfile);

// код для открытия и закрытия попапа добавления Места

const popupAdd = document.querySelector('.popup_form_new-place');

const openPopupAdd = () => {
  popupAdd.classList.add('popup_opened');
}

const closePopupAdd = () => {
  popupAdd.classList.remove('popup_opened');
}

document.querySelector('.profile__add-button').addEventListener('click', () => {
  openPopupAdd();
})

popupAdd.querySelector('.popup__button_status_close').addEventListener('click', () => {
  closePopupAdd();
})

//код для добавления новой картинки с Местом

const addButton = document.querySelector('.popup__button_status_create');
const mestoContainer = document.querySelector('.elements');
addButton.onclick = function (evt) {
  evt.preventDefault();
}

function addMesto() {
    const placeName = document.querySelector('.popup__item_el_place-name');
    const placeUrl = document.querySelector('.popup__item_el_place-url');
    const newMesto = document.querySelector('#new-mesto').content;
    const mestoItem = newMesto.querySelector('.mesto').cloneNode(true);

    mestoItem.querySelector('.mesto__title').textContent = placeName.value;
    mestoItem.querySelector('.mesto__image').src = placeUrl.value;
    placeUrl.value = '';
    placeName.value = '';
  
  mestoContainer.prepend(mestoItem);
  mestoItem.querySelector('.mesto__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('mesto__button_active');
  });
}
addButton.addEventListener('click', addMesto);

//код для добавления новой картинки с Местом (если не заработает темплейт)
// function addMesto() {
//   let placeName = document.querySelector('.popup__item_el_place-name');
//   let placeUrl = document.querySelector('.popup__item_el_place-url');
//   mestoContainer.insertAdjacentHTML ('afterbegin',`
//         <div class="mesto">
//                  <img class="mesto__image" src="${placeUrl.value}" alt="Добавленная пользователем картинка">
//                  <div class="mesto__info">
//                     <h2 class="mesto__title">${placeName.value}</h2>
//                     <button class="mesto__button" type="button"></button>
//                    </div>
//             </div>`);
//             placeUrl.value = '';
//             placeName.value = '';
// }
// addButton.addEventListener('click', addMesto);

// код для установки и снятия лайка
const mestoList = document.getElementsByClassName('mesto');
const mestoArray = Array.from(mestoList);

mestoArray.forEach((mestoList) => {
  mestoList.querySelector('.mesto__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('mesto__button_active');
  });
});


