var $taskInput = $('#task-input');
var $taskList = $('#task-list');
var $tasksCompleteList = $('#tasks-completed');

var $storedTaskList = JSON.parse(localStorage.getItem('taskList'));
var $storedCompleteTasks = JSON.parse(localStorage.getItem('completedTasks'));

$(document).ready(function(){
    $($taskList).html($storedTaskList);
    $($tasksCompleteList).html($storedCompleteTasks);
    numberOfTasks();
});

$(document).on('click', '#add-task-btn', function(){
    var taskText = $taskInput.val();
    if (taskText === '') {
        alert('No task entered');
        return;
    }
    var $task = $('<li />');
    $('<span />', { class: 'task-name' }).text(taskText).appendTo($task);
    $('<span />', { class: 'task-btn complete-task' }).text('Done').appendTo($task);
    $('<span />', { class: 'task-btn remove-task' }).text('Remove task').appendTo($task);

    $taskList.append($task);
    $taskInput.val('');
    storeTaskList();
    numberOfTasks()
});

$(document).on('click', '.complete-task', function(){
    $(this).text('Task Complete');
    $(this).parent('li').prependTo($tasksCompleteList);
    storeTaskList();
    completeTaskList();
    numberOfTasks()
});

$(document).on('click', '.remove-task', function(){
    $(this).parent('li').remove();
    storeTaskList();
    completeTaskList();
    numberOfTasks()
});

// Function to store incomplete list in localStorage
function storeTaskList() {
    localStorage.setItem('taskList', JSON.stringify($taskList.html()));
}

// Function to store completed task list in localStorage
function completeTaskList() {
    localStorage.setItem('completedTasks', JSON.stringify($tasksCompleteList.html()));
}

// Function to update number completed and left to do
function numberOfTasks() {
    $('#number-remaining span').text($('#task-list li').length);
    $('#number-completed span').text($('#tasks-completed li').length);
}