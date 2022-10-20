import styled from "styled-components";

export const Styled = styled.div`
    border-bottom: 1px solid #eee;
    height: 50px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    color: #323232;
    .icon {
        width: 50px;
        align-self: center;
        color: green
    }
    .eye {
        width: 50px;
        align-self: center;
        text-align: center;
        color: #c4c4c4;
        outline: none;
        border: none;
        background-color: transparent;
    }
    input {
        flex-grow: 1;
        outline: 0;
        border: 0;
        
    }
`