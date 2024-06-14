import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { MdOutlineFilterAltOff } from "react-icons/md";
import Button from "../Components/Button";
import { FormItem, FormItemButton } from "../Components/FormItem";
import Modal from "../Components/Modal";
import Panel from "../Components/Panel";
import Select from "../Components/Select";
import DataTable, { TableCell, TableRow } from "../Components/Table";
import useQuery from "../Hooks/useQuery";
import { ExpenseHistory } from "../Model/ExpenseHistory";
import { ExpenseType } from "../Model/ExpenseTypeEnum";
import { deleteExpense, findExpensesByType } from "../Service/ExpenseHistoryService";
import { transformToMoney } from "../Service/MonetaryService";
import { expensesTypes } from "../Util/Constants";


export default function List() {
    const [loading, setLoading] = useState<boolean>(false);
    const query = useQuery();
    const [expenseType, setExpenseType] = useState<ExpenseType | any>(ExpenseType.C);
    const [deleting, isDeleting] = useState<boolean>(false);
    const [expenseHistoryToDelete, setExpenseHistoryToDelete] = useState<ExpenseHistory | undefined>(undefined);
    const [data, setData] = useState<ExpenseHistory[] | undefined>(undefined);

    useEffect(() => {
        const expenseType = expensesTypes.find(e => e.value === query.get('type'));
        if (expenseType) {
            setLoading(true)
            setExpenseType(expenseType);
            findExpensesByType(expenseType.value).then((response) => {
                setData(response)
            }).finally(() => setLoading(false));
        }
    }, [query, setLoading])

    const onFilter = (e: any) => {
        setData(undefined);
        e.preventDefault();
        if (expenseType.value) {
            setLoading(true);
            findExpensesByType(expenseType.value).then((response) => {
                setData(response)
            }).finally(() => setLoading(false));
        }
    }

    const onDelete = (e: any, id?: string) => {
        e.preventDefault();
        if (id) {
            setLoading(true)
            deleteExpense(id).finally(() => setLoading(false));
            isDeleting(false);
            setData(data?.filter(d => d.id !== id));
        }
    }

    const dataTableBodyTemplate = () => {
        return (
            data?.map((d, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell>{d.item}</TableCell>
                        <TableCell>{transformToMoney(d.value)}</TableCell>
                        <TableCell>{d.type === 'C' ? 'Crédito' : 'Débito'}</TableCell>
                        <TableCell>
                            <Button label="Deletar" onClick={() => {
                                setExpenseHistoryToDelete(d);
                                isDeleting(true);
                            }}></Button>
                        </TableCell>
                    </TableRow>
                )
            })
        )
    }

    return (
        <>
            <Panel title="Filter">
                <form onSubmit={onFilter}>
                    <FormItem>
                        <span>Tipo:</span>
                        <Select options={expensesTypes}
                            value={expenseType}
                            onChange={(value) => setExpenseType(value)}
                        ></Select>
                    </FormItem>
                    <FormItemButton>
                        <Button label="Filtrar" icon={<CiFilter />}></Button>
                        <Button type="reset" label="Limpar" icon={<MdOutlineFilterAltOff />} transparent></Button>
                    </FormItemButton>
                </form>
            </Panel>
            <Panel title="Resultado">
                <DataTable headers={['Item', 'Valor', 'Tipo', 'Ação']} dataTemaplte={dataTableBodyTemplate()} loading={loading}></DataTable>
            </Panel>
            <Modal open={deleting} onClose={() => isDeleting(false)} title={expenseHistoryToDelete?.item}>
                <form>
                    <FormItem>
                        <span>Tem certeza que deseja deletar?</span>
                    </FormItem>
                    <FormItemButton>
                        <Button label="Sim" onClick={(e) => onDelete(e, expenseHistoryToDelete?.id)}></Button>
                        <Button type="button" label="Não" onClick={() => isDeleting(false)} transparent></Button>
                    </FormItemButton>
                </form>
            </Modal>
        </>
    )
}