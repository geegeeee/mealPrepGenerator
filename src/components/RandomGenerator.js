function RandomGenerator({
    generatedItem, generateRandomItem}){
    
    return(
        <div className="generator-container">
            <button
                className="generate-btn"
                onClick={generateRandomItem}>
                Generate Meal Prep!!
            </button>

            <div className="result-box">
                {generatedItem || "Nothing generated yet."}
            </div>
        </div>
    );
}

export default RandomGenerator;