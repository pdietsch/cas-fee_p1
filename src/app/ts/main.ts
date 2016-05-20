/**
 * Created by Patrik on 18.05.2016.
 */
/// <reference path="./todo.ts"/>
/// <reference path="./services/mock-todos.ts"/>
var initHtml : string;
initHtml = "";

var template = Handlebars.compile('<div role="listitem" class="listitem"><div class="date"><div class="duedate">' +
    '{{dueDateAsString}}</div><div class="status {{#if finished}}finished{{else}}pending{{/if}}"><span class="status-icon' +
    ' {{#if finished}}ion-ios-checkmark{{else}}ion-ios-circle-outline{{/if}}"></span><span    class="status-text">Finished</span></div>' +
    '</div><div class="todo"><div class="title">{{title}}' +
    '{{#each priority}}<span class="ion-ios-bolt">{{/each}}</span><span class="ion-ios-bolt"></span></div>' +
    '<div class="desc">{{description}}</div></div><div class="actions">    <button>Edit</button>    </div>    </div>');
todoList.todos.forEach((currentNote) => {

    initHtml += template(currentNote);
})
var test = <HTMLElement>document.getElementsByClassName("todolist").item(0);
test.innerHTML = initHtml;