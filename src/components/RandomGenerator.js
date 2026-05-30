function RandomGenerator({
  generatedItem,
  generateRandomItem,
  isSpinning
}) {
  return (
    <div className="generator-container">

      <button
        className="generate-btn"
        onClick={generateRandomItem}
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Generate 🍜"}
      </button>

      <div className={`result-box ${isSpinning ? "spinning" : ""}`}>
        {generatedItem || "Press generate to pick your meal"}
      </div>

    </div>
  );
}

export default RandomGenerator;