/**
 * Created by Patrik on 18.05.2016.
 */
/// <reference path="./definitions/note.ts"/>
/// <reference path="./definitions/handlebars-1.0.0.d.ts"/>

var initData = new Array<Note>();
var note = new Note("Task1","Description1",1,new Date(2016,10,11));
initData.push(note);
note = new Note("Task2","Description2",2,new Date(2016,10,12), true);
initData.push(note);
note = new Note("Task3","Description3",3,new Date(2016,10,13));
initData.push(note);
note = new Note("Task4","Description4",4,new Date(2016,10,14));
initData.push(note);
note = new Note("Task5","Description5",5,new Date(2016,10,15), true);
initData.push(note);
note = new Note("Task6","Description6",2,new Date(2016,10,16));
initData.push(note);
note = new Note("Task7","Description7",5,new Date(2016,10,17));
initData.push(note);
note = new Note("Task8","Description8",3,new Date(2016,10,18));
initData.push(note);
note = new Note("Task9","Description9",2,new Date(2016,10,19));
initData.push(note);
var template :any = this["P1"]["templates"]["note"];
alert(template);
var initHtml : string;
initHtml = "";

/*var template = Handlebars.compile('<div role="listitem" class="listitem"><div class="date"><div class="duedate">' +
    '{{dueDate}}</div><div class="status {{#if finished}}finished{{else}}pending{{/if}}"><span class="status-icon' +
    ' {{#if finished}}ion-ios-checkmark{{else}}ion-ios-circle-outline{{/if}}"></span><span    class="status-text">Finished</span></div>' +
    '</div><div class="todo"><div class="title">{{title}}' +
    '{{#each priority}}<span class="ion-ios-bolt">{{/each}}</span><span class="ion-ios-bolt"></span></div>' +
    '<div class="desc">{{description}}</div></div><div class="actions">    <button>Edit</button>    </div>    </div>');*/
initData.forEach((currentNote) => {

    initHtml += template(currentNote);
})
var todoList = <HTMLElement>document.getElementsByClassName("todolist").item(0);
todoList.innerHTML = initHtml;