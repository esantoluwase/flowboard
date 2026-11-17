(() => {
"use strict";
const KEY="flowboard_presentation_v1";
const statuses=["Backlog","To Do","In Progress","Review","Done"];
const team=[{name:"Esan Toluwase Victor",role:"Workspace owner",initials:"EV"},{name:"Alex Morgan",role:"Frontend Developer",initials:"AM"},{name:"Sarah Johnson",role:"Product Designer",initials:"SJ"},{name:"David Carter",role:"Marketing",initials:"DC"}];
const seed=[
{id:"p1",name:"Website Redesign",description:"Refresh the company website and improve the user experience.",tasks:[
["Research user requirements","Collect and organize user needs.", "High","Esan Toluwase Victor","2026-11-20","Done"],
["Create homepage wireframe","Prepare the first homepage layout.", "High","Sarah Johnson","2026-11-21","Done"],
["Build responsive navigation","Create desktop and mobile navigation.", "Medium","Alex Morgan","2026-11-24","In Progress"],
["Develop hero section","Implement the homepage hero and call to action.", "High","Alex Morgan","2026-11-26","To Do"],
["Test mobile experience","Check the site on different screen sizes.", "Low","Esan Toluwase Victor","2026-11-28","Backlog"]]},
{id:"p2",name:"Mobile App MVP",description:"Plan and validate the first version of a mobile product.",tasks:[
["Define MVP scope","Agree on the essential first-release features.","High","Esan Toluwase Victor","2026-11-22","Done"],
["Map the user journey","Document the main user flows.","Medium","Sarah Johnson","2026-11-25","In Progress"],
["Create clickable prototype","Prepare an interactive prototype for review.","High","Sarah Johnson","2026-11-27","To Do"]]},
{id:"p3",name:"Marketing Campaign",description:"Prepare campaign messaging, content and launch activities.",tasks:[
["Define target audience","Identify the campaign audience.","High","David Carter","2026-11-19","Done"],
["Prepare campaign content","Draft launch content and creative assets.","Medium","David Carter","2026-11-23","In Progress"],
["Review campaign results","Prepare a simple performance report.","Low","David Carter","2026-11-30","Backlog"]]}
];
let data=load(), currentProject=null, editingTask=null, modalType="task";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function clone(x){return JSON.parse(JSON.stringify(x))}
function load(){try{const x=JSON.parse(localStorage.getItem(KEY));if(x&&Array.isArray(x.projects))return x}catch(e){}return {projects:clone(seed),theme:"light"}}
function save(){localStorage.setItem(KEY,JSON.stringify(data))}
function allTasks(){return data.projects.flatMap(p=>p.tasks.map(t=>({...t,projectId:p.id,projectName:p.name})))}
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}
function dateLabel(d){if(!d)return "No date";return new Date(d+"T00:00:00").toLocaleDateString(undefined,{day:"numeric",month:"short"})}
function progress(p){return p.tasks.length?Math.round(p.tasks.filter(t=>t.status==="Done").length/p.tasks.length*100):0}
function setTheme(){document.documentElement.dataset.theme=data.theme||"light";save()}
function showView(name){$$(".view").forEach(v=>v.classList.remove("active"));const el=$("#view-"+name);if(el)el.classList.add("active");$$(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===name));$("#crumbCurrent").textContent=({dashboard:"Overview",projects:"Projects",board:"Project board",mytasks:"My tasks",team:"Team",reports:"Reports",settings:"Settings"})[name]||name;$("#sidebar").classList.remove("open");renderAll()}
function projectLine(p){return `<div class="project-line"><div><b>${esc(p.name)}</b><br><small>${p.tasks.length} tasks · ${progress(p)}% complete</small></div><b>${progress(p)}%</b><div class="progress-track"><div class="progress-fill" style="width:${progress(p)}%"></div></div></div>`}
function taskRow(t,actions=false){return `<tr><td class="task-name">${esc(t.title)}</td><td>${esc(t.projectName||"—")}</td><td><span class="tag ${esc(t.priority)}">${esc(t.priority)}</span></td><td><span class="status">${esc(t.status)}</span></td><td>${dateLabel(t.due)}</td>${actions?`<td><button class="mini-btn" data-edit="${t.id}" data-project="${t.projectId}">Edit</button></td>`:""}</tr>`}
function renderDashboard(){
const tasks=allTasks();$("#statProjects").textContent=data.projects.length;$("#statTasks").textContent=tasks.length;$("#statProgress").textContent=tasks.filter(t=>t.status==="In Progress").length;$("#statDone").textContent=tasks.filter(t=>t.status==="Done").length;
$("#dashboardProjects").innerHTML=data.projects.length?data.projects.slice(0,5).map(projectLine).join(""):'<div class="empty">No projects yet. Create your first project.</div>';
const priorities=tasks.filter(t=>t.assignee==="Esan Toluwase Victor"&&t.status!=="Done").sort((a,b)=>({High:0,Medium:1,Low:2}[a.priority]-{High:0,Medium:1,Low:2}[b.priority])).slice(0,4);
$("#priorityTasks").innerHTML=priorities.length?priorities.map(t=>`<div class="priority-item"><i class="priority-dot"></i><div><b>${esc(t.title)}</b><small>${esc(t.projectName)} · ${dateLabel(t.due)}</small></div></div>`).join(""):'<div class="empty">No open tasks assigned to you.</div>';
$("#recentTasks").innerHTML=tasks.slice().reverse().slice(0,6).map(t=>taskRow(t)).join("")||'<tr><td colspan="5" class="empty">No tasks yet.</td></tr>';
}
function renderProjects(){const q=$("#projectSearch").value.toLowerCase();const list=data.projects.filter(p=>p.name.toLowerCase().includes(q));$("#allProjects").innerHTML=list.map(p=>`<article class="project-card" data-open-project="${p.id}"><span class="eyebrow">PROJECT</span><h3>${esc(p.name)}</h3><p>${esc(p.description||"No description added.")}</p><div class="card-meta"><span>${p.tasks.length} tasks</span><b>${progress(p)}% complete</b></div><div class="progress-track"><div class="progress-fill" style="width:${progress(p)}%"></div></div><div class="card-actions"><button class="mini-btn" data-edit-project="${p.id}">Edit details</button><button class="mini-btn" data-delete-project="${p.id}">Delete</button></div></article>`).join("")||'<div class="empty">No projects match your search.</div>'}
function renderBoard(){
const p=data.projects.find(x=>x.id===currentProject);if(!p){showView("projects");return}
$("#boardTitle").textContent=p.name;$("#boardDescription").textContent=p.description||"Manage tasks and track project progress.";
const people=[...new Set([...team.map(x=>x.name),...p.tasks.map(t=>t.assignee)])];$("#assigneeFilter").innerHTML='<option value="all">All assignees</option>'+people.map(n=>`<option>${esc(n)}</option>`).join("");
const q=$("#taskSearch").value.toLowerCase(),priority=$("#priorityFilter").value,assignee=$("#assigneeFilter").value;
$("#kanban").innerHTML=statuses.map(status=>{const tasks=p.tasks.filter(t=>t.status===status&&t.title.toLowerCase().includes(q)&&(priority==="all"||t.priority===priority)&&(assignee==="all"||t.assignee===assignee));return `<section class="kanban-col" data-status="${status}"><div class="column-head"><span>${status}</span><span>${tasks.length}</span></div>${tasks.map(t=>`<article class="task-card" draggable="true" data-task="${t.id}"><span class="tag ${esc(t.priority)}">${esc(t.priority)}</span><h4>${esc(t.title)}</h4><p>${esc(t.description||"No description")}</p><div class="task-foot"><span>${esc(t.assignee.split(" ")[0])}</span><span>${dateLabel(t.due)}</span></div><div class="task-tools"><button data-edit="${t.id}" data-project="${p.id}">Edit</button><button data-delete="${t.id}" data-project="${p.id}">Delete</button><select aria-label="Change task status" data-status-select="${t.id}" data-project="${p.id}">${statuses.map(s=>`<option ${s===t.status?"selected":""}>${s}</option>`).join("")}</select></div></article>`).join("")||'<div class="drop-hint">Drop tasks here</div>'}</section>`}).join("");
$$(".task-card").forEach(card=>card.addEventListener("dragstart",e=>{e.dataTransfer.setData("text/plain",card.dataset.task);e.dataTransfer.effectAllowed="move"}));
$$(".kanban-col").forEach(col=>{col.addEventListener("dragover",e=>{e.preventDefault();col.style.borderColor="var(--primary)"});col.addEventListener("dragleave",()=>col.style.borderColor="var(--line)");col.addEventListener("drop",e=>{e.preventDefault();col.style.borderColor="var(--line)";moveTask(e.dataTransfer.getData("text/plain"),col.dataset.status)})});
}
function renderMyTasks(){const tasks=allTasks().filter(t=>t.assignee==="Esan Toluwase Victor");$("#myTasksRows").innerHTML=tasks.map(t=>taskRow(t,true)).join("")||'<tr><td colspan="6" class="empty">No tasks assigned to you.</td></tr>'}
function renderTeam(){$("#teamGrid").innerHTML=team.map(m=>`<article class="team-card"><div class="avatar">${m.initials}</div><b>${m.name}</b><small>${m.role}</small></article>`).join("")}
function renderReports(){const tasks=allTasks(),done=tasks.filter(t=>t.status==="Done").length,today=new Date().toISOString().slice(0,10);$("#completionRate").textContent=(tasks.length?Math.round(done/tasks.length*100):0)+"%";$("#overdueCount").textContent=tasks.filter(t=>t.due&&t.due<today&&t.status!=="Done").length;$("#highCount").textContent=tasks.filter(t=>t.priority==="High"&&t.status!=="Done").length;$("#statusChart").innerHTML=statuses.map(s=>{const n=tasks.filter(t=>t.status===s).length;return `<div class="bar-row"><span>${s}</span><div class="bar-track"><div class="bar-fill" style="width:${tasks.length?n/tasks.length*100:0}%"></div></div><b>${n}</b></div>`}).join("");$("#reportProjects").innerHTML=data.projects.map(projectLine).join("")||'<div class="empty">No project data yet.</div>'}
function renderAll(){renderDashboard();renderProjects();renderMyTasks();renderTeam();renderReports();if($("#view-board").classList.contains("active"))renderBoard()}
function openModal(type,projectId=null,task=null){
modalType=type;editingTask=task;$("#modalTitle").textContent=type==="project"?(projectId?"Edit project":"Create project"):(task?"Edit task":"Create task");$("#projectFields").classList.toggle("hidden",type!=="project");$("#taskFields").classList.toggle("hidden",type!=="task");$("#itemId").value=projectId||task?.id||"";
if(type==="project"){const p=data.projects.find(x=>x.id===projectId);$("#projectName").value=p?.name||"";$("#projectDesc").value=p?.description||""}
else{const p=data.projects.find(x=>x.id===(projectId||currentProject))||data.projects[0];$("#taskAssignee").innerHTML=team.map(m=>`<option>${m.name}</option>`).join("");$("#taskTitle").value=task?.title||"";$("#taskDesc").value=task?.description||"";$("#taskPriority").value=task?.priority||"Medium";$("#taskStatus").value=task?.status||"To Do";$("#taskAssignee").value=task?.assignee||"Esan Toluwase Victor";$("#taskDue").value=task?.due||"";$("#itemId").dataset.project=p?.id||""}
$("#formError").textContent="";$("#modalBackdrop").classList.add("open")
}
function closeModal(){$("#modalBackdrop").classList.remove("open")}
function submitForm(e){e.preventDefault();if(modalType==="project"){const id=$("#itemId").value,name=$("#projectName").value.trim();if(!name)return;if(id){const p=data.projects.find(x=>x.id===id);p.name=name;p.description=$("#projectDesc").value.trim()}else data.projects.push({id:"p"+Date.now(),name,description:$("#projectDesc").value.trim(),tasks:[]});save();closeModal();renderAll();toast("Project saved");return}
const title=$("#taskTitle").value.trim();if(!title){$("#formError").textContent="Please enter a task title.";return}const pid=$("#itemId").dataset.project||currentProject||data.projects[0]?.id;const p=data.projects.find(x=>x.id===pid);if(!p){$("#formError").textContent="Create a project before adding tasks.";return}
const task={id:$("#itemId").value||"t"+Date.now(),title,description:$("#taskDesc").value.trim(),priority:$("#taskPriority").value,status:$("#taskStatus").value,assignee:$("#taskAssignee").value,due:$("#taskDue").value};const existing=p.tasks.findIndex(t=>t.id===task.id);if(existing>=0)p.tasks[existing]=task;else p.tasks.push(task);save();closeModal();renderAll();if($("#view-board").classList.contains("active"))renderBoard();toast(existing>=0?"Task updated":"Task created")}
function moveTask(id,status){const p=data.projects.find(x=>x.id===currentProject),t=p?.tasks.find(x=>x.id===id);if(t){t.status=status;save();renderAll();renderBoard();toast("Task moved to "+status)}}
function editTask(id,pid){const p=data.projects.find(x=>x.id===pid),t=p?.tasks.find(x=>x.id===id);if(t)openModal("task",pid,t)}
function deleteTask(id,pid){if(!confirm("Delete this task? This cannot be undone."))return;const p=data.projects.find(x=>x.id===pid);if(p){p.tasks=p.tasks.filter(t=>t.id!==id);save();renderAll();toast("Task deleted")}}
function exportCSV(){const rows=[["Task","Project","Description","Priority","Assignee","Due date","Status"],...allTasks().map(t=>[t.title,t.projectName,t.description,t.priority,t.assignee,t.due,t.status])];const csv=rows.map(r=>r.map(v=>'"'+String(v??"").replace(/"/g,'""')+'"').join(",")).join("\n");download(csv,"flowboard-tasks.csv","text/csv")}
function download(content,name,type){const a=document.createElement("a"),url=URL.createObjectURL(new Blob([content],{type}));a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}
function backup(){download(JSON.stringify(data,null,2),"flowboard-backup.json","application/json")}
function init(){
$("#todayLabel").textContent=new Date().toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short",year:"numeric"});setTheme();$$("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));$$("[data-goto]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.goto)));
$("#menuBtn").onclick=()=>$("#sidebar").classList.toggle("open");$("#themeBtn").onclick=$("#settingsTheme").onclick=()=>{data.theme=data.theme==="dark"?"light":"dark";setTheme();toast("Appearance updated")};
$("#newProjectBtn").onclick=()=>openModal("project");$("#quickAdd").onclick=$("#newTaskBtn").onclick=()=>{if(!data.projects.length){toast("Create a project first");showView("projects");return}if(!currentProject)currentProject=data.projects[0].id;openModal("task",currentProject)};
$("#backProjects").onclick=()=>showView("projects");$("#closeModal").onclick=$("#cancelModal").onclick=closeModal;$("#modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")closeModal()});$("#itemForm").onsubmit=submitForm;
$("#projectSearch").oninput=renderProjects;["taskSearch","priorityFilter","assigneeFilter"].forEach(id=>$("#"+id).addEventListener("input",renderBoard));
$("#exportBtn").onclick=exportCSV;$("#backupBtn").onclick=backup;
$("#resetBtn").onclick=()=>{if(confirm("Reset all local FlowBoard data to the sample workspace?")){data={projects:clone(seed),theme:data.theme};save();renderAll();toast("Demo workspace restored")}};
document.addEventListener("click",e=>{
const open=e.target.closest("[data-open-project]");if(open&&!e.target.closest("button")){currentProject=open.dataset.openProject;showView("board")}
const ep=e.target.closest("[data-edit-project]");if(ep){e.stopPropagation();openModal("project",ep.dataset.editProject)}
const dp=e.target.closest("[data-delete-project]");if(dp){e.stopPropagation();if(confirm("Delete this project and all its tasks?")){data.projects=data.projects.filter(p=>p.id!==dp.dataset.deleteProject);save();renderAll();toast("Project deleted")}}
const edit=e.target.closest("[data-edit]");if(edit)editTask(edit.dataset.edit,edit.dataset.project);
const del=e.target.closest("[data-delete]");if(del)deleteTask(del.dataset.delete,del.dataset.project);
});
document.addEventListener("change",e=>{const s=e.target.closest("[data-status-select]");if(s){const p=data.projects.find(x=>x.id===s.dataset.project),t=p?.tasks.find(x=>x.id===s.dataset.statusSelect);if(t){t.status=s.value;save();renderAll();renderBoard()}}});
renderAll();
}
init();
})();