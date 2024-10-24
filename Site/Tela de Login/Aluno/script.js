//Página de login

document.querySelector('button[type="submit"]').addEventListener('click', async function(event) {
    event.preventDefault();
  
    // Captura os valores dos campos de input
    const cpf = document.getElementById('email').value;
    const senha = document.getElementById('texto_senha').value;
  
    // Verifica se os campos estão preenchidos
    if (!cpf || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      // URL da API Supabase com a consulta para verificar o CPF e a senha
      const url = "https://fjiwbrhjnmpuyhskhrlt.supabase.co/rest/v1/alunos?cpf=eq." + cpf + "&select=*&senha=eq."+senha;
  
      // Configuração da requisição
      const response = await fetch(url, {
        method: 'get',
        headers: {
          apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaXdicmhqbm1wdXloc2tocmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1NDU0MTIsImV4cCI6MjA0MTEyMTQxMn0.9UQuIGBNUZD2UUCQEFpsT0Lpps3Q2Pr1w3_FiL9RfEI', // Coloque sua chave de API do Supabase
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaXdicmhqbm1wdXloc2tocmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1NDU0MTIsImV4cCI6MjA0MTEyMTQxMn0.9UQuIGBNUZD2UUCQEFpsT0Lpps3Q2Pr1w3_FiL9RfEI', // Coloque seu token de autorização
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
  
      // Verifica se a resposta contém algum resultado (login válido)
      if (data.length > 0) {
        alert('Login realizado com sucesso!');
        // Redirecionar para outra página, se necessário
        window.location.href = '../../Tela Principal/Aluno/index.html'; // Altere para a página desejada
      } else {
        alert('CPF ou senha incorretos.');
      }
  
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert('Ocorreu um erro ao tentar realizar o login. Tente novamente mais tarde.');
    }
  });
  