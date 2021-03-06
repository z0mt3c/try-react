var Reflux = require('reflux');
var reqwest = require('reqwest');
var rootResource = '/api/repository';

var Actions = Reflux.createActions(
    {
        'list': {asyncResult: true},
        'files': {asyncResult: true},
        'filesClear': {},
        'sync': {asyncResult: true},
        'get': {asyncResult: true},
        'create': {asyncResult: true},
        'delete': {asyncResult: true},
        'update': {asyncResult: true}
    }
);

Actions.create.listen(function(project) {
    reqwest({
        method: 'post',
        url: rootResource,
        type: 'json',
        data: project
    }).then(this.completed, this.failed);
});

Actions.delete.listen(function(id) {
    reqwest({
        method: 'delete',
        url: rootResource + '/' + id,
        type: 'json'
    }).then(this.completed, this.failed);
});

Actions.update.listen(function(project) {
    return reqwest({
        method: 'put',
        url: rootResource + '/' + project.id,
        type: 'json',
        data: project
    }).then(this.completed, this.failed);
});

Actions.sync.listen(function(id) {
    return reqwest({
        method: 'post',
        url: rootResource + '/' + id + '/sync',
        type: 'json'
    }).then(this.completed, this.failed);
});

Actions.files.shouldEmit = function(id) {
    var shouldEmit = !!id;

    if (!shouldEmit) {
        Actions.filesClear();
    }

    return shouldEmit;
};

Actions.sync.shouldEmit = function(id) {
    return !!id;
};

module.exports = Actions;