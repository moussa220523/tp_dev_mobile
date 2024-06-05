$(document).ready(function() {
    attachSwipeEvents();

    $('#taskList').on('swiperight', 'li', handlerRightSwipe);
    $('#taskList').on('swipeleft', 'li', handlerLeftSwipe);
});

function attachSwipeEvents() {
    $('#taskList li').on('swiperight', handlerRightSwipe);
    $('#taskList li').on('swipeleft', handlerLeftSwipe);
}

function handlerRightSwipe(event) {
    if (event.target) {
        $(event.target).addClass("barrer");

        if (!$(event.target).find('.checkDone').length) {
            $(event.target).append('<img src="img/checkDone.png" class="checkDone">');
        }
    }
}

function handlerLeftSwipe(event) {
    if (event.target) {
        $(event.target).hide("slow", function() {
            $(this).remove();
        });
    }
}


function addTask() {
    console.log("test");
    let task = document.getElementById("task").value;
    if (task) {
        let taskList = $('#taskList');
        let newTask = $('<li>' + task + '</li>');
        taskList.append(newTask);
        taskList.listview('refresh');

        newTask.on('swiperight', handlerRightSwipe);
        newTask.on('swipeleft', handlerLeftSwipe);

        $('#task').focus();
    }
}

function reinitialiser() {
    let taskList = document.getElementById("taskList");
    
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    $("#taskList").listview('refresh');
}



