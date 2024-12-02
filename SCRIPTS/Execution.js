class Execution {

    constructor() {
    
        this.form = document.querySelector("form");
        this.inputs = document.querySelectorAll("input");
        this.areaClients = document.getElementById("clients");
        this.height = "40vh";
        this.submitForm();
        this.getPhoto();
        this.img = "";
     
    }
   
    submitForm() {
        
        this.form.addEventListener('submit', event => {

            event.preventDefault();


                if (!this.inputs[0].value || !this.inputs[1].value || !this.inputs[2].value || !this.inputs[5].value) {

                    window.alert("HA CAMPOS NÃO PREENCHIDOS!");
                    
                }

                else if (!this.inputs[3].checked && !this.inputs[4].checked) {

                    window.alert("ESCOLHA O SEXO!");
                    
                }

                else {

                    this.addUser();
                    this.form.reset();
                }
        });
    }

    addUser() {

        this.user = new User(this.inputs[0].value, document.querySelector('input[name="gender"]:checked').value, this.inputs[2].value, this.inputs[1].value, this.img, Utils.dateFormat(new Date));

        let newHeight = Utils.getHeight(Utils.getNumber(this.height));
        this.height = newHeight;
        this.areaClients.style.height = this.height;

        let areaNewClient = document.createElement("div");
        this.areaClients.appendChild(areaNewClient);
        areaNewClient.setAttribute("class", "area-new-client");

        let areaDatas = []

        for (let i = 0; i < 6; i++) {

            areaDatas[i] = document.createElement("div");
            areaNewClient.appendChild(areaDatas[i]);
            areaDatas[i].setAttribute("class", "area-datas"); 
        }

        areaDatas[0].innerHTML = `<figure class="figure-datas">
                                       <img class="img-datas" src="${this.img}" alt="Foto cliente">
                                  </figure>`

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
}

let execution = new Execution();