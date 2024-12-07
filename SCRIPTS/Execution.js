class Execution {

    constructor() {
    
        this.form = document.querySelector("form");
        this.inputs = document.querySelectorAll("input");
        this.areaClients = document.getElementById("clients");
        this.inputAdmin = document.getElementById("input-admin");

        this.numberAdmin = 0;
        this.numberClients = 0;
        this.arrayClients = [];
        this.arrayPhotos = [];

        //ALTURA INICIAL DA DIV CLIENTS PARA O JAVASCRIPT:
        this.height = "40vh";

        this.addDatas();
        this.submitForm();
        this.getPhoto();
        this.img = "";
     
    }

    addDatas() {

        this.usersStorage = JSON.parse(localStorage.getItem("users"));

        if (this.usersStorage != null && this.usersStorage.length > 0) {

            for (let qtd = 0; qtd < this.usersStorage.length; qtd++) {

                this.arrayClients.push(this.usersStorage[qtd]);

                let newHeight = Utils.getHeight(Utils.getNumber(this.height));
        
                this.height = newHeight;
                this.areaClients.style.height = this.height;

                let areaNewClient = document.createElement("div");
                this.areaClients.appendChild(areaNewClient);
                areaNewClient.setAttribute("class", "area-new-client");

                let areaDatas = []

                for (let i = 0; i <= 7; i++) {

                    areaDatas[i] = document.createElement("div");
                    areaNewClient.appendChild(areaDatas[i]);
                    areaDatas[i].setAttribute("class", "area-datas"); 
                }

                areaDatas[0].innerHTML = `<figure class="figure-datas">
                                            <img class="img-datas" src="${this.usersStorage[qtd]._photo}" alt="Foto cliente">
                                        </figure>`;

                areaDatas[1].innerHTML = `<h3 class="title-datas">NOME</h3>
                                        <p class="text-datas" data-name="${this.usersStorage[qtd]._name}">${this.usersStorage[qtd]._name}</p>`;
            
                areaDatas[2].innerHTML = `<h3 class="title-datas">EMAIL</h3>
                                        <p class="text-datas" data-email="${this.usersStorage[qtd]._email}">${this.usersStorage[qtd]._email}</p>`;

                areaDatas[3].innerHTML = `<h3 class="title-datas">DATA NASC</h3>
                                        <p class="text-datas" data-birth="${this.usersStorage[qtd]._birth}">${this.usersStorage[qtd]._birth}</p>`;
                
                areaDatas[4].innerHTML = `<h3 class="title-datas">REGISTRO</h3>
                                        <p class="text-datas" data-register="${this.usersStorage[qtd]._timeRegister}">${this.usersStorage[qtd]._timeRegister}</p>`;
                                
                areaDatas[5].innerHTML = `<h3 class="title-datas">SEXO</h3>
                                        <p class="text-datas" data-gender="${this.usersStorage[qtd]._gender}">${this.usersStorage[qtd]._gender}</p>`;

                areaDatas[6].innerHTML = `<h3 class="title-datas">ADMIN</h3>
                                        <p class="text-datas" data-admin="${this.usersStorage[qtd]._admin}">${this.usersStorage[qtd]._admin}</p>`;

                areaDatas[7].innerHTML = `<button class="button-user-edit">Editar</button>
                                        <button class="button-user-delete">Excluir</button>`

                this.numberClients = 0;

                for (let z = 0; z < this.areaClients.children.length-2; z++) {

                    this.numberClients++;
                }

                this.updateCountInit();
                    
                this.editUser(this.numberClients);
                this.removeUser(this.numberClients);       

                this.arrayPhotos.push(this.img);

                this.addSessionStorage();
            }
        }

        else {

            return;

        }
    }
   
    submitForm() {
        
        this.form.addEventListener('submit', event => {

            event.preventDefault();

            //VARIÁVEIS E MÉTODOS PARA GARANTIR QUE OS DADOS DIGITADOS SÃO VÁLIDOS:

            let isValidName = this.validInputName(this.inputs[0].value);

            //SE O USUÁRIO RETIRAR O REQUIRED DO HTML, O INPUT FICA VERMELHO:

            if (!this.inputs[0].value || !this.inputs[1].value || !this.inputs[2].value) {

                for (let x = 0; x < 3; x++) {

                    if (!this.inputs[x].value) {
    
                        this.inputs[x].style.border = "2px solid red";
                        return;
                    }
                }
            }

            else if (!this.inputs[3].checked && !this.inputs[4].checked) {

                window.alert("Selecione o sexo!");
                    
            }

            else if (this.img == "") {

                window.alert("Selecione a foto!");
                    
            }

            else if (isValidName != true) {

                window.alert(isValidName);
            }

            else {

                this.addUser();
                this.form.reset();

                for (let y = 0; y < 3; y++) {

                    this.inputs[y].style.border = "2px solid #000"
                }
            }
        });
    }

    addUser() {

        let newLetter = this.inputs[0].value.charAt(0).toUpperCase();
        this.inputs[0].value = this.inputs[0].value.replace(`${this.inputs[0].value.charAt(0)}`, `${newLetter}`);

        if (!this.inputAdmin.checked) { 

            this.user = new User(this.inputs[0].value, document.querySelector('input[name="gender"]:checked').value, this.inputs[2].value, this.inputs[1].value, this.img, Utils.dateFormat(new Date), false);
        }

        else {

            this.user = new User(this.inputs[0].value, document.querySelector('input[name="gender"]:checked').value, this.inputs[2].value, this.inputs[1].value, this.img, Utils.dateFormat(new Date), true);
        }

        this.arrayClients.push(this.user);

        this.form.dataset.user = JSON.stringify(this.user);

        console.log(JSON.parse(this.form.dataset.user));

        this.moreLine();

        this.addLocalStorage();
    }

    moreLine() {

        let newHeight = Utils.getHeight(Utils.getNumber(this.height));
        
        this.height = newHeight;
        this.areaClients.style.height = this.height;

        let areaNewClient = document.createElement("div");
        this.areaClients.appendChild(areaNewClient);
        areaNewClient.setAttribute("class", "area-new-client");

        let areaDatas = []

        for (let i = 0; i <= 7; i++) {

            areaDatas[i] = document.createElement("div");
            areaNewClient.appendChild(areaDatas[i]);
            areaDatas[i].setAttribute("class", "area-datas"); 
        }

        areaDatas[0].innerHTML = `<figure class="figure-datas">
                                       <img class="img-datas" src="${this.img}" alt="Foto cliente">
                                  </figure>`;

        areaDatas[1].innerHTML = `<h3 class="title-datas">NOME</h3>
                                   <p class="text-datas" data-name="${this.user._name}">${this.user._name}</p>`;
    
        areaDatas[2].innerHTML = `<h3 class="title-datas">EMAIL</h3>
                                   <p class="text-datas" data-email="${this.user._email}">${this.user._email}</p>`;
        areaDatas[3].innerHTML = `<h3 class="title-datas">DATA NASC</h3>
                                   <p class="text-datas" data-birth="${this.user._birth}">${this.user._birth}</p>`;
        
        areaDatas[4].innerHTML = `<h3 class="title-datas">REGISTRO</h3>
                                   <p class="text-datas" data-register="${this.user._timeRegister}">${this.user._timeRegister}</p>`;
                        
        areaDatas[5].innerHTML = `<h3 class="title-datas">SEXO</h3>
                                   <p class="text-datas" data-gender="${this.user._gender}">${this.user._gender}</p>`;

        areaDatas[6].innerHTML = `<h3 class="title-datas">ADMIN</h3>
                                   <p class="text-datas" data-admin="${this.user._admin}">${this.user._admin}</p>`;

        areaDatas[7].innerHTML = `<button class="button-user-edit">Editar</button>
                                  <button class="button-user-delete">Excluir</button>`

        this.numberClients = 0;

        for (let z = 0; z < this.areaClients.children.length-2; z++) {

            this.numberClients++;
        }

        this.updateCountCad();
            
        this.editUser(this.numberClients);
        this.removeUser(this.numberClients);       

        this.arrayPhotos.push(this.img);

        this.addSessionStorage();
    }

    getPhoto() {

        let photoInput = document.querySelector("input[type=file]")

        photoInput.addEventListener('change', event => {

            if (photoInput.files && photoInput.files[0]) {

                let reader = new FileReader()

                reader.onload = (e) => {

                    this.img = e.target.result
                }

                reader.readAsDataURL(photoInput.files[0])
            }
        })
    }

    updateCountCad() {

        //MÉTODO QUE ATUALIZA AS ESTATÍSTICAS APÓS USUÁRIO SER CADASTRADO

        this.numberClients = 0;

        for (let z = 0; z < this.areaClients.children.length-2; z++) {

            this.numberClients++;
        }

        if (this.user._admin) {

            this.numberAdmin++;
        }

        let clientsQuantity = document.querySelector("#title-clients");
        let adminQuantity = document.querySelector("#title-admin");

        clientsQuantity.innerHTML = `CLIENTES (${this.numberClients})`;
        adminQuantity.innerHTML = `ADMIN (${this.numberAdmin})`;

    }

    updateCountRemove(value) {

        //MÉTODO QUE ATUALIZA ESTATÍSTICAS APÓS USUÁRIO SER REMOVIDO

        let textProblem = this.arrayClients[value-1]._admin;

        this.numberClients--;

        if (textProblem == true) {

            this.numberAdmin--;
        }

        this.arrayClients.splice(value-1, 1);
        this.addSessionStorage();

        let clientsQuantity = document.querySelector("#title-clients");
        let adminQuantity = document.querySelector("#title-admin");

        clientsQuantity.innerHTML = `CLIENTES (${this.numberClients})`;
        adminQuantity.innerHTML = `ADMIN (${this.numberAdmin})`;
    }

    validInputName(name) {

        //VALIDAR SE O NOME CONTÉM PELO MENOS 4 LETRAS E SOMENTE LETRAS

        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', " "];

        for (let x = 0; x < name.length; x++) {

            if (letters.indexOf(name[x]) == -1) {

                return "O NOME DEVE CONTER APENAS LETRAS!"
            }

        }

        if (name.length < 4) {

            return "O NOME DEVE CONTER PELO MENOS QUATRO LETRAS"
        }

        else {

            return true;
        }
    }

    editUser(number) {

        this.buttonsEdit = document.getElementsByClassName("button-user-edit");
        let buttonEdit = this.buttonsEdit[number-1];

        buttonEdit.addEventListener('click', event => {

            this.arrayAreaNewClient = Array.from(document.getElementsByClassName("area-new-client"))[number-1];
            this.textDatas = Array.from(this.arrayAreaNewClient.children);

            for (let d = 1; d < 7; d++) {
  
                this.textDatas[d].contentEditable = "true";
            }
        })

        this.finishEdit(number);
    
    }

    removeUser(number) {

        this.buttonsDelete = document.getElementsByClassName("button-user-delete");
        let buttonDelete = this.buttonsDelete[number-1];

        buttonDelete.addEventListener('click', event => {

            this.updateCountRemove(number);
            this.arrayPhotos.splice(number-1, 1);
            this.addSessionStorage();
            this.addLocalStorage();

            Array.from(document.querySelectorAll(".area-new-client"))[number-1].remove();

        })

    }

    finishEdit(number) {

        document.addEventListener('keydown', event => {

            if (event.key == 'Enter') {

                for (let p = 1; p < 7; p++) {
  
                    this.textDatas[p].contentEditable = "false";
                }

                this.updateDataUsers(number);
                this.addSessionStorage();
                this.addLocalStorage();
            }
        })
    }

    updateDataUsers(number) {

        this.areaNewClient = Array.from(document.querySelectorAll(".area-new-client"))[number-1];
        this.textDatas = Array.from(this.areaNewClient.children);

        this.textDatas[1].dataset.name = this.textDatas[1].querySelector("p").innerText;
        this.textDatas[2].dataset.email = this.textDatas[2].querySelector("p").innerText;
        this.textDatas[3].dataset.birth = this.textDatas[3].querySelector("p").innerText;
        this.textDatas[4].dataset.register = this.textDatas[4].querySelector("p").innerText;
        this.textDatas[5].dataset.gender = this.textDatas[5].querySelector("p").innerText;
        this.textDatas[6].dataset.admin = this.textDatas[6].querySelector("p").innerText;
        
        let userName = this.textDatas[1].dataset.name;
        let userGender = this.textDatas[5].dataset.gender;
        let userBirth = this.textDatas[3].dataset.birth;
        let userEmail = this.textDatas[2].dataset.email;
        let userPhoto = this.arrayPhotos[number-1];
        let userTimeRegister = this.textDatas[4].dataset.register;
        let userAdmin = this.textDatas[6].dataset.admin;

        if (userAdmin == "false") {

            userAdmin = false;
            this.numberAdmin--;

            this.titleAdmin = document.querySelector("#title-admin");
            this.titleAdmin.innerHTML = `ADMIN (${this.numberAdmin})`;

        }

        else {

            userAdmin = true;
        }

        this.arrayClients[number-1] = new User(userName, userGender, userBirth, userEmail, userPhoto, userTimeRegister, userAdmin);

    }

    addSessionStorage() {

        sessionStorage.setItem("users", JSON.stringify(this.arrayClients));
    }

    addLocalStorage() {

        localStorage.setItem("users", JSON.stringify(this.arrayClients));
    }

    updateCountInit() {

        this.numberClients = 0;
        let usersDatas = JSON.parse(localStorage.getItem("users"));

        for (let z = 0; z < this.areaClients.children.length-2; z++) {

            this.numberClients++;
        }

        for (let x = 0; x < usersDatas.length; x++) {

            if (usersDatas[x]._admin == true) {

                this.numberAdmin++;
            }
        }

        let clientsQuantity = document.querySelector("#title-clients");
        let adminQuantity = document.querySelector("#title-admin-top");

        clientsQuantity.innerHTML = `CLIENTES (${this.numberClients})`;
        adminQuantity.innerHTML = `ADMIN (${this.numberAdmin})`;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {

    let execution = new Execution();
})
