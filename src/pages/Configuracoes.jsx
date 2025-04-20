import React from 'react'
import NavBar from '../components/NavBar'

function Configuracoes() {
  return (
    <div>
      <NavBar/>
      <div className="container mt-4">
      <h1>Configurações do Sistema</h1>
      <hr />

      {/* Configurações Gerais */}
      <section className="mb-4">
        <h2>Configurações Gerais</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="systemName" className="form-label">Nome do Sistema</label>
            <input type="text" className="form-control" id="systemName" placeholder="Digite o nome do sistema" />
          </div>

          <div className="mb-3">
            <label htmlFor="emailAdmin" className="form-label">E-mail do Administrador</label>
            <input type="email" className="form-control" id="emailAdmin" placeholder="admin@sistema.com" />
          </div>

          <div className="mb-3">
            <label htmlFor="feedbackThreshold" className="form-label">Limite de Feedbacks Diários</label>
            <input type="number" className="form-control" id="feedbackThreshold" placeholder="Ex.: 100" />
          </div>

          <button type="submit" className="btn btn-primary">Salvar Configurações</button>
        </form>
      </section>

      <hr />

      {/* Personalização */}
      <section className="mb-4">
        <h2>Personalização</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="themeColor" className="form-label">Cor do Tema</label>
            <input type="color" className="form-control form-control-color" id="themeColor" defaultValue="#0d6efd" title="Escolha a cor do tema" />
          </div>

          <div className="mb-3">
            <label htmlFor="logoUpload" className="form-label">Upload de Logo</label>
            <input className="form-control" type="file" id="logoUpload" />
          </div>

          <button type="submit" className="btn btn-primary">Salvar Personalização</button>
        </form>
      </section>

      <hr />
      <section className="mb-4">
        <h2>Gerenciamento de Categorias</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">Nova Categoria</label>
            <input type="text" className="form-control" id="categoryName" placeholder="Digite o nome da categoria" />
          </div>

          <button type="submit" className="btn btn-success">Adicionar Categoria</button>
        </form>

        <h3 className="mt-4">Categorias Existentes</h3>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Cliente
            <button className="btn btn-danger btn-sm">Excluir</button>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Produto
            <button className="btn btn-danger btn-sm">Excluir</button>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Feedbacks
            <button className="btn btn-danger btn-sm">Excluir</button>
          </li>
        </ul>
      </section>
    </div>
    </div>
  )
}

export default Configuracoes

