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