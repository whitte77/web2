email = "admin@gmail.com";
senha = "admin123";

enviar = document.getElementById('signin')

function cadastrar() {
    email = document.getElementById('email').value;
    senha = document.getElementById('password').value;
    localStorage.setItem('userEmail', email)
    
    if (email == "admin@gmail.com" && senha == "admin123") {
        alert("Bem vindo de volta " + email + "!");
    } else {
        alert("Email ou senha incorretos");
        return;
    }
}

enviar.addEventListener('click', cadastrar)

const userEmail = localStorage.getItem("userEmail", email)