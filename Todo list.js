const form = document.getElementById('todo-form');
        const input = document.getElementById('todo-input');
        const list = document.getElementById('todo-list');
        const clearBtn = document.getElementById('clear-btn');

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function renderTasks() {
            list.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.textContent = task.text;
                if (task.done) li.classList.add('done');

                li.addEventListener('click', () => {
                    tasks[index].done = !tasks[index].done;
                    saveTasks();
                    renderTasks();
                });

                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.style.marginLeft = '10px';
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                });

                li.appendChild(removeBtn);
                list.appendChild(li);
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const taskText = input.value.trim();
            if (taskText === '') return;
            tasks.push({ text: taskText, done: false });
            saveTasks();
            renderTasks();
            input.value = '';
        });

        clearBtn.addEventListener('click', () => {
            tasks = [];
            saveTasks();
            renderTasks();
        });

        renderTasks();
    