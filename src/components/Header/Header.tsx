//logo search bar navigation with 3 pages
import Navigation from "../Navigation/Navigation"
import SearchBar from "../SearchBar/SearchBar"

import styles from "./Header.module.css"

const Header = () => {

    return (
        <header className={styles.header}>
            <h1>Bear Punk Logo</h1>
            <SearchBar />
            <Navigation />

        </header>
    )
}

export default Header