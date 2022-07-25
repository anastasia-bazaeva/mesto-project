import './pages/index.css';

// Импортируем данные
import { mestoContainer, popupZoom, mestoCards, addPopup,
   popupEdit, popupAdd, editForm, profileName, profileDescription, updateName, updateDescription,
    addForm, anyPopup, enableValidationConfig, editAvatar, profileAvatar, spinners, forms, placeName, placeUrl } from './components/utils.js';
  
  // Импортируем валидацию
  import { removeErrorSpan, FormValidator } from './components/validation.js';  
  
  //Импортируем создание карточек
  import { Card } from './components/card.js';

 // функции для открытия и закрытия попапов
  import { openPopup, closePopup, editProfile, editProfileAvatar, renderLoading } from './components/modal.js';

  // import { getProfile, getAllCards } from './components/api.js';

  import { apiConfig } from './components/api.js'; 
  import { Section } from './components/Section.js';

  let profileID = null;

function renderLoadingMainContent (isLoading) {
  if(isLoading) {
    spinners.forEach((spinner) => {
      spinner.classList.add('spinner_visible');
    })
  } else {
    spinners.forEach((spinner) => {
      spinner.classList.remove('spinner_visible');
    })
  }
}
renderLoadingMainContent(true);

//функция создания карточки

function cardCreation(data, profileID) {
  const card = new Card(
    {
      cardInfo: data,
      handleCardClick: (place, link) => {
        imagePopup.open(link, place); //пока класса нет, и это не работает
      },
    },
    apiConfig,
    mestoCards,
    profileID
  );
  return card.getCard();
}

  const serverCards = new Section ({
  renderer: (item) => {
    serverCards.addItem(cardCreation(item, profileID));
}},
mestoContainer);

//получаем данные профиля и картинки с сервера
  Promise.all([apiConfig.getProfile(), apiConfig.getAllCards()])
  .then(([profileData, cardsData]) => {
    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.src = profileData.avatar;
    profileID = profileData._id;
    serverCards.renderItems(cardsData);
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))
  .finally(() => renderLoadingMainContent(false))
  
  //запускаем валидацию
  // enableValidation(enableValidationConfig);
  forms.forEach((form) => {
    const formClass = new FormValidator (enableValidationConfig, form);
    formClass.enableValidation();
  })

  //Функция для создания новой карточки по кноке
function addMesto() {
  const addButton = addForm.querySelector('.popup__button_status_create');
    const data = {
      link: placeUrl.value,
      name: placeName.value,
      };
    apiConfig.addCardToServer(data)
    .then((data) => {
      serverCards.addItem(cardCreation(data, profileID));
      closePopup (addPopup); 
    })
    .catch(err => console.log(`С добавлением карточки что-то не так: ${err}`))
    .finally(() => renderLoading(addButton, false, 'Создать'))
    placeUrl.value = '';
    placeName.value = ''; 
  }

  //слушатель для открытия попапа редактирования профиля
  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openPopup (popupEdit);
    removeErrorSpan(popupEdit);
    updateName.value = profileName.textContent;
    updateDescription.value = profileDescription.textContent;
  });
  
 
  // слушатель для открытия попапа добавления Места
  document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopup (popupAdd);
  })
  
  // слушатель для редактирования профиля
  editForm.addEventListener('submit', function (evt) {
    const profileUpdateButton = editForm.querySelector('.popup__button_status_save');
    evt.preventDefault();
    renderLoading(profileUpdateButton, true, '');
    editProfile();
  });
  
  // слушатель для добавления новой картинки с Местом
  addForm.addEventListener('submit', function (evt) {
    const addButton = addForm.querySelector('.popup__button_status_create');
    evt.preventDefault();
    renderLoading(addButton, true, '');
    addMesto (); 
  });

   
  //слушатель для каждого попапа для закрытия по клику на оверлей или на кнопку

  anyPopup.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__button_status_close')) {
          closePopup(popup)
        }
    })
  })

  
  //слушатель  для закрытия попапа редактирования аватара
  document.querySelector('.profile__avatar-button').addEventListener('click', () => {
    openPopup (editAvatar);
  });

  // слушатель для кнопки редактирования аватара
  editAvatar.querySelector('.popup_avatar_add').addEventListener('submit', evt => {
    const avatarButton = editAvatar.querySelector('.popup__button_status_save');
    evt.preventDefault();
    renderLoading(avatarButton, true, '');
    editProfileAvatar();
  })

  export { profileID }