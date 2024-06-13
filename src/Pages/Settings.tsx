import { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import Button from "../Components/Button";
import { FormItem } from "../Components/FormItem";
import Input from "../Components/Input";
import { useLoading } from "../Components/Loading";
import Panel from "../Components/Panel";
import { Budget } from "../Model/Budget";
import { BudgetType } from "../Model/BudgetTypeEnum";
import { findBudget, saveBudget } from "../Service/BudgetService";

export default function Settings() {
    const { setLoading } = useLoading();
    const [budgets, setBudgets] = useState<Budget[] | undefined>(undefined)
    const [ifoodBudget, setIfoodBudget] = useState<number | undefined>(undefined);
    const [creditBudget, setCreditBudget] = useState<number | undefined>(undefined);
    const [debitBudget, setDebitBudget] = useState<number | undefined>(undefined);

    useEffect(() => {
        setLoading(true);
        findBudget().then((data: Budget[]) => {
            setBudgets(data);
            data.forEach(b => {
                if (b.type === BudgetType.IF) {
                    setIfoodBudget(b.value);
                } else if (b.type === BudgetType.CD) {
                    setDebitBudget(b.value);
                } else if (b.type === BudgetType.CC) {
                    setCreditBudget(b.value);
                }
            })
        }).finally(() => setLoading(false));
    }, [setLoading])

    const onSubmit = (e: any) => {
        e.preventDefault();

        const date = new Date();
        const currMonth = new Date(date.getFullYear(), date.getMonth(), 1);

        if (budgets && budgets.length === 0) {
            const budgets: Budget[] = [
                {
                    value: ifoodBudget || 0,
                    date: currMonth,
                    type: BudgetType.IF
                },
                {
                    value: creditBudget || 0,
                    date: currMonth,
                    type: BudgetType.CC
                },
                {
                    value: debitBudget || 0,
                    date: currMonth,
                    type: BudgetType.CD
                }
            ]

            saveBudget(budgets).then(() => setLoading(false))

        } else if (budgets) {
            budgets.forEach(b => {
                if (b.type === BudgetType.IF) {
                    b.value = ifoodBudget || b.value;
                } else if (b.type === BudgetType.CD) {
                    b.value = debitBudget || b.value;
                } else if (b.type === BudgetType.CC) {
                    b.value = creditBudget || b.value;
                }
            })

            saveBudget(budgets).then(() => setLoading(false))
        }
    }

    return (
        <>
            <Panel title="Budget do Mês">
                <form onSubmit={onSubmit}>
                    <FormItem>
                        <span>iFood:</span>
                        <Input type="number" value={ifoodBudget} onChange={(e) => setIfoodBudget(e.target.value)}></Input>
                    </FormItem>
                    <FormItem>
                        <span>Crédito:</span>
                        <Input type="number" value={creditBudget} onChange={(e) => setCreditBudget(e.target.value)}></Input>
                    </FormItem>
                    <FormItem>
                        <span>Débito:</span>
                        <Input type="number" value={debitBudget} onChange={(e) => setDebitBudget(e.target.value)}></Input>
                    </FormItem>
                    <Button label="Salvar" icon={<FaRegSave />}></Button>
                </form>
            </Panel>
        </>
    )
}