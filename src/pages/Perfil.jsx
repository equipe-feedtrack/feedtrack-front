import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Para acessar os dados do usuário
import NavBar from '../components/NavBar'; // Sua NavBar
import './css/perfil.css'; // Vamos criar este arquivo CSS

function Perfil() {
  const { user, login } = useAuth(); // Pegamos 'user' e 'login' do AuthContext

  const [isEditing, setIsEditing] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState(user?.name || user?.username || '');
  const [email, setEmail] = useState(user?.username || ''); // Usamos 'username' como e-mail para simplicidade
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || 'https://github.com/mdo.png'); // Imagem padrão

  const [alerta, setAlerta] = useState(null); // Para mensagens de feedback

  // Efeito para atualizar os campos do formulário se o usuário mudar no contexto
  useEffect(() => {
    if (user) {
      setNomeCompleto(user.name || user.username || '');
      setEmail(user.username || '');
      setProfilePicture(user.profilePicture || 'https://github.com/mdo.png');
    }
  }, [user]); // Roda sempre que o objeto 'user' no contexto muda

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setAlerta(null); // Limpa alertas ao alternar
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setAlerta(null);

    // Validação básica
    if (!nomeCompleto.trim()) {
      setAlerta({ tipo: 'danger', mensagem: 'O nome completo não pode ser vazio.' });
      return;
    }
    // Uma validação mais robusta de email pode ser adicionada aqui
    if (!email.trim() || !email.includes('@')) {
      setAlerta({ tipo: 'danger', mensagem: 'Por favor, insira um e-mail válido.' });
      return;
    }

    // --- Lógica de Salvar no localStorage (Simulação) ---
    try {
      // Carrega todos os usuários do localStorage
      let users = JSON.parse(localStorage.getItem('users')) || {};
      
      // Encontra o usuário atual e atualiza suas informações
      // Assume que o 'username' é o identificador único
      if (user && users[user.username]) {
        users[user.username].name = nomeCompleto;
        users[user.username].username = email; // Atualiza o email/username
        users[user.username].profilePicture = profilePicture;
        
        // Salva de volta no localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Atualiza o user no AuthContext (chamando a função login novamente com os dados atualizados)
        // Uma forma mais direta seria ter uma função 'updateUser' no AuthContext
        // Por simplicidade, vamos forçar um 'login' com os dados atualizados
        // Isso pode ser um pouco hacky, mas funciona para a simulação
        const updatedUser = { ...user, name: nomeCompleto, username: email, profilePicture: profilePicture };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        // Recarrega o AuthContext para que a NavBar etc. reflitam a mudança
        // window.location.reload(); // Evite recarregar a página inteira se possível
        // Alternativa: Se o AuthContext tivesse uma função `updateUserContext(newUser)`
        // useAuth().updateUserContext(updatedUser);
        // Para esta simulação, faremos uma atualização mais simples:
        // Se a Navbar usa user.name diretamente, ela já deve reagir ao user do contexto.
        // O `login` aqui é apenas para manter a consistência com o `AuthContext`
        // mas em um app real seria um `updateProfile` na API
        setAlerta({ tipo: 'success', mensagem: 'Perfil atualizado com sucesso!' });
        setIsEditing(false); // Sai do modo de edição
        
        // Opcional: Para forçar uma re-leitura do user no contexto e NavBar imediatamente
        // (Apenas se o user do contexto não estiver reagindo, o que deveria)
        // Isso é uma gambiarra, o ideal é o AuthContext atualizar o user.
        // user.name = nomeCompleto; 
        // user.username = email;
        // user.profilePicture = profilePicture;
        // setAlerta({ tipo: 'success', mensagem: 'Perfil atualizado com sucesso!' });
        // setIsEditing(false);

      } else {
        setAlerta({ tipo: 'danger', mensagem: 'Erro: Usuário não encontrado para atualização.' });
      }

    } catch (error) {
      console.error('Erro ao salvar perfil no localStorage:', error);
      setAlerta({ tipo: 'danger', mensagem: 'Ocorreu um erro ao salvar o perfil.' });
    }
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limite de 2MB
        setAlerta({ tipo: 'danger', mensagem: 'A imagem deve ter no máximo 2MB.' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // reader.result contém a URL base64 da imagem
      };
      reader.readAsDataURL(file);
    }
  };


  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <p>Carregando perfil ou usuário não logado...</p>
        {/* Você pode redirecionar para o login aqui se preferir */}
      </div>
    );
  }

  return (
    <>
      <NavBar /> {/* Renderiza a NavBar */}
      <div className="container mt-4 mb-5 perfil-page">
        <h1 className="mb-4">Meu Perfil</h1>
        <hr className="mb-4" />

        {alerta && (
          <div
            className={`alert alert-${alerta.tipo} alert-dismissible fade show`}
            role="alert"
          >
            <div>{alerta.mensagem}</div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setAlerta(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="card p-4 shadow-sm">
          <div className="text-center mb-4">
            <img
              src={profilePicture}
              alt="Foto de Perfil"
              className="img-thumbnail rounded-circle mb-3"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            {isEditing && (
              <div className="mb-3">
                <label htmlFor="profilePictureUpload" className="form-label">Mudar Foto</label>
                <input
                  className="form-control"
                  type="file"
                  id="profilePictureUpload"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                />
              </div>
            )}
          </div>

          <form onSubmit={handleSaveProfile}>
            <div className="mb-3">
              <label htmlFor="nomeCompleto" className="form-label">Nome Completo</label>
              <input
                type="text"
                className="form-control"
                id="nomeCompleto"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                readOnly={!isEditing}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!isEditing}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Cargo/Função</label>
              <input
                type="text"
                className="form-control"
                id="role"
                value={user.role === 'admin' ? 'Administrador' : 'Funcionário'}
                readOnly
              />
            </div>

            <div className="d-flex justify-content-end mt-4">
              {isEditing ? (
                <>
                  <button type="button" className="btn btn-secondary me-2" onClick={handleEditToggle}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Salvar Alterações
                  </button>
                </>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleEditToggle}>
                  Editar Perfil
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Perfil;