var valorProduto1=5.199;
var valor1=document.getElementById("valorProduto1");
var valorProduto2=4.199;
var valor2=document.getElementById("valorProduto2");
var valorProduto3=4.299;
var valor3=document.getElementById("valorProduto3");
valor1.innerText="R$"+valorProduto1;
valor2.innerText="R$"+valorProduto2;
valor3.innerText="R$"+valorProduto3;

var unidProduto1=0;
var unidProduto2=0;
var unidProduto3=0;
var unidProduto1Label=document.getElementById("unidProduto1");
var unidProduto2Label=document.getElementById("unidProduto2");
var unidProduto3Label=document.getElementById("unidProduto3");

var totalProduto1=document.getElementById("totalProduto1");
var totalProduto2=document.getElementById("totalProduto2");
var totalProduto3=document.getElementById("totalProduto3");

function removerUnidProduto(botao){
    if (botao.id=="produto1Rem"){
        if (unidProduto1==0){
            alert("Não é possível remover o produto!");
        }
        else{
            unidProduto1--;
            unidProduto1Label.innerHTML=unidProduto1;
            totalProduto1.innerHTML=(valorProduto1*unidProduto1).toFixed(3);
        }
    }
    else if (botao.id=="produto2Rem"){
        if (unidProduto2==0){
            alert("Não é possível remover o produto!");
        }
        else{
            unidProduto2--;
            unidProduto2Label.innerHTML=unidProduto2;
            totalProduto2.innerHTML=(valorProduto2*unidProduto2).toFixed(3);
        }
    }
    else if (botao.id=="produto3Rem"){
        if (unidProduto3==0){
            alert("Não é possível remover o produto!");
        }
        else{
            unidProduto3--;
            unidProduto3Label.innerHTML=unidProduto3;
            totalProduto3.innerHTML=(valorProduto3*unidProduto3).toFixed(3);
        }
    }
}

function adicionarUnidProduto(botao){
    if (botao.id=="produto1Add"){
        unidProduto1++;
        unidProduto1Label.innerHTML=unidProduto1;
        totalProduto1.innerHTML=(valorProduto1*unidProduto1).toFixed(3);
    }
    else if (botao.id=="produto2Add"){
        unidProduto2++;
        unidProduto2Label.innerHTML=unidProduto2;
        totalProduto2.innerHTML=(valorProduto2*unidProduto2).toFixed(3);
    }
    else if (botao.id=="produto3Add"){
        unidProduto3++;
        unidProduto3Label.innerHTML=unidProduto3;
        totalProduto3.innerHTML=(valorProduto3*unidProduto3).toFixed(3);
    }
}