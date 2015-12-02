var ViewModel = function () {
    var self = this;
    self.users = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();
    self.Groups = ko.observableArray();
    self.newUser = {
        Group: ko.observable(),
        Email: ko.observable(),
        Price: ko.observable(),
        Name: ko.observable(),
        Year: ko.observable()
    }

    var UsersUri = '/api/Users/';
    var GroupsUri = '/api/Groups/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
            self.error(errorThrown);
        });
    }

    function getAllUsers() {
        ajaxHelper(UsersUri, 'GET').done(function (data) {
            self.users(data);
        });
    }

    self.getUserDetail = function (user) {
        ajaxHelper(UsersUri + user.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    }

    self.deleteUser = function (user) {
        ajaxHelper(UsersUri + user.Id, 'DELETE').done(function (data) {
            getAllUsers();
        });
    }

    function getGroups() {
        ajaxHelper(GroupsUri, 'GET').done(function (data) {
            self.Groups(data);
        });
    }


    self.addUser = function (formElement) {
        var User = {
            GroupId: self.newUser.Group().Id,
            Email: self.newUser.Email(),
            Name: self.newUser.Name()
        };

        ajaxHelper(UsersUri, 'POST', User).done(function (item) {
            self.users.push(item);
        });
    }

    // Fetch the initial data.
    getAllUsers();
    getGroups();
};

ko.applyBindings(ViewModel());