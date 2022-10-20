import styled from "styled-components";

export const Styled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .board {
        display: flex;
        margin: 10px;
        padding: 20px;
        width: auto;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .board-card {
        display: flex;
        flex-direction: column;
        border: 1px solid #ddd;
        color: #323232;
        border-radius: 5px;
        padding: 10px;
        width: 150px;
        height: 150px;
        justify-content: center;
        align-items: center;
        gap: 20px;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
        background-color: white;
        cursor: pointer;
        margin: 10px 20px;
    }
    .board-card:hover{
        border: 2px solid green;
        color: green;
        background-color: #D2E6D3;
        .board-card-icon-in {
            color: darkgreen;
        }
        .board-card-text {
            color: darkgreen;
        }
    }
    .board-card:is(:hover, :focus) {
        outline: 3px solid green;
        outline-offset: 3px;
    }
    .board-card-icon {
        width: 50px;
        height: 50px;
    }
    .board-card-icon-in {
        font-size: 50px;
        color: #323232;
        font-weight: 300; 
    }
    .board-card-text {
        color: #323232;
        font-weight: 500;
        font-size: 18px;
    }

`