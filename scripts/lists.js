import { getLists, getCards, createList, deleteList, createCard, deleteCard } from "./api.js";
import { handleTheme, showToast, toggleLoader } from "./utils.js";

async function renderCards(listId, container){
    try {
        container.setAttribute('class', 'flex flex-col gap-4 cursor-pointer')
        let cards = await getCards(listId);
    
        cards.forEach((card) => {
            let cardDiv = document.createElement('div');
            cardDiv.setAttribute('class', 'flex items-center justify-between py-2 px-4 rounded-md border-2 border-lime bg-blac text-white text-sm font-semibold')
    
            let cardName = document.createElement('h4');
            cardName.setAttribute('class', 'text-black dark:text-white')
            cardName.innerText = card.name;
    
            let deleteIcon = document.createElement('i');
            deleteIcon.setAttribute('class', 'fa-solid fa-trash-can text-lime')
            deleteIcon.addEventListener('click', async () => {
                try {
                    toggleLoader("show");
                    console.log(card);
                    await deleteCard(card.id);
                    let updatedLists = await getLists(card.idBoard);
        
                    renderLists(updatedLists);
                    toggleLoader("hide");
                } catch (error) {
                    showToast.error(error.message);
                }
            })
    
            cardDiv.appendChild(cardName);
            cardDiv.appendChild(deleteIcon);
            container.appendChild(cardDiv);
        })
    } catch (error) {
        showToast.error(error.message);
    }
}


function renderLists(lists){
    try {
        let listContainer = document.getElementById('lists-container');
        listContainer.innerHTML = "";
    
        lists.forEach(async (list) => {
    
            // ----------------- CREATE LIST AND HEADERS FOR IT -----------------
    
            let listDiv = document.createElement('div');
            listDiv.setAttribute('class', "bg-white h-fit p-4 min-w-80 gap-4 flex flex-col shadow-center rounded-lg hover:scale-110 duration-100 border-4 border-black dark:bg-dark dark:text-lime dark:border-lime dark:shadow-darkcenter");
            
            let listHeader = document.createElement('div');
            listHeader.classList.add('flex', 'justify-between', 'cursor-pointer');
            
            let h3 = document.createElement('h3');
            h3.setAttribute('class', 'font-semibold dark:text-white text-lg')
            h3.innerText = list.name;
    
            let deleteIcon = document.createElement('div');
            deleteIcon.setAttribute('class', 'fa-solid fa-trash-can text-lime');
            deleteIcon.addEventListener('click', async () => {
                try {
                    toggleLoader("show");
                    await deleteList(list.id);
                    let updatedLists = await getLists(list.idBoard);
    
                    renderLists(updatedLists);
                    toggleLoader("hide");
                } catch (error) {
                    showToast.error(error.message);
                }
            })
    
            // ----------------- CREATE INDIVIUAL CARDS FOR EACH LIST -----------------
            
            let cardContainer = document.createElement('div');
            renderCards(list.id, cardContainer);
    
            // ----------------- ADD NEW CARDS FUNCTIONALITY -----------------
    
            let addCardDiv = document.createElement('div');
            addCardDiv.setAttribute('class', 'flex items-center gap-2 bg-lime text-white py-2 px-4 cursor-pointer rounded-full border-2 border-black text-sm')
    
            let addIcon = document.createElement('i');
            addIcon.setAttribute('class', 'fa-solid fa-plus');
    
            let addText = document.createElement('div')
            addText.innerText = "Add new card";
        
            let cardNameInput = document.createElement('input')
            cardNameInput.setAttribute('class', 'bg-transparent text-white focus:outline-none placeholder-white w-[90%] px-2 text-sm')
            cardNameInput.placeholder = "Enter card name"
            cardNameInput.type = "text"
            
            
            addCardDiv.appendChild(addIcon);
            addCardDiv.appendChild(cardNameInput);

            cardNameInput.focus();

            cardNameInput.addEventListener('keydown', async (e) => {
                try {
                    if(e.key == "Enter"){
                        let cardName = cardNameInput.value ;
                        if(cardName.length > 1){
                            cardNameInput.value = "";
                            
                            toggleLoader("show");
                            await createCard(cardName, list.id);
                            let updatedLists = await getLists(list.idBoard);
                            renderLists(updatedLists);
                            toggleLoader("hide");
                        }
                    }
                } catch (error) {
                    showToast.error(error.message)
                }
            })
    
    
            listHeader.appendChild(h3);
            listHeader.appendChild(deleteIcon);
            
    
            listDiv.appendChild(listHeader);
            listDiv.appendChild(cardContainer);
            listDiv.appendChild(addCardDiv);
    
            listContainer.appendChild(listDiv);
        })
    } catch (error) {
        showToast.error(error.message);
    }
}

function toggleCreateListForm(){
    try {
        let createListForm = document.getElementById('create-list-container');
        createListForm.classList.toggle('hidden');
    } catch (error) {
        showToast.error(error.message)
    }
}

async function handleCreateList(event, boardId){
    try {
        event.preventDefault();
    
        let listNameInput = document.getElementById('list-name');
        let listName = listNameInput.value;
    
        listNameInput.value = "";
    
        toggleLoader("show");
        await createList(listName, boardId);
        toggleCreateListForm();
        let updatedLists = await getLists(boardId);
        renderLists(updatedLists);
        toggleLoader("hide");
    } catch (error) {
        showToast.error(error.message);
        toggleLoader("hide");
    }
}



document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let boardId = urlParams.get('id');

    toggleLoader("show");
    let lists = await getLists(boardId);
    renderLists(lists);
    toggleLoader("hide");

    document.getElementById('toggle-theme').addEventListener('click', handleTheme);
    document.getElementById('go-back').addEventListener('click', () => {
        window.location.href = "index.html"
    })
    document.getElementById('open-create-list').addEventListener('click', toggleCreateListForm)
    document.getElementById('close-create-list').addEventListener('click', toggleCreateListForm);
    document.getElementById('create-list').addEventListener('submit', (event) => {
        console.log(boardId)
        handleCreateList(event, boardId);
    });
})