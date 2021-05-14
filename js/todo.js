var $taskInput = $('#task-input');
var $taskList = $('#task-list');
var $tasksCompleteList = $('#tasks-completed');

$(document).ready(function(){
    loadTaskList();
    loadCompletedTaskList();
    updateNumberOfTasks();
    recentlyCompleted();
});

$(document).on('click', '#add-task-btn', function(){
    var taskText = $taskInput.val();
    taskText = $.trim(taskText);
    if (taskText === '') {
        alert('No task entered');
        return;
    }

    var duplicate = false;
    $('span.task-name').each(function(){
        var dupeItem = $(this).text();
        if(dupeItem === taskText) {
            alert('There is a duplicate task. Please add another task.');
            duplicate = true;
        }
    });

    if(duplicate === false) {
        var $task = $('<li />');
        $('<span />', { class: 'task-name' }).text(taskText).appendTo($task);
        $('<span />', { class: 'task-btn complete-task' }).text('Done').appendTo($task);
        $('<span />', { class: 'task-btn remove-task' }).text('Remove task').appendTo($task);
        $taskList.append($task);
        $taskInput.val('');
    }

    storeTaskList();
    updateNumberOfTasks()
});

$(document).on('click', '.complete-task', function(){
    $(this).text('Task Complete');
    $(this).parent('li').prependTo($tasksCompleteList);
    storeTaskList();
    storeCompletedTaskList();
    updateNumberOfTasks();
    recentlyCompleted();
});

$(document).on('click', '.remove-task', function(){
    $(this).parent('li').remove();
    storeTaskList();
    storeCompletedTaskList();
    updateNumberOfTasks();
    recentlyCompleted();
});


// Functions to store/load incomplete list in localStorage
function storeTaskList() {
    localStorage.setItem('taskList',  JSON.stringify($taskList.html()));
}

function loadTaskList() {
    $taskList.html(JSON.parse(localStorage.getItem('taskList')));
}

// Functions to store/load completed task list in localStorage
function storeCompletedTaskList() {
    localStorage.setItem('completedTasks', JSON.stringify($tasksCompleteList.html()));
}

function loadCompletedTaskList() {
    $tasksCompleteList.html(JSON.parse(localStorage.getItem('completedTasks')));
}

// Function to update number completed and left to do
function updateNumberOfTasks() {
    $('#number-remaining span').text($('#task-list li').length);
    $('#number-completed span').text($('#tasks-completed li').length);
}

// Function to show most recently completed task

function recentlyCompleted() {
    if($('#tasks-completed li').length >= 1) {
        var recentlyCompleted = $( "#tasks-completed li:first-child span.task-name" ).text();
        $('#recently-complete').text('Recently completed task: ' + recentlyCompleted);
    } else {
        $('#recently-complete').text('');
    }
}