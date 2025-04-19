async function mostrarDados(nome, telefone){

    const dados = {nome, telefone}

    try
    {
        const response = await fetch('http://localhost:3000/cadastro-usuario',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dados),
            })
        if(response.ok){
            console.log('dados enviados')
        }
        
    } catch {
        console.log('deu erro')
    }
}

async function trazerDados() {
    // Aguarda a resposta da requisição
    const response = await fetch('http://localhost:3000/ver-dados');
    
    // Converte a resposta para JSON
    const dados = await response.json();

    // Converte os dados para string e exibe no console
    const verDados = JSON.stringify(dados);

    console.log(verDados);
}


trazerDados()
mostrarDados('Alex', '79998615537')