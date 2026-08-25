'use client';

import { FormEvent, useMemo, useState } from 'react';
import materiasData from './materias.json';

const links = [
  { label: 'Início', href: '#inicio', className: 'hotspot nav-inicio' },
  { label: 'Sobre', href: '#sobre', className: 'hotspot nav-sobre' },
  { label: 'Propostas', href: '#atuacao', className: 'hotspot nav-propostas' },
  { label: 'Notícias', href: '#noticias', className: 'hotspot nav-noticias' },
  { label: 'Galeria', href: '#galeria', className: 'hotspot nav-galeria' },
  { label: 'Contato', href: '#contato', className: 'hotspot nav-contato' },
];

export default function Home() {
  const [message, setMessage] = useState('');
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('TODOS');
  const [ano, setAno] = useState('TODOS');
  const [ordenacao, setOrdenacao] = useState('RECENTES');
  const [limite, setLimite] = useState(12);

  const anos = useMemo(
    () => [...new Set(materiasData.materias.map((materia) => materia.ano))].sort((a, b) => b - a),
    [],
  );

  const materiasFiltradas = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase('pt-BR');

    const filtradas = materiasData.materias.filter((materia) => {
      const correspondeTipo = tipo === 'TODOS' || materia.tipo === tipo;
      const correspondeAno = ano === 'TODOS' || materia.ano === Number(ano);
      const texto = `${materia.tipo} ${materia.numero} ${materia.ano} ${materia.ementa}`.toLocaleLowerCase('pt-BR');
      return correspondeTipo && correspondeAno && (!termo || texto.includes(termo));
    });

    return filtradas.sort((a, b) => {
      if (ordenacao === 'ANTIGAS') return a.dataApresentacao.localeCompare(b.dataApresentacao) || a.numero - b.numero;
      if (ordenacao === 'NUMERO') return a.numero - b.numero || b.ano - a.ano;
      return b.dataApresentacao.localeCompare(a.dataApresentacao) || b.numero - a.numero;
    });
  }, [ano, busca, ordenacao, tipo]);

  function reiniciarLista() {
    setLimite(12);
  }

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Cadastro realizado! Obrigada por fazer parte dessa causa.');
    window.setTimeout(() => setMessage(''), 4200);
  }

  return (
    <main id="inicio" className="site-shell">
      <div className="campaign-canvas" aria-label="Site da campanha de Aurelina Medeiros">
        <img className="campaign-art" src="/aurelina-layout-2026.jpg" alt="Aurelina Medeiros, deputada estadual 44222 — A amiga de sempre" />

        <section className="mobile-campaign" aria-label="Apresentação de Aurelina Medeiros">
          <header className="mobile-campaign-header">
            <a className="mobile-brand" href="#inicio" aria-label="Aurelina Medeiros 44222">
              <small>DEPUTADA ESTADUAL</small>
              <strong>AURELINA</strong>
              <span>MEDEIROS • 44222</span>
            </a>
            <a className="mobile-instagram" href="https://www.instagram.com/aurelinamedeirosoficial/" target="_blank" rel="noreferrer" aria-label="Instagram oficial">◎</a>
          </header>
          <div className="mobile-campaign-copy">
            <p>A AMIGA DE</p>
            <h1>Sempre!</h1>
            <span>Experiência, trabalho e compromisso com o povo de Roraima.</span>
            <div className="mobile-campaign-actions">
              <a href="#atuacao">PROJETOS E INDICAÇÕES <b aria-hidden="true">→</b></a>
              <a href="https://www.instagram.com/aurelinamedeirosoficial/" target="_blank" rel="noreferrer">ACOMPANHE NO INSTAGRAM</a>
            </div>
          </div>
          <div className="mobile-campaign-themes" aria-label="Principais bandeiras">
            <a href="#saude"><b>♡</b><span>Saúde</span></a>
            <a href="#educacao"><b>◇</b><span>Educação</span></a>
            <a href="#infraestrutura"><b>▦</b><span>Infraestrutura</span></a>
            <a href="#agricultura"><b>♧</b><span>Agricultura</span></a>
          </div>
        </section>

        <nav aria-label="Navegação principal">
          {links.map((link) => <a key={link.label} href={link.href} className={link.className}><span className="sr-only">{link.label}</span></a>)}
        </nav>

        <a className="hotspot whatsapp-top" href="https://wa.me/?text=Ol%C3%A1%2C%20Aurelina!" target="_blank" rel="noreferrer"><span className="sr-only">Fale com Aurelina pelo WhatsApp</span></a>
        <a className="hotspot propostas-cta" href="#atuacao"><span className="sr-only">Conheça os projetos e indicações</span></a>
        <a className="hotspot instagram-cta" href="https://www.instagram.com/aurelinamedeirosoficial/" target="_blank" rel="noreferrer"><span className="sr-only">Acompanhe Aurelina Medeiros no Instagram</span></a>
        <a className="hotspot saiba-mais" href="#sobre"><span className="sr-only">Saiba mais sobre Aurelina</span></a>

        <div className="social-rail" aria-label="Redes sociais">
          <a className="hotspot social instagram" href="https://www.instagram.com/aurelinamedeirosoficial/" target="_blank" rel="noreferrer"><span className="sr-only">Instagram oficial de Aurelina Medeiros</span></a>
          <a className="hotspot social facebook" href="https://www.facebook.com/" target="_blank" rel="noreferrer"><span className="sr-only">Facebook</span></a>
          <a className="hotspot social whatsapp" href="https://wa.me/?text=Ol%C3%A1%2C%20Aurelina!" target="_blank" rel="noreferrer"><span className="sr-only">WhatsApp</span></a>
          <a className="hotspot social youtube" href="https://www.youtube.com/" target="_blank" rel="noreferrer"><span className="sr-only">YouTube</span></a>
        </div>

        <section id="propostas" aria-label="Prioridades da campanha">
          <a className="hotspot priority trabalho" href="#sobre"><span className="sr-only">Trabalho que faz a diferença</span></a>
          <a className="hotspot priority saude" href="#saude"><span className="sr-only">Saúde de qualidade</span></a>
          <a className="hotspot priority educacao" href="#educacao"><span className="sr-only">Educação para todos</span></a>
          <a className="hotspot priority seguranca" href="#social"><span className="sr-only">Segurança e cidadania</span></a>
          <a className="hotspot priority desenvolvimento" href="#agricultura"><span className="sr-only">Desenvolvimento com responsabilidade</span></a>
        </section>

        <section aria-label="Bandeiras da campanha">
          <a className="hotspot flag saude" href="#saude"><span className="sr-only">Saúde</span></a>
          <a className="hotspot flag educacao" href="#educacao"><span className="sr-only">Educação</span></a>
          <a className="hotspot flag social-card" href="#social"><span className="sr-only">Social</span></a>
          <a className="hotspot flag infraestrutura" href="#infraestrutura"><span className="sr-only">Infraestrutura</span></a>
          <a className="hotspot flag agricultura" href="#agricultura"><span className="sr-only">Agricultura familiar</span></a>
        </section>

        <form className="newsletter-form" onSubmit={subscribe} aria-label="Receba nossas novidades">
          <label className="sr-only" htmlFor="nome">Seu nome</label>
          <input id="nome" name="nome" className="overlay-input name-input" placeholder="Seu nome" required />
          <label className="sr-only" htmlFor="email">Seu e-mail</label>
          <input id="email" name="email" type="email" className="overlay-input email-input" placeholder="Seu e-mail" required />
          <button className="hotspot receive-button" type="submit"><span className="sr-only">Quero receber</span></button>
        </form>

        <div id="sobre" className="anchor anchor-sobre" />
        <div id="noticias" className="anchor anchor-flags" />
        <div id="galeria" className="anchor anchor-flags" />
        <div id="saude" className="anchor anchor-flags" />
        <div id="educacao" className="anchor anchor-flags" />
        <div id="social" className="anchor anchor-flags" />
        <div id="infraestrutura" className="anchor anchor-flags" />
        <div id="agricultura" className="anchor anchor-flags" />
      </div>

      <section id="atuacao" className="legislative-section" aria-labelledby="atuacao-title">
        <div className="legislative-hero">
          <div className="assembly-photo" aria-hidden="true" />
          <div className="hero-copy-layer" />
          <div className="legislative-wrap hero-content">
            <p className="eyebrow">ATUAÇÃO PARLAMENTAR</p>
            <h1 id="atuacao-title">Projetos de Lei e Indicações</h1>
            <p className="section-intro">
              Acompanhe todas as matérias de autoria e coautoria da deputada Aurelina Medeiros
              registradas no Sistema de Apoio ao Processo Legislativo da Assembleia de Roraima.
            </p>
            <a className="official-source" href={materiasData.source} target="_blank" rel="noreferrer">
              <span className="source-icon" aria-hidden="true">▤</span> Ver fonte oficial <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="legislative-wrap legislative-content">
          <div className="legislative-stats" aria-label="Resumo das matérias">
            <div className="stat-item stat-blue"><span className="stat-icon" aria-hidden="true">▤</span><p><strong>{materiasData.totals.total.toLocaleString('pt-BR')}</strong><b>MATÉRIAS</b><small>registradas</small></p></div>
            <div className="stat-item stat-green"><span className="stat-icon" aria-hidden="true">⚖</span><p><strong>{materiasData.totals.projetos}</strong><b>PROJETOS DE LEI</b><small>apresentados</small></p></div>
            <div className="stat-item stat-purple"><span className="stat-icon" aria-hidden="true">●</span><p><strong>{materiasData.totals.indicacoes}</strong><b>INDICAÇÕES</b><small>realizadas</small></p></div>
            <div className="stat-item stat-gold"><span className="stat-icon" aria-hidden="true">▦</span><p><strong>31</strong><b>ANOS DE ATUAÇÃO</b><small>dedicada a Roraima</small></p></div>
          </div>

          <div className="filters" aria-label="Filtros de matérias">
            <label className="search-field">
              <span className="sr-only">Pesquisar matéria</span>
              <span aria-hidden="true">⌕</span>
              <input
                value={busca}
                onChange={(event) => { setBusca(event.target.value); reiniciarLista(); }}
                placeholder="Busque por tema, número ou palavra-chave"
              />
            </label>
            <label>
              <span className="sr-only">Tipo de matéria</span>
              <select value={tipo} onChange={(event) => { setTipo(event.target.value); reiniciarLista(); }}>
                <option value="TODOS">Todos os tipos</option>
                <option value="PL">Projetos de Lei</option>
                <option value="IND">Indicações</option>
              </select>
            </label>
            <label>
              <span className="sr-only">Ano da matéria</span>
              <select value={ano} onChange={(event) => { setAno(event.target.value); reiniciarLista(); }}>
                <option value="TODOS">Todos os anos</option>
                {anos.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>

          <div className="results-toolbar">
            <div className="results-line" aria-live="polite">
              <span aria-hidden="true">▤</span> <strong>{materiasFiltradas.length.toLocaleString('pt-BR')}</strong> matérias encontradas
            </div>
            <label className="sort-field">
              <span>Ordenar por:</span>
              <select value={ordenacao} onChange={(event) => { setOrdenacao(event.target.value); reiniciarLista(); }}>
                <option value="RECENTES">Mais recentes</option>
                <option value="ANTIGAS">Mais antigas</option>
                <option value="NUMERO">Número crescente</option>
              </select>
            </label>
          </div>

          <div className="matter-grid">
            {materiasFiltradas.slice(0, limite).map((materia) => (
              <article className="matter-card" key={materia.id}>
                <div className="matter-card-top">
                  <span className={`matter-type ${materia.tipo === 'PL' ? 'is-project' : 'is-indication'}`}>
                    {materia.tipo === 'PL' ? 'PROJETO DE LEI' : 'INDICAÇÃO'}
                  </span>
                  <span className={`matter-status ${materia.emTramitacao ? 'is-active' : ''}`}>
                    {materia.emTramitacao ? 'Em tramitação' : 'Tramitação encerrada'}
                  </span>
                </div>
                <h2>{materia.tipo === 'PL' ? 'Projeto de Lei' : 'Indicação'} nº {materia.numero}/{materia.ano}</h2>
                <p>{materia.ementa}</p>
                <div className="matter-meta">
                  <span><span aria-hidden="true">▦</span> {new Date(`${materia.dataApresentacao}T12:00:00`).toLocaleDateString('pt-BR')}</span>
                  {!materia.primeiroAutor && <span>Coautoria</span>}
                </div>
                <div className="matter-actions">
                  <a href={materia.detalheUrl} target="_blank" rel="noreferrer">Ver tramitação <span aria-hidden="true">↗</span></a>
                  {materia.textoUrl && <a href={materia.textoUrl} target="_blank" rel="noreferrer"><span aria-hidden="true">▤</span> Abrir documento</a>}
                </div>
              </article>
            ))}
          </div>

          {materiasFiltradas.length === 0 && (
            <div className="empty-state">Nenhuma matéria encontrada com esses filtros.</div>
          )}

          {limite < materiasFiltradas.length && (
            <button className="load-more" type="button" onClick={() => setLimite((atual) => atual + 12)}>
              Carregar mais matérias
            </button>
          )}

          <p className="data-note">
            Dados oficiais do SAPL/ALE-RR, atualizados em {new Date(materiasData.generatedAt).toLocaleDateString('pt-BR')}.
          </p>
        </div>
      </section>

      <footer id="contato" className="site-footer">
        <div className="footer-accent" aria-hidden="true" />
        <div className="footer-wrap">
          <section className="footer-cta" aria-labelledby="footer-news-title">
            <div>
              <span className="footer-kicker">FIQUE POR DENTRO</span>
              <h2 id="footer-news-title">Acompanhe o trabalho que transforma Roraima</h2>
              <p>Receba novidades sobre projetos, indicações, ações e resultados da deputada Aurelina Medeiros.</p>
            </div>
            <form className="footer-newsletter" onSubmit={subscribe}>
              <label>
                <span className="sr-only">Seu nome</span>
                <input name="footer-nome" placeholder="Seu nome" required />
              </label>
              <label>
                <span className="sr-only">Seu melhor e-mail</span>
                <input name="footer-email" type="email" placeholder="Seu melhor e-mail" required />
              </label>
              <button type="submit">QUERO RECEBER <span aria-hidden="true">→</span></button>
            </form>
          </section>

          <div className="footer-main">
            <section className="footer-brand" aria-label="Aurelina Medeiros">
              <div className="footer-brand-mark">
                <small>DEPUTADA ESTADUAL</small>
                <strong>AURELINA</strong>
                <span>MEDEIROS</span>
              </div>
              <div className="footer-number">44222</div>
              <p>A amiga de sempre. Experiência, trabalho e compromisso com o povo de Roraima.</p>
              <div className="footer-socials" aria-label="Redes e canais oficiais">
                <a href="https://www.instagram.com/aurelinamedeirosoficial/" target="_blank" rel="noreferrer" aria-label="Instagram oficial">◎</a>
                <a href="https://wa.me/?text=Ol%C3%A1%2C%20Aurelina!" target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp">◉</a>
                <a href={materiasData.source} target="_blank" rel="noreferrer" aria-label="Atuação parlamentar no SAPL">▤</a>
              </div>
            </section>

            <nav className="footer-column" aria-label="Navegação do rodapé">
              <h3>Navegação</h3>
              <a href="#inicio">Início</a>
              <a href="#sobre">Sobre Aurelina</a>
              <a href="#atuacao">Atuação parlamentar</a>
              <a href="#propostas">Nossas bandeiras</a>
              <a href="#galeria">Galeria</a>
              <a href="#contato">Contato</a>
            </nav>

            <nav className="footer-column" aria-label="Áreas de atuação">
              <h3>Áreas de atuação</h3>
              <a href="#saude">Saúde de qualidade</a>
              <a href="#educacao">Educação para todos</a>
              <a href="#social">Desenvolvimento social</a>
              <a href="#infraestrutura">Infraestrutura</a>
              <a href="#agricultura">Agricultura familiar</a>
              <a href="#atuacao">Projetos e indicações</a>
            </nav>

            <section className="footer-column footer-official">
              <h3>Informações oficiais</h3>
              <p>Consulte documentos, tramitações e a produção legislativa completa nos canais oficiais.</p>
              <a className="footer-official-link" href={materiasData.source} target="_blank" rel="noreferrer">
                <span aria-hidden="true">▤</span><span><b>SAPL / ALE-RR</b><small>Matérias da parlamentar</small></span><i aria-hidden="true">↗</i>
              </a>
              <a className="footer-official-link" href="https://www.instagram.com/aurelinamedeirosoficial/" target="_blank" rel="noreferrer">
                <span aria-hidden="true">◎</span><span><b>Instagram oficial</b><small>@aurelinamedeirosoficial</small></span><i aria-hidden="true">↗</i>
              </a>
            </section>
          </div>

          <div className="footer-transparency">
            <span aria-hidden="true">✓</span>
            <p><strong>Compromisso com a transparência</strong> Os dados legislativos exibidos neste site são provenientes do SAPL da Assembleia Legislativa de Roraima e foram atualizados em {new Date(materiasData.generatedAt).toLocaleDateString('pt-BR')}.</p>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Aurelina Medeiros. Todos os direitos reservados.</p>
            <p>Deputada Estadual • Roraima</p>
            <a href="#inicio">Voltar ao topo <span aria-hidden="true">↑</span></a>
          </div>
        </div>
      </footer>
      {message && <div className="toast" role="status">{message}</div>}
    </main>
  );
}

