import styled from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: #2d3047;
  text-align: center;
  white-space: nowrap;
  font-size: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const WalletPickerItem = styled.button`
  border-radius: 16px;
  background-color: #2d3047;
  color: #ffffff;
  padding: 10px;
  cursor: pointer;
  outline: none;
  border: 0;
  width: 100%;

  :hover {
    background-color: #533a7b;
  }
`;

export const Container = styled.div`
  max-width: 768px;
  margin: 30px auto;
  padding: 0 10px;
`;

export const Button = styled.button`
  border-radius: 16px;
  background-color: #1b998b;
  color: #ffffff;
  padding: 10px;
  cursor: pointer;
  outline: none;
  border: 0;
  width: 100%;
  text-transform: uppercase;
  transition: 0.125s all ease-in-out;
  letter-spacing: 0.8px;

  :hover {
    background-color: #107469;
  }

  :disabled {
    background-color: #9db5b2;
    cursor: initial;
  }
`;

export const Description = styled.div`
  text-align: center;
  color: #666666;
  font-weight: normal;
  margin: 10px 0;
`;

export const PasswordInput = styled.input`
  outline: none;
  border: 1px solid #2d3047;
  width: 100%;
  padding: 3px 7px;
  box-sizing: border-box;
  color: #2d3047;

  :active,
  :focus {
    border-color: #1b998b;
  }
`;

export const Select = styled.select`
  outline: none;
  border: 1px solid #2d3047;
  width: 100%;
  padding: 3px 7px;
  box-sizing: border-box;
  color: #ffffff;
  background-color: #2d3047;
  border-radius: 16px;
  text-transform: uppercase;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2d3047;
  color: #ffffff;
  padding: 7px;
  height: 60px;
`;

export const NavigationLink = styled(Link)`
  cursor: pointer;
  margin: 0 10px;
  :hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  color: #e84855;
  text-align: center;
  background-color: #ff9b71;
  border-radius: 16px;
  width: auto;
  padding: 8px;
`;
