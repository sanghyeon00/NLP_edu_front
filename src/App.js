import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState(""); // ����� �Է� ����
  const [responses, setResponses] = useState([]); // Django���� ���� ���� ����

  const handleSubmit = async () => {
    if (!prompt) return; // �� �Է� ����

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/chat/", {
        prompt: prompt
      });

      setResponses(response.data.responses); // Django���� ���� �亯�� ����
      console.log("ok");
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };

  return (
    <Container>
      <Title>NLP Chatbot for edu</Title>
      <Input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <Button onClick={handleSubmit}>Send</Button>

      <ResponseContainer>
        {responses.length > 0 && <h3>Responses:</h3>}
        {responses.map((res, index) => (
          <ResponseBox key={index}>{res}</ResponseBox>
        ))}
      </ResponseContainer>
    </Container>
  );
}

export default App;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ResponseContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const ResponseBox = styled.div`
  background-color: white;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
