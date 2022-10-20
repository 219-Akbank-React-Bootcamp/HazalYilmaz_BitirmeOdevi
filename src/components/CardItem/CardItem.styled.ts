import styled from "styled-components";

export const Styled = styled.div`
    display: flex;
    font-size: .7rem;
    color: #323232;
    border-radius: 5px;
    padding: 1px;
    margin: 10px 0;
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .card-header {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 5px 10px;
    }
    .card-title {
        font-size: .8rem;
        font-weight: 500;
        color: #323232;
        margin: 10px 0;
    }
    .card-body {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-chip {
        font-size: .7rem;
        background-color: orange;
        margin: 0;
    }
    .card-detail {
        background: white !important;
        display: flex;
        flex-direction: column;
        width: 80vh;
        justify-content: center;
        align-items: flex-start;
        margin: auto auto;
        padding: 20px;
        border-radius: 7px;
    }
    .modal-headers {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-mains {
        display: flex;
        width: 100%;
    }
`