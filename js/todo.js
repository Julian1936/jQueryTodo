jQuery(document).on('click', '#add-task-btn', function(){
    var taskToAdd = jQuery('#add-task').val();
    var dataTaskName = taskToAdd.replace(/\s+/g, '-').toLowerCase();
    if(taskToAdd != '') {
        jQuery('#task-list').append('<li data-task_name="'+dataTaskName+'"><span class="task-name">'+taskToAdd+'</span> <span class="task-btn complete-task">Done</span><span id="'+dataTaskName+'" class="task-btn remove-task">Remove Task</span></li>');
    	jQuery('#add-task').val('');
    } else {
        alert('No task entered');
    }
});

jQuery(document).on('click', '.complete-task', function(){
    jQuery(this).text('Task Complete');
});

jQuery(document).on('click', '.remove-task', function(){
	var dataName = jQuery(this).attr('id');
	jQuery('li[data-task_name="'+dataName+'"]').remove();
});