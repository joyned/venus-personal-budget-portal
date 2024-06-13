import styled from "styled-components"

const GridComponent = styled.div`
    display: grid;
    gap: 20px;
`


export default function Grid(props: { children?: React.ReactNode | React.ReactNode[], minMax?: string }) {
    return (
        <GridComponent style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${props.minMax ? props.minMax : '200px'}, 1fr))` }}>
            {props.children}
        </GridComponent>
    )
}