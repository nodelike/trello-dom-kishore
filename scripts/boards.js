import { getAllBoards, createBoard } from "./api.js";
import { handleTheme, toggleLoader, showToast } from "./utils.js";


function renderBoards(boards){
    try {
        let boardsContainer = document.getElementById('boards-container');
        boardsContainer.innerHTML = "";
    
        boards.forEach((board) => {
            let boardDiv = document.createElement('div');
    
            boardDiv.classList.add('bg-white', 'w-full', 'h-32', 'flex', 'items-center', 'justify-center', 'shadow-center', 'rounded-lg', 'cursor-pointer', 'font-semibold', 'hover:scale-110', 'duration-100', 'border-4', 'border-black','dark:bg-dark', 'dark:text-lime', 'dark:border-lime', 'dark:shadow-darkcenter');
            boardDiv.innerText = board.name;
            boardDiv.addEventListener('click', () => {
                window.location.href = `lists.html?id=${board.id}`
            })
    
            boardsContainer.appendChild(boardDiv);
        })     
    } catch (error) {
        showToast.error(error.message);
    }
}

function toggleCreateBoardForm(){
    try {
        let createBoardForm = document.getElementById('create-board-container');
        createBoardForm.classList.toggle('hidden');
    } catch (error) {
        showToast.error(error.message);
    }
    
}

async function handleCreateBoard(event){
    try {
        event.preventDefault();

        let boardNameInput = document.getElementById('board-name');
        let boardName = boardNameInput.value;
    
        boardNameInput.value = "";
    
        toggleLoader("show");
        await createBoard(boardName);
        toggleCreateBoardForm();
        let updatedBoards = await getAllBoards();
        renderBoards(updatedBoards);
        toggleLoader("hide");    
    } catch (error) {
        showToast.error(error.message);
        toggleLoader("hide");
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        toggleLoader("show");
        let boards = await getAllBoards();
        renderBoards(boards);
        toggleLoader("hide");
    
        document.getElementById('toggle-theme').addEventListener('click', handleTheme);
        document.getElementById('open-create-board').addEventListener('click', toggleCreateBoardForm);
        document.getElementById('close-create-board').addEventListener('click', toggleCreateBoardForm);
        document.getElementById('create-board').addEventListener('submit', handleCreateBoard);
    } catch (error) {
        showToast.error(error);
        toggleLoader("hide");
    }
})