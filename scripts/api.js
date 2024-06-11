let apiKey = "8d68d92e3e26b085f769a6cddeab08b0";
let token = "ATTAb6da62225aedc8f688d5ecf7e6bbe3a90281e76e7865d8e6c3a08147fa359c371100E31C";

export async function getAllBoards() {
    let data = await fetch(
        `https://api.trello.com/1/members/me/boards?fields=name,url&key=${apiKey}&token=${token}`
    ).then((response) => response.json());
    
    return data;
}

export async function createBoard(boardName) {
    let createdBoard = await fetch(
        `https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${token}`,
        {
            method: "POST",
        }
    ).then((response) => response.json());

    return createdBoard;
}

export async function getLists(boardId) {
    let lists = await fetch(
        `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    ).then((response) => response.json());

    return lists;
}

export async function getCards(listID) {
    let cards = await fetch(
        `https://api.trello.com/1/lists/${listID}/cards?key=${apiKey}&token=${token}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    ).then((response) => response.json());

    return cards;
}

export async function createList(listName, boardID) {
    let createdList = await fetch(
        `https://api.trello.com/1/lists/?name=${listName}&idBoard=${boardID}&key=${apiKey}&token=${token}`,
        {
            method: "POST",
        }
    ).then((response) => response.json());
    return createdList;
}

export async function deleteList(listID) {
    let deletedList = await fetch(
        `https://api.trello.com/1/lists/${listID}/closed?value=true&key=${apiKey}&token=${token}`,
        {
            method: "PUT",
        }
    ).then((response) => response.json());

    return deletedList;
}

export async function createCard(name, listID) {
    let createdCard = await fetch(
        `https://api.trello.com/1/cards?idList=${listID}&name=${name}&key=${apiKey}&token=${token}`,
        {
            method: "POST",
        }
    ).then((response) => response.json());
    return createdCard;
}

export async function deleteCard(cardId){
    let deletedCard = await fetch(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`, 
        {
            method: "DELETE"
        }
    )
        // .then(response => response.json())
    console.log(deletedCard)
    return deletedCard;
}
