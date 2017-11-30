// Validação

document.querySelector("#submit").addEventListener("click", function(event){
    event.preventDefault();
    var validado = true,
        inputs = document.querySelectorAll('.info-inputs'),
        duvida = document.getElementById('duvida'),
        labelDuvida = document.getElementById('label-duvida'),
        resultado = document.getElementById('resultado');
        labels = document.querySelectorAll('.info-labels');
 
 
    for (i = 0; i < inputs.length; i++) {
        var elem = inputs[i],
            tipo = elem.type;
   
        if (tipo == 'text' && elem.value.length < 1) {
            if (labels[i].innerHTML.indexOf('Esse campo é obrigatório') < 0) labels[i].innerHTML += 'Esse campo é obrigatório';
              validado = false;
        } else if (tipo == 'email' && elem.value.length < 1) {
            if (labels[i].innerHTML.indexOf('Esse campo é obrigatório') < 0) labels[i].innerHTML += 'Esse campo é obrigatório';
                validado = false;
        } else if (duvida.value.length < 1) {
            if (labelDuvida.innerHTML.indexOf('Esse campo é obrigatório') < 0) labelDuvida.innerHTML += 'Esse campo é obrigatório';
                validado = false;
        }
    }
    if (validado) {
        submitInfoForm();
        resultado.classList.add('fadeIn')
        document.querySelector("body").insertAdjacentHTML("afterBegin","<div class='overlay'></div>");
        resultado.innerHTML = '<img src="images/loader.gif" alt="Carregando">';
    }
        
});

// Envio de formulário

function submitInfoForm(){
    var nome = document.getElementById('nome').value,
        email = document.getElementById('email').value,
        duvida = document.getElementById('duvida').value,
        resultado = document.getElementById('resultado');
    var xmlhttp= window.XMLHttpRequest ?
        new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            resultado.innerHTML = xmlhttp.responseText;
            setTimeout(function(){ 
                resultado.classList.add('fadeOut');
                resultado.classList.remove('fadeIn');
                document.querySelector(".overlay").remove();
            }, 3000);
        }

    }


    xmlhttp.open("POST","class/enviar.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("nome=" + nome + "&email=" + email + "&duvida=" + duvida);

    document.getElementById('nome').value = "";
    document.getElementById('email').value = "";
    document.getElementById('duvida').value = "";
}


// Participe Form

document.querySelector("#part-btn").addEventListener("click", function(event){
    event.preventDefault;

    var body = document.querySelector("body"),
        submit = document.querySelector("#part-btn"),
        participeBox = document.querySelector(".participe-box");

        body.insertAdjacentHTML("afterBegin","<div class='overlay'></div>");
        participeBox.style.display = "block";
        submit.style.display = "none";
        participeBox.classList.add("over-box");

        document.querySelector(".overlay").addEventListener("click", function(e){
            closeModal();
        });

});

    // Close

    function closeModal () {
        document.querySelector('.participe-box').style.display = "none";
        document.querySelector("#part-btn").style.display = "block";
        document.querySelector(".overlay").remove();
    }

    document.querySelector("#close-box").addEventListener("click", function() {
        closeModal();
    });
    addEventListener("keyup", function(e) {
        if (e.keyCode == 27) closeModal();
    });

    // Participe Validation

    document.querySelector("#part-submit").addEventListener("click", function(event){
        event.preventDefault();
        var validado = true,
            inputs = document.querySelectorAll('.part-inputs'),
            duvida = document.getElementById('duvida'),
            labelDuvida = document.getElementById('label-duvida'),
            resultado = document.getElementById('part-resultado'),
            labels = document.querySelectorAll('.part-labels');
     
     
        for (i = 0; i < inputs.length; i++) {
            var elem = inputs[i],
                tipo = elem.type;
       
            if (tipo == 'text' && elem.value.length < 1) {
                if (labels[i].innerHTML.indexOf('Esse campo é obrigatório') < 0) labels[i].innerHTML += 'Esse campo é obrigatório';
                  validado = false;
            } else if (tipo == 'email' && elem.value.length < 1) {
                if (labels[i].innerHTML.indexOf('Esse campo é obrigatório') < 0) labels[i].innerHTML += 'Esse campo é obrigatório';
                    validado = false;
            }
        }
        if (validado) {
            submitPartForm();
            resultado.classList.add('fadeIn')
            resultado.innerHTML = '<img src="images/loader.gif" alt="Carregando">';
        }
            
    });

    // Participe Sent

    function submitPartForm(){
        var nome = document.getElementById('part-nome').value,
            cnpj = document.getElementById('part-cnpj').value,
            email = document.getElementById('part-email').value,
            telefone = document.getElementById('part-telefone').value,
            empresa = document.getElementById('part-empresa').value,
            resultado = document.getElementById('part-resultado');
        var xmlhttp= window.XMLHttpRequest ?
            new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                resultado.innerHTML = xmlhttp.responseText;
                setTimeout(function(){ 
                    resultado.classList.add('fadeOut');
                    resultado.classList.remove('fadeIn');
                }, 3000);

            }
        }


        xmlhttp.open("POST","class/part-enviar.php",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("nome=" + nome + "&cnpj=" + cnpj + "&email=" + email + 
            "&telefone=" + telefone + "&empresa=" + empresa);

        document.getElementById('part-nome').value = "";
        document.getElementById('part-cnpj').value = "";
        document.getElementById('part-email').value = "";
        document.getElementById('part-telefone').value = "";
        document.getElementById('part-empresa').value = "";
    }



// Mascaras

var _br,
    brInput = {

    //Seletor   
    sel: document.querySelectorAll("[br-input]"),

    //Inicia
    init: function init() {
        _br = this;
        _br.bind();
    },

    bind: function bind() {
        _br.sel.forEach(_br.setListener);
    },

    //Bind do teclado
    setListener: function setListener(each) {
        var input = each.getAttribute("br-input");
        each.addEventListener('keyup', function (key) {
            _br.setMask(input, this);
        });
    },

    //Seta os métodos para seus respectivos atributos
    setMask: function setMask(input, key) {
        if ("telefone" === input) _br.telefoneMask(key);
        if ("cnpj" === input) _br.cnpjMask(key);
    },

    //Adiciona o atributo max-length
    setMaxlen: function setMaxlen(el, size) {
        el.setAttribute('maxlength', size);
    },
    cnpjMask: function cnpjMask(k) {
        _br.setMaxlen(k, 18);
        var a = k.value;
        a = a.replace(/\D/g, "");
        a = a.replace(/(\d{2})(\d)/, "$1.$2");
        a = a.replace(/(\d{3})(\d)/, "$1.$2");
        a = a.replace(/(\d{3})(\d)/, "$1/$2");
        a = a.replace(/(\d{4})(\d)/, "$1-$2");
        k.value = a;
    },
    telefoneMask: function telefoneMask(k) {
            _br.setMaxlen(k, 15);
            var a = k.value;
            a = a.replace(/\D/g, "");
            a = a.replace(/^(\d{2})(\d)/g, "($1) $2");
            if (a.length > 12) a = a.replace(/(\d)(\d{4})$/, "$1-$2");
            k.value = a;
        }
};
brInput.init();
