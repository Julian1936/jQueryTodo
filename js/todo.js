var $taskInput = $('#task-input');
var $taskList = $('#task-list');
var $tasksCompleteList = $('#tasks-completed');

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

    console.log($taskList.html());
});

$(document).on('click', '.complete-task', function(){
    $(this).text('Task Complete');
});

$(document).on('click', '.remove-task', function(){
    $(this).parent('li').remove();
});