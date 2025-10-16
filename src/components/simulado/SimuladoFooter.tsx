export default function SimuladoFooter({ onPrev, onNext, onSubmit }) {
  return (
    <div className="simulado-footer">
      <button onClick={onPrev}>Anterior</button>
      <button onClick={onNext}>Próximo</button>
      <button onClick={onSubmit}>Entregar gabarito</button>
    </div>
  );
}
