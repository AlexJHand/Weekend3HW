console.log('In js');

$(document).ready(onReady);

function onReady() {
    console.log('In jQ');
    getTasks();
    // Event listeners
    $('#addButton').on('click', addTask);
    $('#displayArea').on('click', '.deleteMe', deleteTask);
    $('#tasksToComplete').on('click', '.completeMe', completeTask);

}

// Function to add task to database
function addTask() {
    // Variable to hold item from input on page
    var taskToAdd = $('#inputBox').val();
    $('#inputBox').val('');
    console.log('Task entered: ', taskToAdd);
    // Wrap variable in an object to send to server
    var objectToSend = {
        task: taskToAdd
    };

    // Ajax post
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: objectToSend,
        success: function (serverRes) {
            console.log('Post serverRes', serverRes);
            // Refresh list of tasks on DOM
            getTasks();
        }
    });
} // end addTask

// Function to toggle completion of task
function completeTask() {
    // Get id of the parent div of the complete button clicked
    var thisId = $(this).parent().data('id');
    var thisCompletion = $(this).parent().data('complete');
    // Create object containing data to modify
    var objectToMod = {
        id: thisId,
        completed: thisCompletion
    }
    console.log('objectToMod -->', objectToMod);
    // Ajax put
    $.ajax({
        type: 'PUT',
        url: '/tasks',
        data: objectToMod,
        success: function(res) {
            console.log('Put res', res);
            getTasks();
        }
    })
} // end completeTask

// Function to remove task
function deleteTask() {
    // Get the id of the parent div of the delete button clicked
    var thisId = $(this).parent().data('id');
    console.log($(this).parent());
    console.log($(this));
    console.log(thisId);

    // Ajax delete
    $.ajax({
        type: 'DELETE',
        // Passing the server the id in the url
        url: '/tasks/' + thisId,
        success: function(res) {
            console.log('Delete res', res);
            getTasks();
        }
    })
} // end completeTask

// Function to retrieve tasks from database
function getTasks() {
    console.log('In getTasks');
    //$('#tasksToComplete').empty();
    // ajax get
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function (serverRes) {
            console.log('serverRes: ', serverRes);
            $('#tasksToComplete').empty();
            $('#finishedTasks').empty();
            // For each item being returned
            for (var i = 0; i < serverRes.length; i++) {
                console.log('serverRes[i]', serverRes[i]);
                // Create classes for divs based on completion
                if (serverRes[i].complete == false) {
                    var divClass = 'falseClass';
                }
                else {
                    var divClass = 'trueClass';
                }
                // Create div
                var $taskDiv = $('<div class="' + divClass + '" data-id="' + serverRes[i].id + '"'
                    + ' data-complete="' + serverRes[i].complete + '">');
                
                var $rowDiv = $('<div class="row"' + divClass + '" data-id="' + serverRes[i].id + '"'
                    + ' data-complete="' + serverRes[i].complete + '">');
                $taskDiv.append($rowDiv);

                // Add a name of task to div
                var $textDiv = $('<div class="col-lg-4 textDiv">' + serverRes[i].taskname +'</div>')
                //$taskDiv.append($textDiv);
                $rowDiv.append($textDiv);
                // Display completed/not completed
                if (serverRes[i].complete === true) {
                    var taskStatus = 'Completed';
                }
                else {
                    var taskStatus = 'Not completed';
                }
                var $completeDiv = $('<div class="col-md-4 completeDiv">' + taskStatus + '</div>')
                //$taskDiv.append($completeDiv);
                $rowDiv.append($completeDiv);
                if (taskStatus === 'Not completed') {
                    // Add completed button to div
                    var $completeButton = $('<input>', { type: 'button', class: 'completeMe btn-default', value: 'Complete' });
                    //$taskDiv.append($completeButton);
                    $rowDiv.append($completeButton);
                }
                // Add delete button to div
                var $deleteButton = $('<input>', {type: 'button', class: 'deleteMe btn-default', value: 'Delete'});
                //$taskDiv.append($deleteButton);
                $rowDiv.append($deleteButton);
                // Append div to correct section on page
                if (divClass === 'falseClass') {
                    $('#tasksToComplete').append($taskDiv);
                }
                else {
                    $('#finishedTasks').append($taskDiv);
                }
            } // end for loop
        }
    })
} // end getTasks