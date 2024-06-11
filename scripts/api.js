function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        apiKey: urlParams.get('apiKey'),
        token: urlParams.get('token')
    };
}

export async function getAllBoards() {
    const { apiKey, token } = getUrlParams();
    let data = await fetch(
        `https://api.trello.com/1/members/me/boards?fields=name,url&key=${apiKey}&token=${token}`
    ).then((response) => response.json());
    return data;
}

export async function createBoard(boardName) {
    const { apiKey, token } = getUrlParams();
    let createdBoard = await fetch(
        `https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${token}`,
        {
            method: "POST",
        }
    ).then((response) => response.json());

    return createdBoard;
}

export async function getLists(boardId) {
    const { apiKey, token } = getUrlParams();
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
    const { apiKey, token } = getUrlParams();
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
    const { apiKey, token } = getUrlParams();
    let createdList = await fetch(
        `https://api.trello.com/1/lists?name=${listName}&idBoard=${boardID}&key=${apiKey}&token=${token}`,
        {
            method: "POST",
        }
    ).then((response) => response.json());

    return createdList;
}

export async function deleteList(listID) {
    const { apiKey, token } = getUrlParams();
    let deletedList = await fetch(
        `https://api.trello.com/1/lists/${listID}/closed?value=true&key=${apiKey}&token=${token}`,
        {
            method: "PUT",
        }
    ).then((response) => response.json());

    return deletedList;
}

export async function createCard(cardName, listID) {
    const { apiKey, token } = getUrlParams();
    let createdCard = await fetch(
        `https://api.trello.com/1/cards?name=${cardName}&idList=${listID}&key=${apiKey}&token=${token}`,
        {
            method: "POST",
        }
    ).then((response) => response.json());

    return createdCard;
}


export async function deleteCard(cardId){
    const { apiKey, token } = getUrlParams();
    let deletedCard = await fetch(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`, 
        {
            method: "DELETE"
        }
    )
        // .then(response => response.json())
    console.log(deletedCard)
    return deletedCard;
}