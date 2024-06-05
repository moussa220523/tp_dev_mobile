function handlerRightSwipe(event) {
    if (event.target) {
        let completedTaskList = document.getElementById("completedTaskList");
        let currentTaskList = document.getElementById("currentTaskList");

        currentTaskList.removeChild(event.target);
        completedTaskList.appendChild(event.target);
        $(completedTaskList).listview('refresh');

        $(event.target).off('swiperight', handlerRightSwipe);
        $(event.target).on('swiperight', handlerUncompleteTask);
    }
}

function handlerUncompleteTask(event) {
    if (event.target) {
        let completedTaskList = document.getElementById("completedTaskList");
        let currentTaskList = document.getElementById("currentTaskList");

        completedTaskList.removeChild(event.target);
        currentTaskList.appendChild(event.target);
        $(currentTaskList).listview('refresh');

        $(event.target).off('swiperight', handlerUncompleteTask);
        $(event.target).on('swiperight', handlerRightSwipe);
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
    let task = document.getElementById("taskField");
    let taskList = document.getElementById("currentTaskList");

    if(task.value) {
        let newTask = document.createElement("li");
        newTask.innerHTML = task.value;
        taskList.appendChild(newTask);

        $(taskList).listview('refresh');
        
        $(newTask).on('swiperight', handlerRightSwipe);
        $(newTask).on('swipeleft', handlerLeftSwipe);
        
        $("task").focus();
    }
}


function reinitialiser() {
    let currentTaskList = document.getElementById("currentTaskList");
    while (currentTaskList.firstChild ) {
        currentTaskList.removeChild(currentTaskList.firstChild);
    }
    $(currentTaskList).listview('refresh');
    
    while (completedTaskList.firstChild ) {
        completedTaskList.removeChild(completedTaskList.firstChild);
    }
    $(completedTaskList).listview('refresh');
}
