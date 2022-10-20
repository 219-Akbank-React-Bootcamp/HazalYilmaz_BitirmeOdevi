import styled from "styled-components";

export const Styled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .kanban-title {
        display: flex;
        text-align: center;
        height: 50px;
        background-color: #323232;
        color: #ddd;
        width: 100%;
        justify-content: center;
        align-items: center;
        user-select: none;
        cursor: pointer;
    }
    .logout {
        display: flex;
        font-size: small;
        height: 25px;
        width: 100%;
        justify-content: end;
        align-items: center;
        padding-right: 1.3rem;
        background-color: #cbcbcb;
        color: #323232;
        user-select: none;
        cursor: pointer;

    }
    .logout-icon {
        font-size: medium;
        color: #323232;
        margin-left: 7px;
        user-select: none;
        cursor: pointer;
    }
`