document.addEventListener('DOMContentLoaded', async (params) => {
    const addTaskBtn   = document.getElementById('addTaskBtn');
    const newTaskInput = document.getElementById('newTaskInput');
    const taskList   = document.getElementById('taskList');

    await loadTasks();

    addTaskBtn.addEventListener('click', ()=>{
        addTasks().then(saveTasks); // Promesa y Async/Await
    });

    // Manejo de Formularios: Evento de formulario unico que evita el comportamiento predeterminado
    document.querySelector('form').addEventListener('submit', async(event) => {
       event.preventDefault(); // Evita que el formulario se envie de manera tradicional y que este se envie y se de tratamiento en el back
       await addTasks();
       saveTasks();
    });

    async function addTasks() {
        const taskText = newTaskInput.value.trim();

        const taskElement = document.createElement('div');
        taskElement.className = 'list-group-item d-flex justify-content-between align-items-center';
        taskElement.innerHTML = `
        <span class="task-content">${taskText}</span>
        <button class="btn btn-danger delete-btn">Eliminar</button>
        `;

        const deleteBtn = taskElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', ()=>{ taskElement.remove()})

        taskElement.addEventListener('click',()=>{
            taskElement.classList.toggle('completed');
        });

        taskList.appendChild(taskElement);

        newTaskInput.value = '';

        return taskText // retorna nuestro texto de la tarea para que la usemos en nuestra promesa
        
    }

    async function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-content').forEach(task => tasks.push(task.textContent));
        localStorage.setItem('tasks', JSON.stringify(tasks) ) // se guarda en JSON en local
    }

    async function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')); //JSON y manejo de datos locales guadados
        if (tasks) {
            tasks.forEach(taskText =>{
                const taskElement = document.createElement('div');
                taskElement.className = 'list-group-item d-flex justify-content-between align-items-center';
                taskElement.innerHTML = `
                    <span class="task-content">${taskText}</span>
                    <button class="btn btn-danger delete-btn">Eliminar</button>
                `;
                const deleteBtn = taskElement.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', ()=>{ taskElement.remove()})

                taskElement.addEventListener('click',()=>{
                    taskElement.classList.toggle('completed');
                });

                taskList.appendChild(taskElement);
            });
        }
    }


})
