console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    getAllTasks();
    $('#newTaskButton').on('click', addNewTask);
    $('#taskList').on('click', '.completeButton', completeTask);
}

function getAllTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(function(response) {
        console.log('GET response', response);
        $('#taskList').empty();
        response.forEach(appendToDOM);
    });
}

function appendToDOM(taskObject) {
    $newListItem = $('<li></li>');
    $newListItem.append(taskObject.name);
    if (taskObject.is_complete) {
        $newListItem.addClass('completed');
    } else {
        $newListItem.append('<button class="completeButton">Complete</button>');
    }
    $newListItem.data('id', taskObject.id);
    $('#taskList').append($newListItem);
}

function addNewTask() {
    var newTaskName = $('#newTaskName').val();
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            name: newTaskName
        }
    }).then(function(response) {
        console.log('POST response', response);
        $('#newTaskName').val('');
        getAllTasks();
    });
}

function completeTask() {
    console.log($(this).data()); // this should log {id: '7'} or whatever the id is
    var taskToComplete = $(this).parent().data().id;
    console.log('taskToComplete', taskToComplete);
    
    $.ajax({
        method: 'PUT',
        url: '/tasks/complete/' + taskToComplete
    }).then(function(response) {
        console.log('PUT response', response)
        getAllTasks();
    });
}