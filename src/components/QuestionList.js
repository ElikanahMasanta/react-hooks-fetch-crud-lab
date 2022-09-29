import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => setQuestions(data))
  }, [])

  function handleDeleteClick(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(() => {
      const updateQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updateQuestions)
    })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }

  const getQuestions = questions.map((question) => { 
      return <QuestionItem 
        key={question.id}
        question={question}
        onDeleteClick={handleDeleteClick} 
        onAnswerChange={handleAnswerChange}
        />
      }); 

        return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {getQuestions}
      </ul>
    </section>
  );
}

export default QuestionList;
