import { Link } from 'react-router-dom';

import Navigation from "../Navigation/Navigation"
import SearchBar from "../SearchBar/SearchBar"

import styles from "./Header.module.css"

const Header = () => {

    return (
        <header className={styles.header}>
            <h1><Link to='/'>Beer Punk Logo</Link> </h1>
            <SearchBar />
            <Navigation />

        </header>
    )
}

export default Header