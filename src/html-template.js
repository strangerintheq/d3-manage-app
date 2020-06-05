var icons = require('./icons');

module.exports = function (properties) {
    return`

<div id="header" style="background-color: #51B0EF" 
     class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow">
    <div class="lh-600" style="width: 630px">
        <h4 class="mb-0 text-white lh-100">${properties.name}</h4>
        <small>${properties.title}</small>
    </div>
    <div class="btn-group">
        <label id="button-clear" class="btn btn-secondary" title="Clear">${icons.trash()}</label>
    </div>
</div>

<div id="form-list" class="">
    <h3 id="msg" class="hidden text-center"></h3>
    <ul id="buildings-list" class="list-group hidden"></ul>
    <br>
    <nav>
    <ul id="pagination" class="pagination justify-content-center"></ul>
    </nav>
    <div class="text-center">
        <button id="button-new" type="button" class="btn btn-lg btn-primary btn-bl">New ${properties.entityName}</button>
    </div>
</div>

<div id="form-new" class="form-signin hidden" onsubmit="return false">
    <h1 class="h3 mb-3 font-weight-normal text-center">New ${properties.entityName}</h1>
    <label for="inputName" class="sr-only">Name</label>
    <input id="inputName" class="form-control" placeholder="Name" required="" autofocus="">
    <br>
    <button id="button-create" class="btn btn-lg btn-primary btn-block" type="submit">Create</button>
</div>`;
}