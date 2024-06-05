$(document).ready(function() {
    // Attache les événements de swipe aux éléments existants
    attachSwipeEvents();

    // Attache les événements de swipe aux nouveaux éléments ajoutés
    $('#taskList').on('swiperight', 'li', handlerRightSwipe);
    $('#taskList').on('swipeleft', 'li', handlerLeftSwipe);
});

function attachSwipeEvents() {
    // Utilise jQuery pour attacher les événements de swipe à tous les éléments de liste existants
    $('#taskList li').on('swiperight', handlerRightSwipe);
    $('#taskList li').on('swipeleft', handlerLeftSwipe);
}

function handlerRightSwipe(event) {
    if (event.target) {
        $(event.target).addClass("barrer");
        if (!$(event.target).find('.checkDone').length) {
            $(event.target).append('<img src="img/checkDone.png" class="checkDone">');
        }
        // $(event.target).append('<span class="checkDone">✔</span>');
    }
}

function handlerLeftSwipe(event) {
    if (event.target) {
        $(event.target).remove();
    }
}


function addTask() {
    let task = document.getElementById("task");
    let taskList = document.getElementById("taskList");

    if(task.value) {
        let newTask = document.createElement("li");
        newTask.innerHTML = task.value;

        taskList.appendChild(newTask);
        $("taskList").listview('refresh');
        
        $(newTask).on('swiperight', handlerRightSwipe);
        $(newTask).on('swipeleft', handlerLeftSwipe);
        
        $("task").focus();
    }
}

function reset() {
    let taskList = document.getElementById("taskList");
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    $("#taskList").listview('refresh');
}
