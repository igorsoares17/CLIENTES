class Execution {

    constructor() {
    
        this.form = document.querySelector("form");
        this.inputs = document.querySelectorAll("input");
        this.areaClients = document.getElementById("clients");
        this.areaNewClients = [];
        this.inputAdmin = document.getElementById("input-admin");

        //ALTURA INICIAL DA DIV CLIENTS PARA O JAVASCRIPT:
        this.height = "40vh";

        this.submitForm();
        this.getPhoto();
        this.img = "";
     
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

            this.user = new User(this.inputs[0].value, document.querySelector('input[name="gender"]:checked').value, this.inputs[2].value, this.inputs[1].value, this.img, Utils.dateFormat(new Date), "no");
        }

        else {

            this.user = new User(this.inputs[0].value, document.querySelector('input[name="gender"]:checked').value, this.inputs[2].value, this.inputs[1].value, this.img, Utils.dateFormat(new Date), "yes");
        }

        this.form.dataset.user = JSON.stringify(this.user);
        console.log(JSON.parse(this.form.dataset.user));

        let newHeight = Utils.getHeight(Utils.getNumber(this.height));
        this.height = newHeight;
        this.areaClients.style.height = this.height;

        let areaNewClient = document.createElement("div");
        this.areaClients.appendChild(areaNewClient);
        areaNewClient.setAttribute("class", "area-new-client");

        this.areaNewClients.push(areaNewClient);

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
                                   <p class="text-datas">${this.user._name}</p>`;
    
        areaDatas[2].innerHTML = `<h3 class="title-datas">EMAIL</h3>
                                   <p class="text-datas">${this.user._email}</p>`;
        areaDatas[3].innerHTML = `<h3 class="title-datas">DATA NASC</h3>
                                   <p class="text-datas">${this.user._birth}</p>`;
        
        areaDatas[4].innerHTML = `<h3 class="title-datas">REGISTRO</h3>
                                   <p class="text-datas">${this.user._timeRegister}</p>`;
                        
        areaDatas[5].innerHTML = `<h3 class="title-datas">SEXO</h3>
                                   <p class="text-datas">${this.user._gender}</p>`;

        areaDatas[6].innerHTML = `<h3 class="title-datas">ADMIN</h3>
                                   <p class="text-datas">${this.user._admin}</p>`;

        areaDatas[7].innerHTML = `<button class="button-user" id="button-edit">Editar</button>
                                  <button class="button-user" id="button-delete">Excluir</button>`

        this.updateCount();

        let countUsers = 0;

        for (let z = 0; z < this.areaClients.children.length-1; z++) {

            countUsers++;
        }

        this.editUser(countUsers);
        this.removeUser(countUsers);

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

    updateCount() {

        let count = 0;

        for (let z = 0; z < this.areaClients.children.length-1; z++) {

            count++;
        }

        let clientsQuantity = document.querySelector("#title-clients");
        clientsQuantity.innerHTML = `CLIENTES (${count})`;

    }

    validInputName(name) {

        let vowels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', " "];

        for (let x = 0; x < name.length; x++) {

            if (vowels.indexOf(name[x]) == -1) {

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

        this.buttonsEdit = document.querySelectorAll("#button-edit");
        let buttonEdit = this.buttonsEdit[number-1];

        buttonEdit.addEventListener('click', event => {

            this.textDatas = Array.from(this.areaNewClients[number-1].children);

            for (let d = 1; d < 6; d++) {
  
                this.textDatas[d].contentEditable = "true";
            }
        })

        this.finishEdit();
    
    }

    removeUser(number) {

        this.buttonsDelete = document.querySelectorAll("#button-delete");
        let buttonDelete = this.buttonsDelete[number-1]

        buttonDelete.addEventListener('click', event => {

            Array.from(this.areaNewClients)[number-1].remove();

            if ((number - 1) != 0) {

                for (let j = (number-1); j < this.areaNewClients.length-1;j++) {

                    this.areaNewClients[j] = this.areaNewClients[j+1]
                }
            }

            this.updateCount();
        })

    }

    finishEdit() {

        document.addEventListener('keydown', event => {

            if (event.key == 'Enter') {

                for (let p = 1; p < 6; p++) {
  
                    this.textDatas[p].contentEditable = "false";
                }
            }
        })
    }
}

let execution = new Execution();