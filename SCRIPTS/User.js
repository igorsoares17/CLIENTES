class User {

    constructor(name, gender, birth, email, photo, timeRegister, admin) {

        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._email = email;
        this._photo = photo;
        this._timeRegister = timeRegister;
        this._admin = admin;

    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get gender() {
        return this.gender;
    }

    set gender(value) {
        this._gender = value;
    }

    get birth() {
        return this._birth;
    }

    set birth(value) {
        this._birth = value;
    }

    get email() {
        return this.email;
    }

    set email(value) {
        this._email = value;
    }

    get photo() {
        return this.photo;
    }

    set photo(value) {
        this._photo = value;
    }

    get timeRegister() {

        return this._timeRegister;
    }

    set timeRegister(value) {

        this._timeRegister = value;
    }

    get admin() {

        return this._admin;
    }

    set admin(value) {

        this._admin = value;
    }

}

let user = new User();