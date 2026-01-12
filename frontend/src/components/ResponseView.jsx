import ReactMarkdown from "react-markdown";

/*
  ResponseView renders the AI agent response.
  It supports Markdown output and shows the detected category.
*/

function ResponseView({ category, response }) {
  if (!response) {
    return null;
  }

  return (
    <section className="response-view">
      <div className="category-badge">
        Category: {category}
      </div>

      <div className="response-content">
        <ReactMarkdown>
          {response}
        </ReactMarkdown>
      </div>
    </section>
  );
}

export default ResponseView;
