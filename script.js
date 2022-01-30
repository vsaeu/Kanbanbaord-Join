let kanbanArray = [{
    'tasks': [{
            'taskid': '0',
            'title': 'Code some',
            'category': 'Development',
            'description': 'A Task for Inav: Code 10000 Rows',
            'duedate': '30th Feb. 2022',
            'urgency': 'urgency',
            'assignedTo': 'Inav Bolski',
            'status': 'todo',
        },
        {
            'taskid': '1',
            'title': 'Check Data',
            'category': 'Management',
            'description': 'A task for Klaus. Check Business Data for next trades.',
            'duedate': 'yesterday',
            'urgency': 'urgency',
            'assignedTo': 'Klaus Meier',
            'status': 'inprogress',
        },
        {
            'taskid': '2',
            'title': 'Party',
            'category': 'Inhouse',
            'description': 'A task for Laura: Organise a massive carnival Party',
            'duedate': 'tomorrow',
            'urgency': 'urgency',
            'assignedTo': 'Laura Trautmann',
            'status': 'testing',
        },
        {
            'taskid': '3',
            'title': 'Aquise',
            'category': 'Sales',
            'description': 'A Task for Tom: Get more clients by end of the day',
            'duedate': '+3d',
            'urgency': 'urgency',
            'assignedTo': 'Tom Müller',
            'status': 'done',
        },
        {
            'taskid': '4',
            'title': 'Hire people',
            'category': 'Human ressources',
            'description': 'A task for Karin: Hire some rocket scientists',
            'duedate': '31th Feb. 22',
            'urgency': 'urgency',
            'assignedTo': 'Karin Schneider',
            'status': 'todo',
        }
    ],
    'users': [{
            'userid': '0',
            'username': 'Klaus Meier',
            'email': 'Klaus_Meier@web.de',
            'key': 'key',
            'img': 'face1.jpg',
            'category': 'Marketing',
            'color': '--bgMarketing',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': '1',
            'username': 'Inav Bolski',
            'email': 'InavBolski@Yahoo.de',
            'key': 'key',
            'img': 'face3.jpg',
            'category': 'Sale',
            'color': '--bgSale',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': '2',
            'username': 'Laura Trautmann',
            'email': 'Laura-Trautmann@t-online.de',
            'key': 'key',
            'img': 'face5.jpg',
            'category': 'Design',
            'color': '--bgDesign',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': '3',
            'username': 'Tom Müller',
            'email': 'MüllerTom@GMX.de',
            'key': 'key',
            'img': 'face2.jpg',
            'category': 'Sale',
            'color': '--bgSale',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': '4',
            'username': 'Karin Schneider',
            'email': 'Schneider@web.de',
            'key': 'key',
            'img': 'face4.jpg',
            'category': 'Service',
            'color': '--bgService',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        }
    ]
}]

let users = {
    'userid_1': 'userid_12',
    'username': 'username',
    'email': 'email',
    'key': 'key',
    'img': 'img',
    'category': 'category',
    'color': 'color',
};


// function addUser() {
//     users.push('John');
//     backend.setItem('users', JSON.stringify(users));
// }
/*async function addUser(name) {
    users.push(name);
    await backend.setItem('users', JSON.stringify(users));

}*/
async function init() {
    // await downloadFromServer();
    // users = JSON.parse(backend.getItem('users')) || [];
    click_nav_board()
        // backlogUsers()
    await renderBoard();
}

/*function deleteUser() {
    backend.deleteItem(kanbanArray);
}
*/

let usersInArray = kanbanArray[0]["users"];
let tasksInArray = kanbanArray[0]["tasks"];
let findUser = usersInArray.find((usersInArray) => usersInArray.userid = 'userid_1');
let filterUser = usersInArray.filter((usersInArray) => usersInArray.username == 'username');

let currentDragged;

// -----------------------------------------------Board Script--------------------------------------------------------------------------

function renderBoard() {
    renderBoardTodo();
    renderBoardInprogress();
    renderBoardTesting();
    renderBoardDone();
}

function renderBoardTodo() {
    let filterStatusTodo = tasksInArray.filter((tasksInArray) => tasksInArray.status == 'todo');
    let boardTodo = document.getElementById('board_todo');
    boardTodo.innerHTML = "";
    for (let i = 0; i < filterStatusTodo.length; i++) {
        let status = filterStatusTodo[i];
        boardTodo.innerHTML += generateBoardHTML(status);
    }
}

function renderBoardInprogress() {
    let filterStatusInProgress = tasksInArray.filter((tasksInArray) => tasksInArray.status == 'inprogress');
    let boardInprogress = document.getElementById('board_inprogress');
    boardInprogress.innerHTML = "";
    for (let j = 0; j < filterStatusInProgress.length; j++) {
        let status = filterStatusInProgress[j];
        boardInprogress.innerHTML += generateBoardHTML(status);
    }
}

function renderBoardTesting() {
    let filterStatusTesting = tasksInArray.filter((tasksInArray) => tasksInArray.status == 'testing');
    let boardTesting = document.getElementById('board_testing');
    boardTesting.innerHTML = '';
    for (let k = 0; k < filterStatusTesting.length; k++) {
        let status = filterStatusTesting[k];
        boardTesting.innerHTML += generateBoardHTML(status);
    }
}

function renderBoardDone() {
    let filterStatusdone = tasksInArray.filter((tasksInArray) => tasksInArray.status == 'done');
    let boardDone = document.getElementById('board_done');
    boardDone.innerHTML = '';
    for (let m = 0; m < filterStatusdone.length; m++) {
        let status = filterStatusdone[m];
        boardDone.innerHTML += generateBoardHTML(status);
    }
}

// -----------------------------------------------Drag n´Drop functions--------------------------------------------------------------------------


function startDragging(id) {
    currentDragged = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasksInArray[currentDragged]['status'] = status;
    renderBoard()
}

function getProfilePic(currentUser) {
    for (let i = 0; i < kanbanArray[0]['users'].length; i++) {
        if (kanbanArray[0]['users'][i]['username'] == currentUser) {
            return i;
        }
    }
}

function generateBoardHTML(status) {
    let currentUserTest = status['assignedTo'];
    let profilePicID = getProfilePic(currentUserTest);
    return `  <div class="singleCard" draggable="true" ondragstart="startDragging(${status['taskid']})">
                        <span class="singleCardDate">${status['duedate']}</span> 
                        <h3>${status['title']}</h3> 
                        <span class="singleCardDescription">${status['description']}</span>
                    <div class="categoryAndImg">
                        <span class="singleCardCategory">${status['category']}</span>
                        <img class="imgAvatar2" src="./img/${usersInArray[profilePicID]['img']}"></img>
                    </div>
                </div>
        `;
}

function getTaskID(currentUser) {
    for (let i = 0; i < kanbanArray[0]['tasks'].length; i++) {
        if (kanbanArray[0]['tasks'][i]['taskid'] == currentUser) {
            return i;
        }
    }
}

/**
 * ************************ ******************************navigation to divs ******************************************
 */

async function click_nav_board() {
    document.getElementById('nav_board').style = 'border-left : solid var(--bgWhite) .4rem;';
    document.getElementById('nav_backlog').style = '';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = '';
    document.getElementById('backlog_container').style.display = 'none';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = 'none';
    // await renderBoard();
}

async function click_nav_backlog() {
    document.getElementById('nav_board').style = '';
    document.getElementById('nav_backlog').style = 'border-left : solid var(--bgWhite) .4rem;';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = 'none';
    document.getElementById('backlog_container').style.display = '';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = 'none';
    // await backlogTasks();
}

function click_nav_addtask() {
    document.getElementById('nav_board').style = '';
    document.getElementById('nav_backlog').style = '';
    document.getElementById('nav_addtask').style = 'border-left : solid var(--bgWhite) .4rem;';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = 'none';
    document.getElementById('backlog_container').style.display = 'none';
    document.getElementById('addTask_container').style.display = '';
    document.getElementById('help_container').style.display = 'none';
}

function click_help() {
    document.getElementById('nav_board').style = '';
    document.getElementById('nav_backlog').style = '';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = 'border-left : solid var(--bgWhite) .4rem;';

    document.getElementById('board_container').style.display = 'none';
    document.getElementById('backlog_container').style.display = 'none';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = '';
}


/**
 *  ***************User Einfügen*****************
 * Durch neue Funktion ersetzt
 */

/**----------------------------------------------------Backlog Script--------------------------------------------------------- */

// async function backlogUsers() {
//     let userContainer = document.getElementById('backlog_users');
//     userContainer.innerHTML = '';

//     for (let i = 0; i < usersInArray.length; i++) {
//         userContainer.innerHTML += `
//         <div id="backlog_user${i}" class="infoContainer">
//             <div class="imgContainer3">
//                 <img class="imgAvatar2" src="./img/${usersInArray[i]['img']}">
//                 <div class="row">
//                     <span>${usersInArray[i]['username']}</span>
//                     <a href="mailto:${usersInArray[i]['email']}">${usersInArray[i]['email']}</a>
//                 </div>
//             </div>

//             <div class="department">
//                 <span>${usersInArray[i]['category']}</span>
//             </div>

//             <div class="details">
//                 <span>${usersInArray[i]['detail']}</span>
//             </div>
//         </div>`;
//         document.getElementsByClassName('infoContainer')[i].style.borderLeftColor = `var(${usersInArray[i]['color']})`;
//     }
// }


/**
 * Render Backlog by Task
 * Usercontainer entspricht Taskcontainer. Function wurde von der ursprünglichen Anzeige der User in Anzeige der offenen Tasks umgewandelt.
 * Es werden offene Aufgaben aufgelistet, welche noch nicht ins Board übertragen wurden

*/
async function backlogTasks() {
    let userContainer = document.getElementById('backlog_users');
    userContainer.innerHTML = '';
    for (let i = 0; i < tasksInArray.length; i++) {
        console.log(i);
        let currentUser = tasksInArray[i]['assignedTo'];
        let currentUserID = await getUserID(currentUser);
        userContainer.innerHTML += await generateBacklogHTML(i, currentUserID);
        document.getElementsByClassName('infoContainer')[i].style.borderLeftColor = `var(${usersInArray[currentUserID]['color']})`;
    }
}

async function generateBacklogHTML(i, currentUserID) {
    return `
    <div id="backlog_user${i}" class="infoContainer">
        <div class="imgContainer3">
            <img class="imgAvatar2" src="./img/${usersInArray[currentUserID]['img']}">
            <div class="row">
                <span>${usersInArray[currentUserID]['username']}</span>
                <a href="mailto:${usersInArray[currentUserID]['email']}">${usersInArray[currentUserID]['email']}</a>
            </div>
        </div>
        
        <div class="department">
            <span>${tasksInArray[i]['category']}</span>
        </div>

        <div class="details">
            <span>${tasksInArray[i]['description']}</span>
        </div>
    </div>`;
}

async function getUserID(currentUser) {
    for (let i = 0; i < kanbanArray[0]['users'].length; i++) {
        if (kanbanArray[0]['users'][i]['username'] == currentUser) {
            return i;
        }
    }
}

// -----------------------------------------------Add Task Script--------------------------------------------------------------------------

/**
 * Adding a new Task. First: Get all input information, second: push in Kanbanarray
 */
async function addNewTask() {
    // optional: check if all Information are made completely
    let taskid = 'taskid' + tasksInArray.length + 1;
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let duedate = document.getElementById('duedate').value;
    let urgency = document.getElementById('urgency').value;
    let assignedTo = "Laura Trautmann";
    let status = 'backlog';
    let newTask = {
        'taskid': taskid,
        'title': title,
        'category': category,
        'description': description,
        'duedate': duedate,
        'urgency': urgency,
        'assignedTo': assignedTo,
        'status': status,
    }
    await tasksInArray.push(newTask);
    click_nav_backlog();
    await backlogTasks();
}