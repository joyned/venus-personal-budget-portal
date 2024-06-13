import { FaHome, FaRegSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from "../Components/ui/variables";
import { IoMdSettings } from "react-icons/io";
import Loading, { useLoading } from "../Components/Loading";
import { useEffect, useState } from "react";
import { saveExpense, totalFromCurrentMonth } from "../Service/ExpenseHistoryService";
import { transformToMoney } from "../Service/MonetaryService";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosRefresh } from "react-icons/io";
import Modal from "../Components/Modal";
import { FormItem, FormItemButton } from "../Components/FormItem";
import Select from "../Components/Select";
import Input from "../Components/Input";
import { MdOutlineCancel } from "react-icons/md";
import Button from "../Components/Button";
import { ExpenseHistory } from "../Model/ExpenseHistory";
import { ExpenseType } from "../Model/ExpenseTypeEnum";
import { TableLoading } from "../Components/Table";

const MainContainer = styled.div`
    min-height: 100vh;
    background-color: ${color.background};
`;

const Content = styled.div`
    padding: 20px;
`;

const MenuBar = styled.div`
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    background-color: ${color.primary};
`;

const MenuNav = styled.div`
    display: flex;
    gap: 20px;
    padding: 0 20px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const MenuMobile = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 40px;
    left: 0;
    width: 100%;
    padding: 15px;
    border-radius: 5px;
    gap: 10px;
    background-color: ${color.primary};
    z-index: 9999;
`;


const MenuMobileButton = styled.div`
    display: none;
    align-items: center;
    cursor: pointer;
    color: white;
    font-size: 20px;
    padding: 0 20px;

    @media (max-width: 768px) {
        display: flex;
    }
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
`;

const MenuMonthValue = styled.div`
    display: flex;
    padding: 0 20px;
`



export default function Layout(props: { children: React.ReactNode }) {
    const [totalValueLoading, setTotalValueLoading] = useState<boolean>(true);
    const { loading, setLoading } = useLoading();
    const navigate = useNavigate();

    const [totalValue, setTotalValue] = useState<number>();

    const [displayMenuMobile, setDisplayMenuMobile] = useState<boolean>(false);

    const [newExpenseModal, setNewExpenseModal] = useState<boolean>(false);

    const [expenseType, setExpenseType] = useState<ExpenseType | any>(ExpenseType.C);
    const [expenseName, setExpenseName] = useState<string>('');
    const [expenseValue, setExpenseValue] = useState<number | undefined>(undefined);

    useEffect(() => {
        setTotalValueLoading(true);
        totalFromCurrentMonth()
            .then((data) => setTotalValue(data))
            .finally(() => setTotalValueLoading(false));
    }, [])

    const refreshTotalValue = () => {
        setTotalValueLoading(true);
        totalFromCurrentMonth()
            .then((data) => setTotalValue(data))
            .finally(() => setTotalValueLoading(false));
    }

    const onSubmitExpense = (e: any) => {
        e.preventDefault();

        setLoading(true);

        const date = new Date();
        const currMonth = new Date(date.getFullYear(), date.getMonth(), 1);

        const expense: ExpenseHistory = {
            item: expenseName,
            value: expenseValue || 0,
            date: currMonth,
            type: expenseType['value']
        }

        saveExpense(expense)
            .then(() => setNewExpenseModal(false))
            .finally(() => setLoading(false));
    }

    return (
        <Loading isLoading={loading}>
            <MainContainer>
                <MenuBar>
                    <MenuMobileButton>
                        <CiMenuBurger onClick={() => setDisplayMenuMobile(!displayMenuMobile)}></CiMenuBurger>
                        {displayMenuMobile && <MenuMobile>
                            <MenuItem onClick={() => navigate('/')}>
                                <FaHome></FaHome>
                                Inicio
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/settings')}>
                                <IoMdSettings></IoMdSettings>
                                Configurações
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/list')}>
                                <CiMenuBurger></CiMenuBurger>
                                Listagem
                            </MenuItem>
                            <MenuItem onClick={() => setNewExpenseModal(true)}>
                                <FaRegSave></FaRegSave>
                                Nova Despesa
                            </MenuItem>
                        </MenuMobile>}
                    </MenuMobileButton>
                    <MenuNav>
                        <MenuItem onClick={() => navigate('/')}>
                            <FaHome></FaHome>
                            Inicio
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/settings')}>
                            <IoMdSettings></IoMdSettings>
                            Configurações
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/list')}>
                            <CiMenuBurger></CiMenuBurger>
                            Listagem
                        </MenuItem>
                        <MenuItem onClick={() => setNewExpenseModal(true)}>
                            <FaRegSave></FaRegSave>
                            Nova Despesa
                        </MenuItem>
                    </MenuNav>
                    <MenuMonthValue>
                        <MenuItem>
                            {totalValueLoading ? <TableLoading></TableLoading> :
                                <>
                                    {transformToMoney(totalValue)}
                                    <IoIosRefresh onClick={refreshTotalValue}></IoIosRefresh>
                                </>}
                        </MenuItem>
                    </MenuMonthValue>
                </MenuBar>
                <Content style={{ marginTop: displayMenuMobile ? '120px' : '' }}>
                    {props.children}
                </Content>
            </MainContainer>
            <Modal title="Nova Despesa" open={newExpenseModal} onClose={() => setNewExpenseModal(false)} >
                <form onSubmit={onSubmitExpense}>
                    <FormItem>
                        <span>Tipo:</span>
                        <Select options={[{ 'name': 'Débito', 'value': 'D' }, { 'name': 'Crédito', 'value': 'C' }]}
                            value={expenseType}
                            onChange={(value) => setExpenseType(value)}
                        ></Select>
                    </FormItem>
                    <FormItem>
                        <span>Nome:</span>
                        <Input type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)}></Input>
                    </FormItem>
                    <FormItem>
                        <span>Valor:</span>
                        <Input type="number" value={expenseValue} onChange={(e) => setExpenseValue(e.target.value)}></Input>
                    </FormItem>
                    <FormItemButton>
                        <Button label="Enviar" icon={<FaRegSave />}></Button>
                        <Button label="Cancelar" type="button" icon={<MdOutlineCancel />} onClick={() => setNewExpenseModal(false)} transparent></Button>
                    </FormItemButton>
                </form>
            </Modal>
        </Loading>
    )
}