import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const apiRoot = 'https://sapl.al.rr.leg.br/api/materia';
const outputPath = resolve('app/materias.json');

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': 'aurelina-site/1.0' },
  });

  if (!response.ok) {
    throw new Error(`SAPL respondeu ${response.status} para ${url}`);
  }

  return response.json();
}

async function fetchAll(endpoint, query) {
  const firstUrl = `${apiRoot}/${endpoint}/?${new URLSearchParams({ ...query, page_size: '100' })}`;
  const firstPage = await fetchJson(firstUrl);
  const pages = [firstPage];

  for (let page = 2; page <= firstPage.pagination.total_pages; page += 1) {
    const url = `${firstUrl}&page=${page}`;
    pages.push(await fetchJson(url));
  }

  return pages.flatMap((page) => page.results);
}

const [projetos, indicacoes, autorias] = await Promise.all([
  fetchAll('materialegislativa', { autores: '51', tipo: '1' }),
  fetchAll('materialegislativa', { autores: '51', tipo: '3' }),
  fetchAll('autoria', { autor: '51' }),
]);

const autoriaPorMateria = new Map(
  autorias.map((autoria) => [autoria.materia, autoria.primeiro_autor]),
);

const materias = [...projetos, ...indicacoes]
  .map((materia) => ({
    id: materia.id,
    tipo: materia.tipo === 1 ? 'PL' : 'IND',
    numero: materia.numero,
    ano: materia.ano,
    dataApresentacao: materia.data_apresentacao,
    ementa: materia.ementa?.trim() || 'Ementa não informada no SAPL.',
    emTramitacao: Boolean(materia.em_tramitacao),
    primeiroAutor: autoriaPorMateria.get(materia.id) ?? true,
    detalheUrl: `https://sapl.al.rr.leg.br/materia/${materia.id}`,
    textoUrl: materia.texto_original?.replace(/^http:/, 'https:') || null,
  }))
  .sort((a, b) => b.ano - a.ano || b.numero - a.numero || a.tipo.localeCompare(b.tipo));

const data = {
  generatedAt: new Date().toISOString(),
  source: 'https://sapl.al.rr.leg.br/parlamentar/2/materias',
  totals: {
    total: materias.length,
    projetos: projetos.length,
    indicacoes: indicacoes.length,
    autoriaPrincipal: materias.filter((materia) => materia.primeiroAutor).length,
    coautoria: materias.filter((materia) => !materia.primeiroAutor).length,
  },
  materias,
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(data)}\n`, 'utf8');

console.log(`Salvas ${materias.length} matérias (${projetos.length} PL e ${indicacoes.length} IND) em ${outputPath}`);
