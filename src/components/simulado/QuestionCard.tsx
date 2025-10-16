export default function QuestionCard({ question, selectedOption, onSelect }) {
  return (
    <div className="question-card">
      <p>{question.text}</p>
      {question.options.map(opt => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          className={selectedOption === opt.id ? 'selected' : ''}
        >
          {opt.text}
        </button>
      ))}
    </div>
  );
}
