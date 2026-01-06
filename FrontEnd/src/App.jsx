import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import prism from "prismjs";
import axios from "axios";

import "./App.css";
import "prismjs/components/prism-javascript";

function App() {
  
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState(`function sum(){
  return 1 + 1
    }`);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      setLoading(true);
      setReview("");

  const response = await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/ai/get-review`,
  { code }
);

      setReview(response.data);
    } catch (error) {
      setReview("❌ Failed to get review. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>

          <div
            onClick={!loading ? reviewCode : undefined}
            className={`review ${loading ? "disabled" : ""}`}
          >
            {loading ? "Reviewing..." : "Review"}
          </div>
        </div>

        <div className="right">
          {loading ? (
            <p>🔍 Analyzing your code...</p>
          ) : (
            <Markdown>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
