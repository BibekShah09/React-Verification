import styled from 'styled-components';

const ButtonStyled = styled.div`
  .button {
    background-color: #3D3F92;
    width: 200px;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 6px;
  }
  
  button: disabled {
    opacity: 0.5;
  }
`;

export default ButtonStyled;
