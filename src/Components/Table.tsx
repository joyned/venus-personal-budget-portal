import styled from "styled-components";
import { text } from "./ui/variables";

export const ResponsiveTable = styled.div`
    overflow-x:auto;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

export const TableHead = styled.thead`
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    color: ${text.default};
    font-weight: bold;
    text-align: left;
    padding: 10px;
`

export const TableTh = styled.th`
    padding: 10px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    color: ${text.default};
    font-weight: bold;
    text-align: left;
    font-size: 18px;
`;

export const TableBody = styled.tbody`
    font-size: 16px;
    color: ${text.default};
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: "#f2f2f2";
    }
    &:hover {
        background-color: "#f2f2f2";
    }
`;

export const TableCell = styled.td`
    padding: 10px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    color: ${text.default};
    text-align: left;
    &:last-child {
        border-right: none;
    }
`;

export const TableCaption = styled.caption`
    font-size: 20px;
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: left;
    padding: 10px;
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    border-bottom: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const TableFooter = styled.tfoot`
    font-size: 16px;
    color: #333;
    padding: 10px;
    border-top: 1px solid #ddd;
`;

export const TableLoading = styled.div`
    background-color: #ededed;
    height: 22px;
    border-radius: 7px;
    width: 100%;
    margin-bottom: 10px;
    background: linear-gradient(to right, #eee 20%, #ddd 50%, #eee 80%);
    background-size: 200% 100%;
    background-position-x: 100%;
    animation: 1s loading ease-in-out infinite;

    @keyframes loading {
        to{
            background-position-x: -30%
        }
    }
`

export default function DataTable(props: { headers?: string[], data?: any[], dataKeys?: string[], dataTemaplte?: any[] | any, loading?: boolean }) {
    return (
        <ResponsiveTable>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.headers?.map((header, index) => (
                            <TableTh key={index}>{header}</TableTh>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {props.loading && props.headers && (
                            props.headers.map((_, index) => {
                                return (
                                    <TableCell key={index}>
                                        <TableLoading></TableLoading>
                                        <TableLoading></TableLoading>
                                        <TableLoading></TableLoading>
                                    </TableCell>
                                )
                            })
                        )}
                    </TableRow>
                    {props.dataTemaplte && props.dataTemaplte}
                    {props.data?.map((data, index) => (
                        <TableRow key={index}>
                            {props.dataKeys?.map((key, index) => (
                                <TableCell key={index}>{data[key]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ResponsiveTable>
    )
}