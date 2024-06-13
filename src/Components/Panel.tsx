import { ReactElement } from "react";
import styled, { CSSProperties } from "styled-components";
import { panel, text } from "./ui/variables";

const Pnl = styled.div`
    margin-bottom: 30px;
    padding: 15px 20px;
    border-radius: 6px;
    box-shadow: 0 2px 2px ${panel.shadowColor};
    background-color: ${panel.backgroundColor};
    z-index: 1;
`

const PnlTitle = styled.h2`
    margin: 10px 0;
    color: ${text.default};
    display: flex;
    justify-content: space-between;
    color: ${text.default};

    svg {
        cursor: pointer;
    }
`;

const PnlSubtitle = styled.div`
    color: ${text.default};
    margin-bottom: 20px;
`

const PnlContent = styled.div`
    color: ${text.default};
`;

export default function Panel(props: {
    children: ReactElement[] | ReactElement, title?: string, subtitle?: string, style?: CSSProperties
}) {
    return (
        <>
            <Pnl style={props.style}>
                {props.title &&
                    <PnlTitle>
                        {props.title}
                    </PnlTitle>}
                {props.subtitle && <PnlSubtitle>{props.subtitle}</PnlSubtitle>}
                <PnlContent>
                    {props.children}
                </PnlContent>
            </Pnl>
        </>
    )
}