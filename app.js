let roomsArr = [
    {key: 'manoir_1', src: 'https://c4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-thumb.jpg'},
    {key: 'manoir_2', src: 'https://t4.ftcdn.net/jpg/05/72/82/85/360_F_572828530_ofzCYowQVnlOwkcoBJnZqT36klbJzWdn.jpg'},
    {key: 'chateau_1', src: 'https://images8.alphacoders.com/132/1326727.png'},
    {key: 'chateau_2', src: 'https://t4.ftcdn.net/jpg/05/72/82/85/360_F_572828530_ofzCYowQVnlOwkcoBJnZqT36klbJzWdn.jpg'},
    {key: 'manoir_5', src: 'https://t4.ftcdn.net/jpg/05/72/82/85/360_F_572828530_ofzCYowQVnlOwkcoBJnZqT36klbJzWdn.jpg'},

];

let apartmentListData = [
    {title: 'Manoir', room_1: 302, room_2: 303, room_1_id: 'manoir_1', room_2_id: 'manoir_2'},
    {title: 'Chateau', room_1: 302, room_2: 303, room_1_id: 'chateau_1', room_2_id: 'chateau_2'},
    {title: 'Lumière', room_1: 302, room_2: 303, room_1_id: 'lumiere_1', room_2_id: 'lumiere_2'},
    {title: 'Esprit', room_1: 302, room_2: 303, room_1_id: 'esprit_1', room_2_id: 'esprit_2'},
    {title: 'Ciel', room_1: 302, room_2: 303, room_1_id: 'ciel_1', room_2_id: 'ciel_2'},
    {title: 'LouLou', room_1: 302, room_2: 303, room_1_id: 'loulou_1', room_2_id: 'loulou_2'},
    {title: 'Rêve', room_1: 302, room_2: 303, room_1_id: 'reve_1', room_2_id: 'reve_2'},
    {title: 'Belle', room_1: 302, room_2: 303, room_1_id: 'belle_1', room_2_id: 'belle_2'},
    {title: 'Étoile', room_1: 302, room_2: 303, room_1_id: 'etoile_1', room_2_id: 'etoile_2'},
    {title: 'Soleil', room_1: 302, room_2: 303, room_1_id: 'soleil_1', room_2_id: 'soleil_2'},
];

let roomImage = document.getElementById('room_image');
let apartmentListWrapper = document.getElementById('apartments_list');

async function GenerateMarkup (){
    await CreateApartmentsItems();
    AddListenersOnApartmentsListItems();
    AddListenersOnApartmentsRooms()
}

function CreateApartmentsItems(){
   return new Promise((resolve, reject)=>{
    resolve(CreateApartmentsMarkup())
   });
};

function CreateApartmentsMarkup(){
    apartmentListData.map((apartment)=>
    apartmentListWrapper.insertAdjacentHTML('beforeend',
        `
        <li id="manoir" class="apartments_list-item">
            <div class="apartments_list-item-title">
                <span>${apartment.title}</span>
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <path d="M19.7071 8.70711C20.0976 8.31658 20.0976 7.68342 19.7071 7.29289L13.3431 0.928931C12.9526 0.538407 12.3195 0.538407 11.9289 0.928931C11.5384 1.31946 11.5384 1.95262 11.9289 2.34314L17.5858 8L11.9289 13.6569C11.5384 14.0474 11.5384 14.6805 11.9289 15.0711C12.3195 15.4616 12.9526 15.4616 13.3431 15.0711L19.7071 8.70711ZM8.74228e-08 9L19 9L19 7L-8.74228e-08 7L8.74228e-08 9Z" fill="white"/>
                </svg>
            </div>
            <div class="apartments_list-item-rooms">
                <span id=${apartment.room_1_id}>${apartment.room_1}</span>
                <span id=${apartment.room_2_id}>${apartment.room_2}</span>
            </div>
        </li>
    `
    )
);
}

function RemoveActiveClasses(nodeList, activeClass, additionalClass){
    for (let i = 0; i < nodeList.length; i++) {
        if(nodeList[i].classList.contains(activeClass)){
            nodeList[i].classList.remove(activeClass, additionalClass);
        }
    }
};

function AddListenersOnApartmentsListItems(){
    let apartmentsList = document.querySelector('.apartments_list-list').children;
    for (let i = 0; i < apartmentsList.length; i++) {
        apartmentsList[i].addEventListener('click', function(){
            RemoveActiveClasses(apartmentsList,'list-active','list-active-height');
            apartmentsList[i].classList.add('list-active','list-active-height');
        });
    };
   
}

function AddListenersOnApartmentsRooms(){
    let apartmentsRooms = document.querySelectorAll('.apartments_list-item-rooms span');
    for (let i = 0; i < apartmentsRooms.length; i++) {
        apartmentsRooms[i].addEventListener('click', function(e){
            RemoveActiveClasses(apartmentsRooms, 'room-active');
            let idKey = this.id;
            this.classList.add('room-active');
            roomsArr.find(elem=>{elem.key === idKey ? roomImage.src = elem.src : '';})
        });
    };
}

GenerateMarkup();