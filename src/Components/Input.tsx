import styled from "styled-components";
import { color, text } from "./ui/variables";

const Ipt = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid grey;
    margin-top: 7px;
    color: ${text.default};
    font-size: ${text.fontSize};
    background-color: transparent;

    ::placeholder {
        color: ${text.placeholder};
        opacity: 1;
    }

    &[type=date] {
        color: ${text.default};
    }

    &:disabled {
        background-color: ${color.secondary};
    }
`


export default function Input(props: {
    type: string,
    placeholder?: string,
    onChange?: (event: any) => void,
    value?: any,
    disabled?: boolean
    max?: string,
    required?: boolean,
    onKeyPress?: (event: any) => void,
}) {
    return (
        <Ipt type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            disabled={props.disabled}
            max={props.max}
            required={props.required}
            onKeyUp={props.onKeyPress}
            step="any">
        </Ipt>
    )
}