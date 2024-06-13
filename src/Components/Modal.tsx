import { ReactElement } from "react";
import styled from "styled-components";
import { color } from "./ui/variables";
import { IoMdClose } from "react-icons/io";

const ModalPanel = styled.div`
    position: fixed;
    background: #0000004f;
    width: 100vw;
    min-height: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
`

const ModalComponent = styled.div`
    position: fixed;
    top: 25vh;
    left: 8vw;
    background-color: white;
    box-shadow: 0px 1px 2px 0px #1018288a;
    padding: 10px;
    width: 80vw;
    z-index: 9999;
    border-radius: 5px;
    border-top: 8px solid ${color.primary};
`

const ModalTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid ${color.primary};

    svg {
        cursor: pointer;
    }
`

const ModalContent = styled.div`
    padding: 25px 10px;
`

export default function Modal(props: { children?: ReactElement[] | ReactElement, title?: string, open?: boolean, onClose?: () => void }) {
    return (
        <ModalPanel style={{ display: props.open ? 'block' : 'none' }} >
            <ModalComponent>
                <ModalTitle>
                    <h3>{props.title}</h3>
                    <IoMdClose onClick={props.onClose} />
                </ModalTitle>
                <ModalContent>
                    {props.children}
                </ModalContent>
            </ModalComponent>
        </ModalPanel>
    )
}