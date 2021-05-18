// export class LikeEvent {
//     static create(idLike) {
//         return fetch('https://event-booster-70252-default-rtdb.firebaseio.com/like-event.json', {
//             method: 'POST',
//             body: JSON.stringify(idLike),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(response => response.json())
//             .then(response => {
//                 idLike.id = response.name;
//                 return idLike;
//             })
//         .then(addLikeToLocalStorage)
//     }

//     static fetchIdLikeEvent(token) {
//         return fetch(`https://event-booster-70252-default-rtdb.firebaseio.com/like-event.json?auth=${token}`)
//             .then(response => response.json())
//             .then(idLike => {
//                 console.log(idLike);
//             })
//     }
// }

// function addLikeToLocalStorage(idLike) {
//     const arr = [...getIdLikeFromLocalStorage()];
//     arr.push(idLike);
//     localStorage.setItem('idLike', JSON.stringify(arr));
// }

// function getIdLikeFromLocalStorage() {
//     return JSON.parse(localStorage.getItem('idLike' || '[]'))
// }