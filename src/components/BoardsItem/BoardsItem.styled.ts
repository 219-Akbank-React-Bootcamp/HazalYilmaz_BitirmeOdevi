import styled from "styled-components";

export const Styled = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    color: #323232;
    border-radius: 5px;
    padding: 10px;
    width: 150px;
    height: 150px;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
    background-color: white;
    cursor: pointer;
    margin: 10px 20px;

    &:hover {
        border: 2px solid #ddd;
    }

    &:is(:hover, :focus) {
        outline: 3px solid #ddd;
        outline-offset: 4px;
    }
    .card-top {
        text-decoration: none;
    }
    .board-cards {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .board-cards-text {
        text-decoration: none !important;
        color: #323232;
    }
    .board-card-icons {
        width: 50px;
        height: 50px;
    }
    .board-card-icons span {
        font-size: 50px;
        color: green;
    }
    .card-bottom {
        display: flex;
        flex-direction: row;
        width: 100%
    }
    .card-bottom-delete{
        font-size: 12px;
        width: 100%;
        outline: none;
        border: 1px solid #ddd;
    }

`