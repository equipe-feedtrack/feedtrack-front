import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/recuperarSenha.css';

function RecuperarSenha() {
  const [step, setStep] = useState(1); // 1: Solicitar código, 2: Redefinir senha
  const [identifier, setIdentifier] = useState(''); // Pode ser email ou nome de usuário
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alerta, setAlerta] = useState(null); // { tipo: 'success'/'danger', mensagem: '...' }

  const navigate = useNavigate();

  // --- CONFIGURAÇÃO DA SUA API DE ENVIO DE E-MAILS ---
  const SEND_EMAIL_API_URL = 'https://sendemails-lqua.onrender.com/send-email';
  // O e-mail de QUEM ENVIA está configurado na sua API, não precisamos dele aqui.
  // --- FIM DA CONFIGURAÇÃO DA SUA API DE ENVIO DE E-MAILS ---

  // Função para enviar o código de verificação via sua API de e-mails
  // Agora, 'emailTo' virá do 'identifier' digitado pelo usuário.
  const sendCodeViaEmailAPI = async (emailTo, code) => {
    // Para a simulação, vamos considerar que o "identificador" é sempre um e-mail válido
    // para o qual o e-mail pode ser enviado.
    // Em um sistema real, o backend verificaria se o identificador é um e-mail
    // ou se é um username, encontraria o e-mail associado e enviaria.
    const subject = 'Código de Verificação FeedTrack';
    const htmlBody = `
      <p>Olá,</p>
      <p>Seu código de verificação para redefinição de senha no FeedTrack é:</p>
      <h2 style="color: #0d6efd;">${code}</h2>
      <p>Este código é válido por 5 minutos.</p>
      <p>Se você não solicitou esta redefinição, por favor, ignore este e-mail.</p>
      <p>Atenciosamente,<br>Equipe FeedTrack</p>
    `;

    try {
      const response = await fetch(SEND_EMAIL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailTo, // AQUI: Usa o e-mail digitado pelo usuário!
          subject: subject,
          html: htmlBody,
        }),
      });

      if (response.ok) {
        return { success: true, message: "Código de verificação enviado! Verifique seu e-mail." };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.error || "Erro ao enviar e-mail. Tente novamente." };
      }
    } catch (error) {
      console.error('Erro ao chamar a API de envio de e-mail:', error);
      return { success: false, message: "Não foi possível conectar ao serviço de e-mails. Verifique sua conexão ou a API." };
    }
  };

  // Função para "enviar" o código de verificação (agora com chamada à API e sem exibir código)
  const simulatedSendCodeFrontend = async (identifier) => {
    // Gera um código aleatório de 6 dígitos
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Tentar enviar o e-mail via sua API para o identificador digitado
    const emailResponse = await sendCodeViaEmailAPI(identifier, generatedCode); // AQUI: Envia para o 'identifier'

    if (emailResponse.success) {
        // Se o e-mail foi "enviado", salvamos o código no localStorage.
        // ESSA PARTE CONTINUA SENDO INSEGURA PARA PRODUÇÃO!
        // Em um sistema real, o código seria salvo no BACKEND.
        localStorage.setItem(`verificationCode_${identifier}`, generatedCode);
        localStorage.setItem(`codeExpiry_${identifier}`, (Date.now() + 5 * 60 * 1000).toString()); // Expira em 5 minutos

        // Não exibir o código aqui ou no console.
        return { success: true, message: `Código de verificação enviado! Verifique a caixa de entrada do seu e-mail: ${identifier}.` };
    } else {
        return { success: false, message: emailResponse.message || "Erro ao enviar o código." };
    }
  };

  // Função para "redefinir" a senha (simulando no frontend)
  const simulatedResetPasswordFrontend = (identifier, code, newPwd) => {
    const storedCode = localStorage.getItem(`verificationCode_${identifier}`);
    const storedExpiry = localStorage.getItem(`codeExpiry_${identifier}`);

    if (!storedCode || storedCode !== code || (storedExpiry && Date.now() > parseInt(storedExpiry))) {
      return { success: false, message: "Código de verificação inválido ou expirado." };
    }

    localStorage.removeItem(`verificationCode_${identifier}`);
    localStorage.removeItem(`codeExpiry_${identifier}`);

    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[identifier]) {
        users[identifier] = { username: identifier, role: 'funcionario', password: newPwd };
    }
    users[identifier].password = newPwd;
    localStorage.setItem('users', JSON.stringify(users));

    console.log(`[SIMULAÇÃO] Senha de ${identifier} redefinida para: ${newPwd}`); // Este console.log pode ser removido em produção
    return { success: true, message: "Senha redefinida com sucesso! Você pode fazer login agora." };
  };

  // Lidar com a solicitação do código (Step 1)
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setAlerta(null);

    // Validação de formato de e-mail básica para enviar e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!identifier.trim() || !emailRegex.test(identifier.trim())) {
      setAlerta({ tipo: 'danger', mensagem: 'Por favor, insira um endereço de e-mail válido.' });
      return;
    }

    setAlerta({ tipo: 'info', mensagem: 'Enviando solicitação de código...' });
    const response = await simulatedSendCodeFrontend(identifier);

    if (response.success) {
      setAlerta({ tipo: 'success', mensagem: response.message });
      setStep(2);
    } else {
      setAlerta({ tipo: 'danger', mensagem: response.message });
    }
  };

  // Lidar com a redefinição de senha (Step 2)
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setAlerta(null);

    if (!verificationCode.trim()) {
      setAlerta({ tipo: 'danger', mensagem: 'Por favor, insira o código de verificação.' });
      return;
    }
    if (!newPassword.trim() || newPassword.length < 6) {
      setAlerta({ tipo: 'danger', mensagem: 'A nova senha é obrigatória e deve ter pelo menos 6 caracteres.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setAlerta({ tipo: 'danger', mensagem: 'A nova senha e a confirmação de senha não coincidem.' });
      return;
    }

    setAlerta({ tipo: 'info', mensagem: 'Redefinindo senha...' });
    const response = simulatedResetPasswordFrontend(identifier, verificationCode, newPassword);

    if (response.success) {
      setAlerta({ tipo: 'success', mensagem: response.message });
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    } else {
      setAlerta({ tipo: 'danger', mensagem: response.message });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center recuperar-senha-page">
      <div className="container-fluid d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">Recuperar Senha</h1>
        <div className="row w-100 justify-content-center">
          <div className="col-10 col-md-8 col-lg-6 d-flex justify-content-center">
            <form
              className="d-flex flex-column justify-content-center flex-grow-1 card p-4 shadow-sm"
              onSubmit={step === 1 ? handleRequestCode : handleResetPassword}
            >
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

              {step === 1 && (
                <>
                  <p className="text-muted text-center mb-3">
                    Insira seu e-mail para receber um código de verificação.
                  </p>
                  <div className="mb-3">
                    <label htmlFor="identifier" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email" // Alterado para type="email" para melhor UX e validação básica
                      className="form-control"
                      id="identifier"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mb-2">
                    Solicitar Código de Verificação
                  </button>
                  <div className="mt-2 text-center">
                    <Link to="/">Voltar para o Login</Link>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="text-muted text-center mb-3">
                    Um código foi enviado para **{identifier}**. Insira-o abaixo para redefinir sua senha.
                  </p>
                  <div className="mb-3">
                    <label htmlFor="verificationCode" className="form-label">
                      Código de Verificação
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Código de 6 dígitos"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success mb-2">
                    Redefinir Senha
                  </button>
                  <div className="mt-2 text-center">
                    <button type="button" className="btn btn-link" onClick={() => setStep(1)}>
                      Voltar para a Etapa 1
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecuperarSenha;