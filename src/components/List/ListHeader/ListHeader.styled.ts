import styled from "styled-components";

export const Styled = styled.div`
    font-family:'Poppins', sans-serif;
    .listName {
        display: flex;
        justify-content: start;
        font-size: .9rem;
        position: sticky;
        margin: 10px 0;
        color: #323232;
        font-weight: bold;
        cursor: pointer;
    }
    .listName-edit {
        color: yellow;
        display: flex;
        justify-content: start;
        font-size: .9rem;
        position: sticky;
        margin: 10px 0;
        color: #323232;
        outline: none;
        padding: 2px 5px;
        border: 1px solid #ddd;
        border-radius: 3px;
        cursor: pointer;
    }
`