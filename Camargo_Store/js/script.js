var valorProduto1=5199;
var valor1=document.getElementById("valorProduto1");
var valorProduto2=4199;
var valor2=document.getElementById("valorProduto2");
var valorProduto3=4299;
var valor3=document.getElementById("valorProduto3");
valor1.innerText="R$"+valorProduto1.toLocaleString("pt-BR");
valor2.innerText="R$"+valorProduto2.toLocaleString("pt-BR");
valor3.innerText="R$"+valorProduto3.toLocaleString("pt-BR");

var unidProduto1=0.000;
var unidProduto2=0.000;
var unidProduto3=0.000;
var unidProduto1Label=document.getElementById("unidProduto1");
var unidProduto2Label=document.getElementById("unidProduto2");
var unidProduto3Label=document.getElementById("unidProduto3");

var totalProduto1=document.getElementById("totalProduto1");
var totalProduto2=document.getElementById("totalProduto2");
var totalProduto3=document.getElementById("totalProduto3");

var subtotal=document.getElementById("subtotal");

function removerUnidProduto(botao){
    if (botao.id=="produto1Rem"){
        if (unidProduto1==0){
            alert("Não é possível remover o produto!");
        }
        else{
            unidProduto1--;
            unidProduto1Label.innerHTML=unidProduto1;
            totalProduto1.innerHTML=(valorProduto1*unidProduto1).toFixed(2);
            subtotal.innerHTML=((unidProduto1*valorProduto1)+(unidProduto2*valorProduto2)+(unidProduto3*valorProduto3)).toFixed(2);
        }
    }
    else if (botao.id=="produto2Rem"){
        if (unidProduto2==0){
            alert("Não é possível remover o produto!");
        }
        else{
            unidProduto2--;
            unidProduto2Label.innerHTML=unidProduto2;
            totalProduto2.innerHTML=(valorProduto2*unidProduto2).toFixed(2);
            subtotal.innerHTML=((unidProduto1*valorProduto1)+(unidProduto2*valorProduto2)+(unidProduto3*valorProduto3)).toFixed(2);
        }
    }
    else if (botao.id=="produto3Rem"){
        if (unidProduto3==0){
            alert("Não é possível remover o produto!");
        }
        else{
            unidProduto3--;
            unidProduto3Label.innerHTML=unidProduto3;
            totalProduto3.innerHTML=(valorProduto3*unidProduto3).toFixed(2);
            subtotal.innerHTML=((unidProduto1*valorProduto1)+(unidProduto2*valorProduto2)+(unidProduto3*valorProduto3)).toFixed(2);
        }
    }
}

function adicionarUnidProduto(botao){
    if (botao.id=="produto1Add"){
        unidProduto1++;
        unidProduto1Label.innerHTML=unidProduto1;
        totalProduto1.innerHTML=(valorProduto1*unidProduto1).toFixed(2);
            subtotal.innerHTML=((unidProduto1*valorProduto1)+(unidProduto2*valorProduto2)+(unidProduto3*valorProduto3)).toFixed(2);
    }
    else if (botao.id=="produto2Add"){
        unidProduto2++;
        unidProduto2Label.innerHTML=unidProduto2;
        totalProduto2.innerHTML=(valorProduto2*unidProduto2).toFixed(2);
            subtotal.innerHTML=((unidProduto1*valorProduto1)+(unidProduto2*valorProduto2)+(unidProduto3*valorProduto3)).toFixed(2);
    }
    else if (botao.id=="produto3Add"){
        unidProduto3++;
        unidProduto3Label.innerHTML=unidProduto3;
        totalProduto3.innerHTML=(valorProduto3*unidProduto3).toFixed(2);
        subtotal.innerHTML=((unidProduto1*valorProduto1)+(unidProduto2*valorProduto2)+(unidProduto3*valorProduto3)).toFixed(2);
    }
}