import { useState, useEffect } from "react";
import dados from "./data/rotas.json";
import './App.css'

function App() {
  const [bairro, setBairro] = useState("");
  const [ponto, setPonto] = useState("");
  const [resultados, setResultados] = useState([]);

  const bairros = [...new Set(dados.map((item) => item.bairro))];

  const pontosFiltrados = dados
    .filter((item) => (bairro ? item.bairro === bairro : true))
    .map((item) => item.ponto);

  function buscar() {
    let filtrados = dados;

    if (bairro) {
      filtrados = filtrados.filter((item) => item.bairro === bairro);
    }

    if (ponto) {
      filtrados = filtrados.filter((item) => item.ponto === ponto);
    }

    setResultados(filtrados);
  }

  function proximoHorario(horarios) {
    const agora = new Date();

    return (
      horarios.find((h) => {
        const [hora, minuto] = h.split(":");
        const horario = new Date();
        horario.setHours(hora, minuto);

        return horario > agora;
      }) || "Não há mais ônibus hoje :("
    );
  }

  useEffect(() => {
    buscar();
  }, [bairro, ponto]);

  return (
    <div>
      <div className="container">
        <h1>Como chegar na UFSJ</h1>
        <p>Veja horários de ônibus e encontre o melhor trajeto a partir do seu bairro</p>

        <div className="filters-wrapper">
          <div className="filter-group">
            <label>Bairro</label>
            <select value={bairro} onChange={(e) => { setBairro(e.target.value); setPonto(""); }}>
              <option value="">Todos os bairros</option>
              {bairros.map((b, i) => <option key={i} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Ponto de Parada</label>
            <select value={ponto} onChange={(e) => setPonto(e.target.value)}>
              <option value="">Todos os pontos</option>
              {pontosFiltrados.map((p, i) => <option key={i} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="results-container">
          {resultados.length === 0 && <p className="no-results">Busque um destino acima.</p>}

          {resultados.map((item, index) => (
            <div key={index} className="card">
              <h3>{item.ponto}</h3>
              <p><strong>Bairro:</strong>
                <span>{item.bairro}</span></p>
              <p><strong>Horários:</strong>
                <span>{item.horarios.join(", ")}</span></p>
              <p className="next-bus">
                <strong>Próximo ônibus:</strong>
                <span>{proximoHorario(item.horarios)}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="footer">
        <p>
          Este projeto não possui vínculo oficial com a empresa de transporte Turin.
        </p>

        <p>
          Informações baseadas na{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1d3N5OjRiHvQ6W8pXAhi7KBJ0vXMML9ehhozrim0OtFw/edit?fbclid=IwAR1aDXPauZftm_R5ePL0rtscbQ449saoxDORcnaJdw1bC-B8CzPvRRDtM6c#gid=1923072537"
            target="_blank"
            rel="noopener noreferrer"
          >
            planilha oficial da Turin
          </a>
        </p>

        <p className="footer-author">
          Criado por: <strong>Marina Ferrari Monteiro</strong>
        </p>

        <div className="footer-icons">
          <a href="https://github.com/marinawhale" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>

          <a href="https://www.linkedin.com/in/marina-ferrari-b10456244/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>

          <a href="mailto:marinaferrarim@gmail.com">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;