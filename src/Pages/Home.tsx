import { useEffect, useState } from "react";
import { AiOutlineDatabase } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Grid from "../Components/Grid";
import Panel from "../Components/Panel";
import DataTable, { TableCell, TableLoading, TableRow } from "../Components/Table";
import { HomePage } from "../Model/HomePage";
import { buildHomePage } from "../Service/HomePageService";
import { transformToMoney } from "../Service/MonetaryService";

export default function Home() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const [homePageInfo, setHomePageInfo] = useState<HomePage | undefined>(undefined);

    useEffect(() => {
        setLoading(true);
        buildHomePage().then((data: HomePage) => {
            setHomePageInfo(data);
        }).finally(() => setLoading(false))
    }, [setLoading])


    const getBudgetName = (type: string) => {
        if (type === 'IF') {
            return 'iFood';
        } else if (type === 'CC') {
            return 'Crédito'
        } else if (type === 'CD') {
            return 'Débito'
        }
    }

    const creditDataTableTemplate = () => {
        if (homePageInfo) {
            return (
                <TableRow>
                    <TableCell>{transformToMoney(homePageInfo?.lastMonthCredit)}</TableCell>
                    <TableCell>{transformToMoney(homePageInfo?.currentMonthCredit)}</TableCell>
                    <TableCell>{transformToMoney(homePageInfo?.creditDiff)}</TableCell>
                </TableRow>
            )
        }
    }

    const debitDataTableTemplate = () => {
        if (homePageInfo) {
            return (
                <TableRow>
                    <TableCell>{transformToMoney(homePageInfo?.lastMonthDebit)}</TableCell>
                    <TableCell>{transformToMoney(homePageInfo?.currentMonthDebit)}</TableCell>
                    <TableCell>{transformToMoney(homePageInfo?.debitDiff)}</TableCell>
                </TableRow>
            )
        }
    }

    const budgetDataTableTemplate = () => {
        if (homePageInfo) {
            return (
                homePageInfo.budget.map((b, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>{getBudgetName(b.type)}</TableCell>
                            <TableCell>{transformToMoney(b.value)}</TableCell>
                            <TableCell>{transformToMoney(b.left)}</TableCell>
                        </TableRow>
                    )
                })
            )
        }
    }

    return (
        <>
            <Grid minMax="45vw">
                <Panel title="Crédito">
                    <DataTable headers={['Mês Anterior', 'Mês Atual', 'Diferença']} dataTemaplte={creditDataTableTemplate()} loading={loading} />
                    <Button label="Ver dados" icon={<AiOutlineDatabase />} onClick={() => navigate('/list?type=C')}></Button>
                </Panel>
                <Panel title="Débito">
                    <DataTable headers={['Mês Anterior', 'Mês Atual', 'Diferença']} dataTemaplte={debitDataTableTemplate()} loading={loading} />
                    <Button label="Ver dados" icon={<AiOutlineDatabase />} onClick={() => navigate('/list?type=D')}></Button>
                </Panel>
            </Grid>
            <Panel title="Budget">
                <DataTable headers={['Item', 'Valor', 'Restante']} dataTemaplte={budgetDataTableTemplate()} loading={loading} />
            </Panel>
            <Grid minMax="23vw">
                <Panel title="Fixo">
                    {loading ? <TableLoading></TableLoading> : <p>{transformToMoney(homePageInfo?.fixExpenseTotal)}</p>}
                </Panel>
                <Panel title="iFood">
                    {loading ? <TableLoading></TableLoading> : <p>{transformToMoney(homePageInfo?.ifoodExpenseTotal)}</p>}
                </Panel>
                <Panel title="Uber / 99">
                    {loading ? <TableLoading></TableLoading> : <p>{transformToMoney(homePageInfo?.appCarExpenseTotal)}</p>}
                </Panel>
                <Panel title="Gastos c/ Ana">
                    {loading ? <TableLoading></TableLoading> : <p>{transformToMoney(homePageInfo?.girlfriendExpenseTotal)}</p>}
                </Panel>
            </Grid>
        </>
    );
}