import React from 'react';
import NavBar from '../components/NavBar';

function Sobre() {
  return (

    <div>
      <NavBar/>
      <section className="text-center mb-5 container mt-5 ">
        <h1 className="display-4">Sobre o FeedTrack</h1>
        <p className="lead">
          Conheça o FeedTrack, sua solução inteligente para coletar e analisar feedback de clientes, impulsionando a melhoria contínua do seu negócio.
        </p>
      </section>

      <section className="m-5">
        <h2>Como o FeedTrack Transforma Seu Negócio</h2>
        <p>
          O FeedTrack é uma ferramenta essencial para proprietários de estabelecimentos comerciais que buscam aprimorar a qualidade de seus serviços e produtos. Nossa plataforma oferece uma maneira prática e eficiente de coletar e analisar as valiosas opiniões de seus clientes.
        </p>
        <h3>Funcionamento Simplificado:</h3>
        <ul>
          <li><strong>Coleta de Feedback Direta:</strong> Seus clientes podem compartilhar suas experiências e sugestões de forma fácil e rápida.</li>
          <li><strong>Ambiente Seguro e Privado:</strong> Todas as opiniões são armazenadas em um ambiente seguro, garantindo a privacidade dos dados.</li>
          <li><strong>Acesso Exclusivo:</strong> Apenas você, o proprietário do estabelecimento, terá acesso total aos feedbacks coletados.</li>
          <li><strong>Insights para Ação:</strong> Utilize os feedbacks para identificar áreas de melhoria, tomar decisões estratégicas e otimizar a produtividade e o desempenho geral do seu negócio.</li>
        </ul>
      </section>

      <section className="m-5">
        <h2>Nossa Equipe de Desenvolvimento</h2>
        <p>
          O FeedTrack é um projeto desenvolvido com paixão e dedicação pelo seguinte grupo:
        </p>
        <ul className="list-unstyled">
          <li className="mb-2"><strong>Yago Silva:</strong> Desenvolvedor Líder</li>
          <li className="mb-2"><strong>Cleilson Alvino:</strong> Desenvolvedor Front-end</li>
          <li className="mb-2"><strong>Moisés Soares:</strong> Desenvolvedor Back-end</li>
          <li className="mb-2"><strong>Enzo Santiago:</strong> Analista de Sistemas</li>
          <li className="mb-2"><strong>Alexsandro:</strong> Desenvolvedor Back-end</li>
        </ul>
        <p>
          Agradecemos seu interesse no FeedTrack e esperamos que nossa ferramenta seja um valioso aliado no crescimento do seu negócio!
        </p>
      </section>
    </div>
      
  );
}

export default Sobre;