import './App.css';
import {IconCertificate, IconListSearch, IconWallet, IconUser} from '@tabler/icons'
import { useSelector, useDispatch } from 'react-redux'
import {JobForm} from "./Job";
import {getAccounts, requestAccounts} from "./app/web3Slice";
import {useEffect} from "react";

function App() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAccounts());
    }, []);

    return (
        <div className="page">
            <Navigation/>
            <PageHeader/>
            <PageBody>
                <JobForm/>
            </PageBody>
            <PageFooter/>
        </div>
    );
}

function Navigation(){
    const dispatch = useDispatch();
    const {accounts, walletMessage} = useSelector(state => state.web3);

    const connect = ()=>{
        dispatch(requestAccounts());
    }

    return (
        <header className="navbar navbar-expand-md navbar-light d-print-none">
            <div className="container-xl">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-nav flex-row order-md-last">
                    <div className="d-md-flex mt-1 mt-md-0">
                        {accounts.length ?
                            <a className="nav-link disabled text-lime" href="#">
                                <span className="nav-link-icon text-lime">
                                    <IconWallet/>
                                </span>
                                <span className="nav-link-title">
                                    Wallet {accounts[0].substring(0, 4)}...{accounts[0].substring(accounts[0].length-4, accounts[0].length)}
                                </span>
                            </a>
                            :
                            <a className="nav-link" href="#" onClick={connect}>
                                <span className="nav-link-icon">
                                    <IconWallet/>
                                </span>
                                <span className="nav-link-title">
                                    {walletMessage}
                                </span>
                            </a>
                        }
                    </div>

                </div>


                <div className="collapse navbar-collapse" id="navbar-menu">
                    <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">
                                    <span className="nav-link-icon d-md-none">
                                        <IconCertificate/>
                                    </span>
                                    <span className="nav-link-title">
                                        Task
                                    </span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="/directory">
                                    <span className="nav-link-icon d-md-none">
                                        <IconListSearch/>
                                    </span>
                                    <span className="nav-link-title">
                                        Directory
                                    </span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="/profile">
                                    <span className="nav-link-icon d-md-none">
                                        <IconUser/>
                                    </span>
                                    <span className="nav-link-title">
                                        Profile
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

function PageHeader(){
    return (
        <div className="page-wrapper">
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <h2 className="page-title">
                                <IconCertificate/> Contract
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PageBody({children}){
    return (
        <div className="page-body">
            <div className="container-xl">
                <div className="row row-cards">
                    <div className="col-12">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

function PageFooter(){
    return (
        <footer className="footer footer-transparent d-print-none">
            <div className="container-xl">
                <div className="row text-center align-items-center flex-row-reverse">
                    <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                        <ul className="list-inline list-inline-dots mb-0">
                            <li className="list-inline-item">
                                Copyright © 2022 <a href="http://suhenky.com" className="link-secondary">Serafim Sukhenkiy</a>.
                                All rights reserved.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default App;
