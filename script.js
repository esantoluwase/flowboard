(function() {
    'use strict';

    // ===== DATA =====
    const TEAM_MEMBERS = [
        { id: 'esan', name: 'Esan Toluwase Victor', role: 'Project Lead', initials: 'EV' },
        { id: 'alex', name: 'Alex Morgan', role: 'Frontend Developer', initials: 'AM' },
        { id: 'sarah', name: 'Sarah Johnson', role: 'Product Designer', initials: 'SJ' },
        { id: 'david', name: 'David Carter', role: 'Marketing', initials: 'DC' }
    ];

    const DEFAULT_PROJECTS = [
        {
            id: 'proj-1',
            name: 'Website Redesign',
            category: 'Web Development',
            status: 'In Progress',
            progress: 72,
            tasks: [
                { id: 't1', title: 'Research user requirements', description: 'Conduct user interviews and analyze competitor sites.', priority: 'High', assignee: 'Esan Toluwase Victor', due: '2026-08-25', status: 'Done' },
                { id: 't2', title: 'Create homepage wireframe', description: 'Design the first responsive homepage layout.', priority: 'High', assignee: 'Esan Toluwase Victor', due: '2026-08-28', status: 'Done' },
                { id: 't3', title: 'Design navigation', description: 'Create the main navigation structure and mobile menu.', priority: 'Medium', assignee: 'Sarah Johnson', due: '2026-09-01', status: 'In Progress' },
                { id: 't4', title: 'Develop hero section', description: 'Build the hero section with animations and CTA.', priority: 'High', assignee: 'Alex Morgan', due: '2026-09-05', status: 'In Progress' },
                { id: 't5', title: 'Implement responsive layout', description: 'Ensure the site works on all devices.', priority: 'Medium', assignee: 'Alex Morgan', due: '2026-09-10', status: 'To Do' },
                { id: 't6', title: 'Test mobile experience', description: 'Thorough testing on iOS and Android.', priority: 'Low', assignee: 'Esan Toluwase Victor', due: '2026-09-15', status: 'Backlog' },
                { id: 't7', title: 'Review accessibility', description: 'Check WCAG compliance.', priority: 'High', assignee: 'Sarah Johnson', due: '2026-09-18', status: 'Backlog' },
                { id: 't8', title: 'Deploy website', description: 'Final deployment to production.', priority: 'High', assignee: 'Alex Morgan', due: '2026-09-22', status: 'Backlog' }
            ]
        },
        {
            id: 'proj-2',
            name: 'Mobile App MVP',
            category: 'Product Development',
            status: 'In Progress',
            progress: 48,
            tasks: [
                { id: 't9', title: 'Define MVP features', description: 'Collaborate with stakeholders to define the core features.', priority: 'High', assignee: 'Esan Toluwase Victor', due: '2026-08-20', status: 'Done' },
                { id: 't10', title: 'Create user flow', description: 'Map out the user journey through the app.', priority: 'High', assignee: 'Sarah Johnson', due: '2026-08-27', status: 'Done' },
                { id: 't11', title: 'Design dashboard', description: 'Create the main dashboard UI.', priority: 'Medium', assignee: 'Sarah Johnson', due: '2026-09-03', status: 'In Progress' },
                { id: 't12', title: 'Build prototype', description: 'Create interactive prototype for testing.', priority: 'High', assignee: 'Alex Morgan', due: '2026-09-10', status: 'To Do' },
                { id: 't13', title: 'Test interactions', description: 'User testing of the prototype.', priority: 'Medium', assignee: 'Esan Toluwase Victor', due: '2026-09-17', status: 'Backlog' }
            ]
        },
        {
            id: 'proj-3',
            name: 'Marketing Campaign',
            category: 'Digital Marketing',
            status: 'Near Completion',
            progress: 86,
            tasks: [
                { id: 't14', title: 'Define audience', description: 'Create detailed buyer personas.', priority: 'High', assignee: 'David Carter', due: '2026-08-10', status: 'Done' },
                { id: 't15', title: 'Research competitors', description: 'Analyze competitor marketing strategies.', priority: 'Medium', assignee: 'David Carter', due: '2026-08-17', status: 'Done' },
                { id: 't16', title: 'Create campaign strategy', description: 'Develop the overall campaign approach.', priority: 'High', assignee: 'David Carter', due: '2026-08-24', status: 'Done' },
                { id: 't17', title: 'Prepare content', description: 'Create all campaign assets.', priority: 'High', assignee: 'Sarah Johnson', due: '2026-08-31', status: 'In Progress' },
                { id: 't18', title: 'Launch campaign', description: 'Execute the campaign across channels.', priority: 'High', assignee: 'David Carter', due: '2026-09-07', status: 'To Do' },
                { id: 't19', title: 'Analyze results', description: 'Review campaign performance data.', priority: 'Low', assignee: 'David Carter', due: '2026-09-14', status: 'Backlog' }
            ]
        },
        {
            id: 'proj-4',
            name: 'Market Research',
            category: 'Research',
            status: 'Planning',
            progress: 35,
            tasks: [
                { id: 't20', title: 'Define research questions', description: 'Identify key questions to answer.', priority: 'High', assignee: 'Esan Toluwase Victor', due: '2026-08-22', status: 'Done' },
                { id: 't21', title: 'Identify target users', description: 'Define the research participant criteria.', priority: 'Medium', assignee: 'Esan Toluwase Victor', due: '2026-08-29', status: 'Done' },
                { id: 't22', title: 'Collect responses', description: 'Conduct surveys and interviews.', priority: 'High', assignee: 'Sarah Johnson', due: '2026-09-05', status: 'In Progress' },
                { id: 't23', title: 'Analyze findings', description: 'Synthesize research data.', priority: 'Medium', assignee: 'Esan Toluwase Victor', due: '2026-09-12', status: 'To Do' },
                { id: 't24', title: 'Prepare report', description: 'Create the final research report.', priority: 'Low', assignee: 'Esan Toluwase Victor', due: '2026-09-19', status: 'Backlog' }
            ]
        }
    ];

    // ===== STATE =====
    let state = {
        projects: [],
        currentProjectId: null,
        currentView: 'dashboard',
        theme: 'light',
        filters: { priority: 'all', assignee: 'all', status: 'all' },
        searchQuery: '',
        editingTaskId: null
    };

    // ===== DOM REFS =====
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    // ===== STORAGE =====
    function loadState() {
        try {
            const saved = localStorage.getItem('flowboard_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                state.projects = parsed.projects || [];
                state.theme = parsed.theme || 'light';
                state.currentView = parsed.currentView || 'dashboard';
                state.currentProjectId = parsed.currentProjectId || null;
                return true;
            }
        } catch (e) { /* ignore */ }
        return false;
    }

    function saveState() {
        try {
            localStorage.setItem('flowboard_state', JSON.stringify({
                projects: state.projects,
                theme: state.theme,
                currentView: state.currentView,
                currentProjectId: state.currentProjectId
            }));
        } catch (e) { /* ignore */ }
    }

    function initData() {
        if (!loadState() || state.projects.length === 0) {
            state.projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
            saveState();
        }
        applyTheme();
    }

    // ===== THEME =====
    function applyTheme() {
        document.documentElement.setAttribute('data-theme', state.theme);
        $$('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === state.theme);
        });
    }

    // ===== NAVIGATION =====
    function navigateTo(view, projectId) {
        state.currentView = view;
        state.currentProjectId = projectId || null;
        saveState();

        // Update sidebar
        $$('.sidebar-nav .nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === view);
        });
        $$('.bottom-nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === view);
        });

        // Show view
        $$('.view').forEach(v => v.classList.remove('active'));
        const targetView = document.getElementById(`view-${view}`);
        if (targetView) targetView.classList.add('active');

        // Render
        switch(view) {
            case 'dashboard': renderDashboard(); break;
            case 'projects': renderProjects(); break;
            case 'board': renderBoard(projectId); break;
            case 'mytasks': renderMyTasks(); break;
            case 'team': renderTeam(); break;
            case 'reports': renderReports(); break;
        }
    }

    // ===== TOAST =====
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ===== HELPERS =====
    function getInitials(name) {
        return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    }

    function formatDate(dateStr) {
        if (!dateStr) return 'No date';
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function isOverdue(dateStr) {
        if (!dateStr) return false;
        return new Date(dateStr + 'T00:00:00') < new Date();
    }

    function getTaskCounts(project) {
        const tasks = project.tasks || [];
        const total = tasks.length;
        const done = tasks.filter(t => t.status === 'Done').length;
        const inProgress = tasks.filter(t => t.status === 'In Progress').length;
        const backlog = tasks.filter(t => t.status === 'Backlog').length;
        return { total, done, inProgress, backlog };
    }

    function calculateProgress(project) {
        const { total, done } = getTaskCounts(project);
        return total === 0 ? 0 : Math.round((done / total) * 100);
    }

    function getStatusClass(status) {
        const map = {
            'In Progress': 'inprogress',
            'Near Completion': 'nearcomplete',
            'Planning': 'planning'
        };
        return map[status] || '';
    }

    function getPriorityClass(priority) {
        return priority ? priority.toLowerCase() : 'medium';
    }

    function getAssigneeName(id) {
        const member = TEAM_MEMBERS.find(m => m.id === id);
        return member ? member.name : id;
    }

    // ===== RENDER: DASHBOARD =====
    function renderDashboard() {
        const projects = state.projects;
        const totalTasks = projects.reduce((sum, p) => sum + (p.tasks || []).length, 0);
        const doneTasks = projects.reduce((sum, p) => sum + (p.tasks || []).filter(t => t.status === 'Done').length, 0);
        const inProgressTasks = projects.reduce((sum, p) => sum + (p.tasks || []).filter(t => t.status === 'In Progress').length, 0);
        const upcoming = projects.reduce((sum, p) => {
            return sum + (p.tasks || []).filter(t => t.due && new Date(t.due + 'T00:00:00') >= new Date() && new Date(t.due + 'T00:00:00') <= new Date(Date.now() + 7*86400000)).length;
        }, 0);

        document.getElementById('stat-projects').textContent = projects.length;
        document.getElementById('stat-completed').textContent = doneTasks;
        document.getElementById('stat-inprogress').textContent = inProgressTasks;
        document.getElementById('stat-deadlines').textContent = upcoming;

        const container = document.getElementById('dashboard-project-list');
        if (projects.length === 0) {
            container.innerHTML = '<p class="text-center mt-1" style="color:var(--color-muted);">No projects yet. Create one to get started.</p>';
            return;
        }
        container.innerHTML = projects.map(p => `
            <div class="project-card" data-id="${p.id}" role="button" tabindex="0">
                <h3>${p.name}</h3>
                <span class="project-category">${p.category}</span>
                <div class="project-progress">
                    <span style="font-size:0.8rem;font-weight:600;">${p.progress}%</span>
                    <div class="progress-bar"><div class="progress-fill" style="width:${p.progress}%;"></div></div>
                </div>
                <span class="project-status ${getStatusClass(p.status)}">${p.status}</span>
            </div>
        `).join('');

        container.querySelectorAll('.project-card').forEach(el => {
            el.addEventListener('click', () => openProject(el.dataset.id));
            el.addEventListener('keydown', (e) => { if (e.key === 'Enter') openProject(el.dataset.id); });
        });
    }

    // ===== RENDER: PROJECTS =====
    function renderProjects() {
        const container = document.getElementById('project-list');
        const projects = state.projects;
        if (projects.length === 0) {
            container.innerHTML = '<p class="text-center mt-1" style="color:var(--color-muted);">No projects yet. Add one to get started.</p>';
            return;
        }
        container.innerHTML = projects.map(p => `
            <div class="project-card" data-id="${p.id}" role="button" tabindex="0">
                <h3>${p.name}</h3>
                <span class="project-category">${p.category}</span>
                <div class="project-progress">
                    <span style="font-size:0.8rem;font-weight:600;">${p.progress}%</span>
                    <div class="progress-bar"><div class="progress-fill" style="width:${p.progress}%;"></div></div>
                </div>
                <span class="project-status ${getStatusClass(p.status)}">${p.status}</span>
                <div style="margin-top:0.5rem;font-size:0.75rem;color:var(--color-muted);">
                    ${(p.tasks || []).length} tasks · ${(p.tasks || []).filter(t => t.status === 'Done').length} done
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.project-card').forEach(el => {
            el.addEventListener('click', () => openProject(el.dataset.id));
            el.addEventListener('keydown', (e) => { if (e.key === 'Enter') openProject(el.dataset.id); });
        });
    }

    // ===== OPEN PROJECT =====
    function openProject(projectId) {
        navigateTo('board', projectId);
    }

    // ===== RENDER: BOARD =====
    function renderBoard(projectId) {
        const project = state.projects.find(p => p.id === projectId);
        if (!project) {
            navigateTo('projects');
            return;
        }

        document.getElementById('board-title').textContent = project.name;
        const container = document.getElementById('kanban-board');

        const columns = ['Backlog', 'To Do', 'In Progress', 'Review', 'Done'];
        const tasks = project.tasks || [];
        const search = state.searchQuery.toLowerCase().trim();
        const filters = state.filters;

        let filteredTasks = tasks;
        if (search) {
            filteredTasks = filteredTasks.filter(t => t.title.toLowerCase().includes(search));
        }
        if (filters.priority !== 'all') {
            filteredTasks = filteredTasks.filter(t => t.priority === filters.priority);
        }
        if (filters.assignee !== 'all') {
            filteredTasks = filteredTasks.filter(t => t.assignee === filters.assignee);
        }
        if (filters.status !== 'all') {
            filteredTasks = filteredTasks.filter(t => t.status === filters.status);
        }

        container.innerHTML = `
            <div class="kanban-board">
                ${columns.map(col => {
                    const colTasks = filteredTasks.filter(t => t.status === col);
                    return `
                        <div class="kanban-column" data-status="${col}">
                            <div class="kanban-column-header">
                                ${col}
                                <span class="count">${colTasks.length}</span>
                            </div>
                            <div class="kanban-tasks" data-status="${col}">
                                ${colTasks.map(t => renderTaskCard(t, project.id)).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        // Drag and drop
        setupDragAndDrop(project.id);

        // Click on task
        container.querySelectorAll('.task-card').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.closest('.task-card')) {
                    const taskId = el.dataset.taskId;
                    openTaskDetail(project.id, taskId);
                }
            });
        });

        // Update filter listeners
        setupFilters(project.id);
        setupSearch(project.id);
    }

    function renderTaskCard(task, projectId) {
        const dueDate = task.due ? formatDate(task.due) : 'No date';
        const overdue = task.due && isOverdue(task.due) && task.status !== 'Done';
        const initials = getInitials(task.assignee || 'Unassigned');
        return `
            <div class="task-card" data-task-id="${task.id}" draggable="true">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    <span class="task-priority ${getPriorityClass(task.priority)}">${task.priority || 'Medium'}</span>
                    <span class="task-assignee">
                        <span class="avatar-small">${initials}</span>
                        ${task.assignee || 'Unassigned'}
                    </span>
                    <span class="task-due ${overdue ? 'overdue' : ''}">📅 ${dueDate}</span>
                </div>
            </div>
        `;
    }

    // ===== DRAG AND DROP =====
    function setupDragAndDrop(projectId) {
        const tasks = document.querySelectorAll('.task-card');
        const columns = document.querySelectorAll('.kanban-tasks');

        tasks.forEach(task => {
            task.addEventListener('dragstart', handleDragStart);
            task.addEventListener('dragend', handleDragEnd);
        });

        columns.forEach(col => {
            col.addEventListener('dragover', handleDragOver);
            col.addEventListener('dragenter', handleDragEnter);
            col.addEventListener('dragleave', handleDragLeave);
            col.addEventListener('drop', handleDrop);
        });

        let draggedTaskId = null;

        function handleDragStart(e) {
            draggedTaskId = this.dataset.taskId;
            this.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', draggedTaskId);
        }

        function handleDragEnd(e) {
            this.classList.remove('dragging');
            document.querySelectorAll('.kanban-tasks.drag-over').forEach(el => el.classList.remove('drag-over'));
        }

        function handleDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }

        function handleDragEnter(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        }

        function handleDragLeave(e) {
            this.classList.remove('drag-over');
        }

        function handleDrop(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            const taskId = e.dataTransfer.getData('text/plain');
            const newStatus = this.dataset.status;
            if (taskId && newStatus) {
                moveTask(projectId, taskId, newStatus);
            }
        }
    }

    function moveTask(projectId, taskId, newStatus) {
        const project = state.projects.find(p => p.id === projectId);
        if (!project) return;
        const task = project.tasks.find(t => t.id === taskId);
        if (!task || task.status === newStatus) return;
        task.status = newStatus;
        updateProjectProgress(projectId);
        saveState();
        renderBoard(projectId);
        showToast(`Task moved to ${newStatus}`, 'success');
    }

    function updateProjectProgress(projectId) {
        const project = state.projects.find(p => p.id === projectId);
        if (!project) return;
        project.progress = calculateProgress(project);
        // Update status based on progress
        if (project.progress >= 80) project.status = 'Near Completion';
        else if (project.progress >= 40) project.status = 'In Progress';
        else project.status = 'Planning';
        saveState();
    }

    // ===== FILTERS & SEARCH =====
    function setupFilters(projectId) {
        const priority = document.getElementById('filter-priority');
        const assignee = document.getElementById('filter-assignee');
        const status = document.getElementById('filter-status');

        priority.value = state.filters.priority;
        assignee.value = state.filters.assignee;
        status.value = state.filters.status;

        priority.onchange = () => { state.filters.priority = priority.value; renderBoard(projectId); };
        assignee.onchange = () => { state.filters.assignee = assignee.value; renderBoard(projectId); };
        status.onchange = () => { state.filters.status = status.value; renderBoard(projectId); };
    }

    function setupSearch(projectId) {
        const input = document.getElementById('board-search');
        input.value = state.searchQuery;
        input.oninput = () => {
            state.searchQuery = input.value;
            renderBoard(projectId);
        };
    }

    // ===== ADD TASK =====
    document.getElementById('add-task-btn').addEventListener('click', () => {
        openTaskModal();
    });

    function openTaskModal(taskData) {
        const modal = document.getElementById('task-modal');
        const form = document.getElementById('task-form');
        const title = document.getElementById('modal-title');
        const submitBtn = document.getElementById('modal-submit');
        const idField = document.getElementById('task-id');

        if (taskData) {
            title.textContent = 'Edit Task';
            submitBtn.textContent = 'Update Task';
            idField.value = taskData.id;
            document.getElementById('task-title').value = taskData.title || '';
            document.getElementById('task-desc').value = taskData.description || '';
            document.getElementById('task-priority').value = taskData.priority || 'Medium';
            document.getElementById('task-assignee').value = taskData.assignee || 'Esan Toluwase Victor';
            document.getElementById('task-due').value = taskData.due || '';
            document.getElementById('task-status').value = taskData.status || 'To Do';
        } else {
            title.textContent = 'Add Task';
            submitBtn.textContent = 'Create Task';
            idField.value = '';
            form.reset();
            document.getElementById('task-priority').value = 'Medium';
            document.getElementById('task-status').value = 'To Do';
            document.getElementById('task-assignee').value = 'Esan Toluwase Victor';
        }

        modal.hidden = false;
        document.getElementById('task-title').focus();
    }

    document.getElementById('modal-close').addEventListener('click', () => {
        document.getElementById('task-modal').hidden = true;
    });
    document.getElementById('modal-cancel').addEventListener('click', () => {
        document.getElementById('task-modal').hidden = true;
    });

    document.getElementById('task-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const projectId = state.currentProjectId;
        if (!projectId) return;

        const project = state.projects.find(p => p.id === projectId);
        if (!project) return;

        const idField = document.getElementById('task-id');
        const isEdit = idField.value !== '';

        const task = {
            id: isEdit ? idField.value : 't' + Date.now(),
            title: document.getElementById('task-title').value.trim(),
            description: document.getElementById('task-desc').value.trim(),
            priority: document.getElementById('task-priority').value,
            assignee: document.getElementById('task-assignee').value,
            due: document.getElementById('task-due').value,
            status: document.getElementById('task-status').value
        };

        if (!task.title) {
            showToast('Please enter a task title.', 'error');
            return;
        }

        if (isEdit) {
            const idx = project.tasks.findIndex(t => t.id === task.id);
            if (idx !== -1) project.tasks[idx] = task;
            showToast('Task updated successfully.', 'success');
        } else {
            project.tasks.push(task);
            showToast('Task created successfully.', 'success');
        }

        updateProjectProgress(projectId);
        saveState();
        document.getElementById('task-modal').hidden = true;
        renderBoard(projectId);
    });

    // ===== TASK DETAIL =====
    function openTaskDetail(projectId, taskId) {
        const project = state.projects.find(p => p.id === projectId);
        if (!project) return;
        const task = project.tasks.find(t => t.id === taskId);
        if (!task) return;

        const modal = document.getElementById('task-detail-modal');
        const content = document.getElementById('task-detail-content');

        content.innerHTML = `
            <div class="detail-field">
                <label>Task</label>
                <div class="value"><strong>${task.title}</strong></div>
            </div>
            <div class="detail-field">
                <label>Description</label>
                <div class="value">${task.description || 'No description provided.'}</div>
            </div>
            <div class="detail-field">
                <label>Priority</label>
                <div class="value"><span class="task-priority ${getPriorityClass(task.priority)}">${task.priority || 'Medium'}</span></div>
            </div>
            <div class="detail-field">
                <label>Assignee</label>
                <div class="value">${task.assignee || 'Unassigned'}</div>
            </div>
            <div class="detail-field">
                <label>Due Date</label>
                <div class="value">${task.due ? formatDate(task.due) : 'No date'}</div>
            </div>
            <div class="detail-field">
                <label>Status</label>
                <div class="value">${task.status}</div>
            </div>
            <div class="detail-actions">
                <button class="btn btn-primary btn-small" id="detail-edit">✏️ Edit</button>
                <button class="btn btn-danger btn-small" id="detail-delete">🗑️ Delete</button>
                <button class="btn btn-secondary btn-small" id="detail-close-btn">Close</button>
            </div>
        `;

        modal.hidden = false;

        document.getElementById('detail-edit').addEventListener('click', () => {
            modal.hidden = true;
            openTaskModal(task);
        });

        document.getElementById('detail-delete').addEventListener('click', () => {
            if (confirm(`Delete task "${task.title}"?`)) {
                project.tasks = project.tasks.filter(t => t.id !== task.id);
                updateProjectProgress(projectId);
                saveState();
                modal.hidden = true;
                renderBoard(projectId);
                showToast('Task deleted.', 'warning');
            }
        });

        document.getElementById('detail-close-btn').addEventListener('click', () => {
            modal.hidden = true;
        });
    }

    document.getElementById('detail-close').addEventListener('click', () => {
        document.getElementById('task-detail-modal').hidden = true;
    });

    // ===== MY TASKS =====
    function renderMyTasks() {
        const container = document.getElementById('my-tasks-container');
        const allTasks = [];
        state.projects.forEach(p => {
            (p.tasks || []).forEach(t => {
                if (t.assignee === 'Esan Toluwase Victor') {
                    allTasks.push({ ...t, projectName: p.name });
                }
            });
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const weekLater = new Date(today);
        weekLater.setDate(weekLater.getDate() + 7);

        const todayTasks = allTasks.filter(t => t.due && new Date(t.due + 'T00:00:00') <= today && t.status !== 'Done');
        const upcomingTasks = allTasks.filter(t => t.due && new Date(t.due + 'T00:00:00') > today && new Date(t.due + 'T00:00:00') <= weekLater && t.status !== 'Done');
        const completedTasks = allTasks.filter(t => t.status === 'Done');

        const renderSection = (title, tasks) => `
            <div class="task-section">
                <h3>${title} (${tasks.length})</h3>
                ${tasks.length === 0 ? '<p style="color:var(--color-muted);font-size:0.9rem;">No tasks.</p>' : `
                <div class="task-list">
                    ${tasks.map(t => `
                        <div class="task-list-item">
                            <div class="task-info">
                                <span class="task-title">${t.title}</span>
                                <span class="task-project">${t.projectName}</span>
                            </div>
                            <div class="task-meta-sm">
                                <span class="task-priority ${getPriorityClass(t.priority)}">${t.priority}</span>
                                <span>📅 ${t.due ? formatDate(t.due) : 'No date'}</span>
                                <span>${t.status}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                `}
            </div>
        `;

        container.innerHTML = renderSection('Today', todayTasks) + renderSection('Upcoming', upcomingTasks) + renderSection('Completed', completedTasks);
    }

    // ===== TEAM =====
    function renderTeam() {
        const container = document.getElementById('team-grid');
        container.innerHTML = TEAM_MEMBERS.map(m => {
            const tasks = state.projects.reduce((sum, p) => sum + (p.tasks || []).filter(t => t.assignee === m.name).length, 0);
            const active = state.projects.filter(p => (p.tasks || []).some(t => t.assignee === m.name && t.status !== 'Done')).length;
            return `
                <div class="team-card">
                    <div class="team-avatar">${m.initials}</div>
                    <h3>${m.name}</h3>
                    <div class="team-role">${m.role}</div>
                    <div class="team-stats">${active} active projects · ${tasks} tasks</div>
                </div>
            `;
        }).join('');
    }

    // ===== REPORTS =====
    function renderReports() {
        const container = document.getElementById('reports-container');
        const totalTasks = state.projects.reduce((sum, p) => sum + (p.tasks || []).length, 0);
        const doneTasks = state.projects.reduce((sum, p) => sum + (p.tasks || []).filter(t => t.status === 'Done').length, 0);
        const remaining = totalTasks - doneTasks;

        const statusCounts = {};
        ['Backlog', 'To Do', 'In Progress', 'Review', 'Done'].forEach(s => statusCounts[s] = 0);
        state.projects.forEach(p => (p.tasks || []).forEach(t => statusCounts[t.status] = (statusCounts[t.status] || 0) + 1));

        const maxCount = Math.max(...Object.values(statusCounts), 1);

        container.innerHTML = `
            <div class="report-card">
                <h3>Project Overview</h3>
                <div class="report-metrics">
                    <div class="report-metric">
                        <span class="number">${state.projects.length}</span>
                        <span class="label">Active Projects</span>
                    </div>
                    <div class="report-metric">
                        <span class="number">${doneTasks}</span>
                        <span class="label">Tasks Completed</span>
                    </div>
                    <div class="report-metric">
                        <span class="number">${remaining}</span>
                        <span class="label">Tasks Remaining</span>
                    </div>
                    <div class="report-metric">
                        <span class="number">${state.projects.reduce((sum, p) => sum + p.progress, 0) / state.projects.length || 0}%</span>
                        <span class="label">Avg Completion</span>
                    </div>
                </div>
            </div>
            <div class="report-card">
                <h3>Tasks by Status</h3>
                <div class="chart-bars">
                    ${Object.entries(statusCounts).map(([label, count]) => `
                        <div class="chart-bar-item">
                            <div class="bar" style="height:${(count/maxCount)*100}%;"></div>
                            <span class="bar-label">${label}</span>
                            <span class="bar-label" style="font-weight:600;color:var(--color-text);">${count}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="report-card">
                <h3>Team Productivity</h3>
                <div class="report-metrics">
                    ${TEAM_MEMBERS.map(m => {
                        const count = state.projects.reduce((sum, p) => sum + (p.tasks || []).filter(t => t.assignee === m.name && t.status === 'Done').length, 0);
                        return `
                            <div class="report-metric">
                                <span class="number" style="font-size:1.2rem;">${count}</span>
                                <span class="label">${m.name.split(' ')[0]}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    // ===== SIDEBAR NAV =====
    $$('.sidebar-nav .nav-item, .bottom-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const view = item.dataset.view;
            if (view === 'board') {
                // If board, open the first project or current
                if (state.currentProjectId) {
                    navigateTo('board', state.currentProjectId);
                } else if (state.projects.length > 0) {
                    navigateTo('board', state.projects[0].id);
                } else {
                    showToast('No projects available.', 'warning');
                }
            } else {
                navigateTo(view);
            }
        });
    });

    // ===== BACK BUTTON =====
    document.getElementById('board-back').addEventListener('click', () => {
        navigateTo('projects');
    });

    // ===== THEME SETTINGS =====
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.theme = btn.dataset.theme;
            applyTheme();
            saveState();
            showToast(`Theme switched to ${state.theme} mode.`, 'success');
        });
    });

    // ===== CHECKBOX SETTINGS =====
    document.querySelectorAll('.settings-section input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            showToast(`${cb.parentElement.textContent.trim()} ${cb.checked ? 'enabled' : 'disabled'}.`, 'success');
        });
    });

    // ===== INIT =====
    initData();
    navigateTo(state.currentView || 'dashboard', state.currentProjectId);

    // If board view but no project, go to projects
    if (state.currentView === 'board' && !state.currentProjectId) {
        navigateTo('projects');
    }

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(m => m.hidden = true);
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const search = document.getElementById('board-search');
            if (search) search.focus();
        }
    });

    console.log('FlowBoard initialized. Built by Esan Toluwase Victor.');
})();
