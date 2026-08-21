'use client';

import { FormEvent, useState } from 'react';

const links = [
  { label: 'Início', href: '#inicio', className: 'hotspot nav-inicio' },
  { label: 'Sobre', href: '#sobre', className: 'hotspot nav-sobre' },
  { label: 'Propostas', href: '#propostas', className: 'hotspot nav-propostas' },
  { label: 'Notícias', href: '#noticias', className: 'hotspot nav-noticias' },
  { label: 'Galeria', href: '#galeria', className: 'hotspot nav-galeria' },
  { label: 'Contato', href: '#contato', className: 'hotspot nav-contato' },
];

export default function Home() {
  const [message, setMessage] = useState('');

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Cadastro realizado! Obrigada por fazer parte dessa causa.');
    window.setTimeout(() => setMessage(''), 4200);
  }

  return (
    <main id="inicio" className="site-shell">
      <div className="campaign-canvas" aria-label="Site da campanha de Aurelina Medeiros">
        <img className="campaign-art" src="/aurelina-layout.jpg" alt="Aurelina Medeiros, deputada estadual 44222 — A amiga de sempre" />

        <nav aria-label="Navegação principal">
          {links.map((link) => <a key={link.label} href={link.href} className={link.className}><span className="sr-only">{link.label}</span></a>)}
        </nav>

        <a className="hotspot whatsapp-top" href="https://wa.me/?text=Ol%C3%A1%2C%20Aurelina!" target="_blank" rel="noreferrer"><span className="sr-only">Fale com Aurelina pelo WhatsApp</span></a>
        <a className="hotspot propostas-cta" href="#propostas"><span className="sr-only">Conheça minhas propostas</span></a>
        <a className="hotspot instagram-cta" href="https://www.instagram.com/aurelinamedeirosoficial/" target="_blank" rel="noreferrer"><span className="sr-only">Acompanhe Aurelina Medeiros no Instagram</span></a>
        <a className="hotspot saiba-mais" href="#sobre"><span className="sr-only">Saiba mais sobre Aurelina</span></a>

        <div className="social-rail" aria-label="Redes sociais">
          <a className="hotspot social instagram" href="https://www.instagram.com/aurelinamedeirosoficial/" target="_blank" rel="noreferrer"><span className="sr-only">Instagram oficial de Aurelina Medeiros</span></a>
          <a className="hotspot social facebook" href="https://www.facebook.com/" target="_blank" rel="noreferrer"><span className="sr-only">Facebook</span></a>
          <a className="hotspot social whatsapp" href="https://wa.me/?text=Ol%C3%A1%2C%20Aurelina!" target="_blank" rel="noreferrer"><span className="sr-only">WhatsApp</span></a>
          <a className="hotspot social youtube" href="https://www.youtube.com/" target="_blank" rel="noreferrer"><span className="sr-only">YouTube</span></a>
        </div>

        <section id="propostas" aria-label="Bandeiras da campanha">
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
        <div id="contato" className="anchor anchor-contato" />
        <div id="saude" className="anchor anchor-flags" />
        <div id="educacao" className="anchor anchor-flags" />
        <div id="social" className="anchor anchor-flags" />
        <div id="infraestrutura" className="anchor anchor-flags" />
        <div id="agricultura" className="anchor anchor-flags" />
      </div>
      {message && <div className="toast" role="status">{message}</div>}
    </main>
  );
}
