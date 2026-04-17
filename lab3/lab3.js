// TASK 1
// function invokeAfterDelay(callback, delay) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(callback());
//     }, delay);
//   });
// }

// invokeAfterDelay(() => {
//   return Math.floor(Math.random() * 11);
// }, 1000).then(result => {
//   console.log("Random number:", result);
// });

// TASK 2
// function produceRandomAfterDelay(delay) {
//   return invokeAfterDelay(() => Math.floor(Math.random() * 11), delay);
// }

// Promise.all([
//   produceRandomAfterDelay(1000),
//   produceRandomAfterDelay(1500)
// ]).then(([a, b]) => {
//   console.log("Sum:", a + b);
// });

// TASK 3
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function testSleep() {
//   console.log("Start");
//   await sleep(1000);
//   console.log("1 second passed");
// }

// testSleep();

//TASK 4 (users)
const users = [
  { id: 0, name: "Ivan", age: 25, city: "Kyiv" },
  { id: 1, name: "Oleg", age: 30, city: "Lviv" },
  { id: 2, name: "Anna", age: 22, city: "Odessa" },
  { id: 3, name: "Maria", age: 28, city: "Kharkiv" }
];

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.id === id);

      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    }, 1000);
  });
}

getUser(1)
  .then(user => console.log(user))
  .catch(err => console.log(err));

// TASK 5(loadUsers)
function loadUsers(ids) {
  const promises = ids.map(id => getUser(id));

  return Promise.all(promises)
    .then(users => users)
    .catch(error => {
      console.log("Error:", error);
      return [];
    });
}

loadUsers([0, 1, 5]).then(users => {
  console.log("Users:", users);
});

//TASK 6
// function logCall(callback) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       callback();
//       console.log("Time:", new Date().toLocaleTimeString());
//       resolve();
//     }, 1000);
//   });
// }

// logCall(() => console.log("Call 1"))
//   .then(() => logCall(() => console.log("Call 2")))
//   .then(() => logCall(() => console.log("Call 3")))
//   .then(() => logCall(() => console.log("Call 4")));

// TASK 7(showUsers)
async function showUsers(ids) {
  console.log("loading");

  try {
    const users = await loadUsers(ids);
    console.log(users);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("loading finished");
  }
}

showUsers([0, 1, 2]);
showUsers([0, 5]);