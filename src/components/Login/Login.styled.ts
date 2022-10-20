import styled from "styled-components";

export const Styled = styled.div`
    display: flex;
    width:100%;
    height: 100%;
    margin-top: 4rem;
    justify-content: center;

    .card {
        display: flex;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 0 5px 2px #eee;
        width: 420px;
        padding: 32px 40px;
        box-sizing: border-box;
    }
    h1 {
        margin: 0 0 30px 0;
        padding: 0;
        font-size: large;
        user-select: none;
        color: #323232;
    }
    .submit {
        width: 100%;
        margin: 10px 0;
    }
    .link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 3px;
        font-size: 13px;
        text-decoration: none;
        color: #333;
    }
    .link-text {
        color: green;
        font-weight: 400;
    }
`