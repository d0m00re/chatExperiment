import styled from "styled-components";

interface IPaper {
    flexDirection ?: 'column' | 'row';
}

const Paper = styled.section<IPaper> `
    display : flex;
    background-color : white;
    border-radius : 16px;
    padding : 16px;
    ${({ flexDirection }) => flexDirection && `flex-direction : ${flexDirection};`}
`;

export default Paper;