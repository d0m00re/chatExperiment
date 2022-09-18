import React, { ReactElement } from 'react'
import styled from "styled-components";
interface Props {
    nameList : string[];
    selectID : number;
    setSelectID : (id : number) => void;
}

const ContainerNavbar = styled.section `
    width : 200px;
    display : flex;
    flex-direction : column;
    gap : 15px;
    background-color : black;
`;

interface INavbarElem {
    isSelect : boolean;
}

const NavbarElem = styled.div<INavbarElem> `
    cursor : pointer;
    padding : 10px;
    widt : 100%;

    ${({isSelect}) => `color : ${isSelect ? 'cyan' : 'grey'};`}


    :hover {
        color : white;
    }
`;

function NavBar(props: Props): ReactElement {
    return (
        <ContainerNavbar>
        {
            props.nameList.map((e, i) =>
                <NavbarElem
                    onClick={() => props.setSelectID(i)}
                    isSelect={i === props.selectID}># {e}
                </NavbarElem>)            
        }
        </ContainerNavbar>
    )
}

export default NavBar
