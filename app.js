let roomsImagesArr = [
    {key: '302', src: "https://i.ibb.co/Hq6PpJb/Manoir-302.png"},
    {key: '303', src: "https://i.ibb.co/jZ8MHLY/Chateau-303.png" },
    {key: '301', src: "https://i.ibb.co/LzppCBz/Lumi-re-301.png" },
    {key: 'B1', src: "https://i.ibb.co/f00XNDp/Esprit-B1.png"},
    {key: '101', src: "https://i.ibb.co/j6RPvGP/sprit-101.png"},
    {key: '201', src: "https://i.ibb.co/mH6jx4P/sprit-201.png"},
    {key: '101', src: "https://i.ibb.co/j6RPvGP/sprit-101.png"},
    {key: '305', src: "https://i.ibb.co/RvkDtTn/Ciel-305.png"},
    {key: 'B3', src: "https://i.ibb.co/KqwFTJd/Lou-Lou-B3.png" },
    {key: '103', src: "https://i.ibb.co/f9Zh32D/Lou-Lou-103.png" },
    {key: '203', src: "https://i.ibb.co/FKkssgh/Lou-Lou-203.png" },
    {key: 'B5', src: "https://i.ibb.co/0D07PyK/R-ve-B5.png"},
    {key: '105', src: "https://i.ibb.co/SNKFdqZ/R-ve-105.png" },
    {key: 'B2', src: "https://i.ibb.co/1T6DSTh/Belle-B2.png"  },
    {key: '101', src: "https://i.ibb.co/RYjGpN9/Belle-102.png"  },
    {key: '102', src: "https://i.ibb.co/tcRrdF4/Belle-202.png" },
    {key: '104', src: "https://i.ibb.co/98NsnMg/toile-104.png" },
    {key: '204', src: "https://i.ibb.co/pJ1Zvq1/toile-204.png" },
    {key: '304', src: "https://i.ibb.co/N2qJHjK/Soleil-304.png"},
];


let apartmentListData = [
    {title: 'Manoir', rooms: [302]  },
    {title: 'Chateau', rooms: [303] },
    {title: 'Lumière', rooms: [301] },
    {title: 'Esprit', rooms: ['B1', 101, 201]  },
    {title: 'Ciel', rooms: [305]  },
    {title: 'LouLou', rooms: ['B3', 103, 203]  },
    {title: 'Rêve', rooms: ['B5', 105, 205]  },
    {title: 'Belle', rooms: ['B2', 102, 202]  },
    {title: 'Étoile', rooms: [104,204]  },
    {title: 'Soleil', rooms: [304]  },
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
    apartmentListData.map((apartment)=>{
        let rooms = ''
        apartment.rooms.forEach(room=>rooms += `<span id=${room}>${room}</span>`);
        return apartmentListWrapper.insertAdjacentHTML('beforeend',
            `
            <li id="manoir" class="apartments_list-item">
                <div class="apartments_list-item-title">
                    <span>${apartment.title}</span>
                    <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                        <path d="M19.7071 8.70711C20.0976 8.31658 20.0976 7.68342 19.7071 7.29289L13.3431 0.928931C12.9526 0.538407 12.3195 0.538407 11.9289 0.928931C11.5384 1.31946 11.5384 1.95262 11.9289 2.34314L17.5858 8L11.9289 13.6569C11.5384 14.0474 11.5384 14.6805 11.9289 15.0711C12.3195 15.4616 12.9526 15.4616 13.3431 15.0711L19.7071 8.70711ZM8.74228e-08 9L19 9L19 7L-8.74228e-08 7L8.74228e-08 9Z" fill="white"/>
                    </svg>
                </div>
                <div class="apartments_list-item-rooms">
                    ${rooms}
                </div>
            </li>
        `)   
    })
};

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
            roomsImagesArr.find(elem=>{elem.key === idKey ? roomImage.src = elem.src : '';})
        });
    };
}

GenerateMarkup();



/* discover */

let discoverPlaces = document.getElementById('public_places_wrapper').children;
let placesListItems = document.querySelector('.discover_list').children;
let placesListParent = document.querySelector('.discover_list');

placesListParent.addEventListener('click', function(e){
    let ID = e.target.id;
    ToggleActiveClassOnPlaceListItem();
    if(e.target.className !== "discover_list"){
        e.target.classList.add('list_active');
        ShowChoisenPlace(ID);
    }
});

function ToggleActiveClassOnPlaceListItem (){
    for (let i = 0; i < placesListItems.length; i++) {
        placesListItems[i].classList.remove('list_active');
    };
}

function ShowChoisenPlace (ID){
    for (let i = 0; i < discoverPlaces.length; i++) {
        if(discoverPlaces[i].classList.contains(ID)){
            discoverPlaces[i].classList.remove('hidden')
        }else{
            discoverPlaces[i].classList.add('hidden');
        }
    }
}