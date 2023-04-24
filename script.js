const form = document.querySelector('form');
const taskInput = document.querySelector('input[type="text"]');
const pendingTasks = document.querySelector('#pending-tasks');
const completedTasks = document.querySelector('#completed-tasks');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskName = taskInput.value;
  
  if (taskName.trim() !== '') {
    const newTask = document.createElement('li');
    const taskText = document.createTextNode(taskName);
    newTask.appendChild(taskText);
    
    const completeButton = document.createElement('button');
    const completeText = document.createTextNode('Complete');
    completeButton.appendChild(completeText);
    completeButton.classList.add('complete-btn');
    
    completeButton.addEventListener('click', function() {
      const task = this.parentNode;
      const parent = task.parentNode;
      parent.removeChild(task);
      completedTasks.appendChild(task);
    });
    
    const editButton = document.createElement('button');
    const editText = document.createTextNode('Edit');
    editButton.appendChild(editText);
    editButton.classList.add('edit-btn');
    
    editButton.addEventListener('click', function() {
      const task = this.parentNode;
      const taskText = task.firstChild;
      const taskTextInput = document.createElement('input');
      taskTextInput.setAttribute('type', 'text');
      taskTextInput.value = taskText.textContent;
      task.insertBefore(taskTextInput, taskText);
      task.removeChild(taskText);
      
      const saveButton = document.createElement('button');
      const saveText = document.createTextNode('Save');
      saveButton.appendChild(saveText);
      saveButton.classList.add('save-btn');
      
      saveButton.addEventListener('click', function() {
        const taskName = taskTextInput.value;
        if (taskName.trim() !== '') {
          const newTaskText = document.createTextNode(taskName);
          task.insertBefore(newTaskText, taskTextInput);
          task.removeChild(taskTextInput);
          saveButton.remove();
          editButton.textContent = 'Edit';
          editButton.classList.add('edit-btn');
          editButton.classList.remove('save-btn');
        }
      });
      
      const cancelButton = document.createElement('button');
      const cancelText = document.createTextNode('Cancel');
      cancelButton.appendChild(cancelText);
      cancelButton.classList.add('cancel-btn');
      
      cancelButton.addEventListener('click', function() {
        task.insertBefore(taskText, taskTextInput);
        task.removeChild(taskTextInput);
        saveButton.remove();
        cancelButton.remove();
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.classList.remove('save-btn');
      });
      
      task.appendChild(saveButton);
      task.appendChild(cancelButton);
      
      editButton.textContent = '';
    });
    
    const deleteButton = document.createElement('button');
    const deleteText = document.createTextNode('Delete');
    deleteButton.appendChild(deleteText);
    deleteButton.classList.add('delete-btn');
    
    deleteButton.addEventListener('click', function() {
      const task = this.parentNode;
      const parent = task.parentNode;
      parent.removeChild(task);
    });
    
    newTask.appendChild(completeButton);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);
    
    pendingTasks.appendChild(newTask);
    taskInput.value = '';
  }
});