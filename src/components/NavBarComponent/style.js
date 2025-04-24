import styled from "styled-components";

export const WrapperLableText = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WrapperTextValue = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#0056b3" : "#e0e0e0")};
  }
`;

export const ContentSection = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;

  h4 {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  li {
    margin-bottom: 5px;
  }
`;