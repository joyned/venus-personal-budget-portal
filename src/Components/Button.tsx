import { CSSProperties, ReactElement } from "react";
import styled from "styled-components";
import { color } from "./ui/variables";

const Btn = styled.button<{ $isTransparent?: boolean }>`
    background-color: ${props => props.$isTransparent ? 'transparent' : color.primary};
    color: ${props => props.$isTransparent ? color.primary : 'white'};
    border: 1px solid ${color.primary};
    border-radius: 5px;
`;

const BtnLabel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
`

const BtnIcon = styled.div`
`

const BtnText = styled.div`
`

export default function Button(props: { label?: string, icon?: ReactElement, onClick?: (event: any) => void, transparent?: boolean, type?: 'button' | 'submit' | 'reset', style?: CSSProperties }) {

    return (
        <Btn $isTransparent={props.transparent} onClick={props.onClick} style={props.style}
            type={props.type ?? 'submit'}>
            <BtnLabel style={{ paddingRight: props.icon ? '13px' : '', gap: props.icon ? '7px' : '' }}>
                <BtnIcon>
                    {props.icon}
                </BtnIcon>
                <BtnText>{props.label}</BtnText>
            </BtnLabel>
        </Btn>
    )
}