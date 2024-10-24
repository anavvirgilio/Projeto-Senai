//Página de cadastro


const supabaseUrl = 'https://fjiwbrhjnmpuyhskhrlt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaXdicmhqbm1wdXloc2tocmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1NDU0MTIsImV4cCI6MjA0MTEyMTQxMn0.9UQuIGBNUZD2UUCQEFpsT0Lpps3Q2Pr1w3_FiL9RfEI';


class Usuario {
    constructor(nome, email, cpf, senha, confirmar_senha) {
      this.nome = nome;
      this.email = email;
      this.cpf = cpf;
      this.senha = senha;
      this.confirmar_senha = confirmar_senha;
    }
  }
  
  // Função para enviar os dados do cadastro para o servidor
  function enviarCadastro(usuario) {
    fetch('https://fjiwbrhjnmpuyhskhrlt.supabase.co/rest/v1/alunos', {
        method: 'post',
        headers: {
            apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaXdicmhqbm1wdXloc2tocmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1NDU0MTIsImV4cCI6MjA0MTEyMTQxMn0.9UQuIGBNUZD2UUCQEFpsT0Lpps3Q2Pr1w3_FiL9RfEI',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Sucesso:', data);
      alert('Cadastro realizado com sucesso!');
    })
    .catch((error) => {
      console.error('Erro:', error);
      alert('Houve um erro no cadastro. Tente novamente.');
    });
  }
  
  function Cadastrar() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var cpf = document.getElementById("identificacao").value;
    var senha = document.getElementById("senha").value;
    var confirmar_senha = document.getElementById("confirmar_senha").value;
  
    if (senha !== confirmar_senha) {
      alert("As senhas não coincidem!");
      return;
    }
  
    var usuario = new Usuario(nome, email, cpf, senha, confirmar_senha);
    
    // Envia os dados para o servidor
    enviarCadastro(usuario);
  }
  