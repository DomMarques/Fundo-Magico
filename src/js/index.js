document.addEventListener("DOMContentLoaded", function() {
const formulario=document.querySelector(".form-group");




const descricaoinput=document.getElementById("description");
const codigohtml=document.getElementById("html-code");
const codigocss=document.getElementById("css-code");
const secaoPreview=document.getElementById("preview-section");
formulario.addEventListener("submit", async function(evento){
    evento.preventDefault();


const descricao=descricaoinput.value.trim();

if(!descricao){
    return;

}


mostrarCarregamento(true);

try{
    const resposta= await fetch("https://minhasenha998.app.n8n.cloud/webhook/fundo-magico",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({descricao}),

    })
    const dados= await resposta.json();
    codigohtml.textContent=dados.html ||"";
    codigocss.textContent=dados.css ||"";
    secaoPreview.style.display="block";
secaoPreview.innerHTML=dados.html ||"";


let tagEstilo=document.getElementById("estilo-dinamico");
if(tagEstilo){
tagEstilo.remove();

} 
if(dados.css){
    tagEstilo=document.createElement("style");
    tagEstilo.id="estilo-dinamico";
    tagEstilo.textContent=dados.css;
    document.head.appendChild(tagEstilo);
}
}
catch(error){
    console.error("Erro ao enviar requisição:",error);
    codigohtml.textContent="Erro ao gerar o código HTML.";
    codigocss.textContent="Erro ao gerar o código CSS.";
    secaoPreview.innerHTML="";
} finally{
    mostrarCarregamento(false);
}


});
function mostrarCarregamento(estaCarregando){
const botaoEnviar=document.getElementById("generate-btn");
if(estaCarregando){
    botaoEnviar.textContent="Gerando...";
}

else{
    botaoEnviar.textContent="Gerar bacground";}

}
})
    console.log('Documento carregando...');
});