class Execution {

    constructor() {
    
        this.form = document.querySelector("form");
        this.inputs = document.querySelectorAll("input");
        this.areaClients = document.getElementById("clients");
        
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

                if (!this.inputs[3].checked && !this.inputs[4].checked) {

                    window.alert("ESCOLHA O SEXO!");
                    
                };

            this.addUser();
        });
    }

    addUser() {

        this.user = new User(this.inputs[0].value, document.querySelectorAll('input[name="gender"]:checked'), this.inputs[2].value, this.inputs[1].value, this.img, Utils.dateFormat(new Date));
    
   
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