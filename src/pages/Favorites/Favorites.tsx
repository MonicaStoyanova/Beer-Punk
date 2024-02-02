import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Beer } from "../../utils/consts";
import BeerCard from "../../components/BeerCard/BeerCard";

const Favorites = () => {
    const favorites: Beer[] = useSelector((state: RootState) => state.favorites.favorites);


    return (
        favorites.map(favorite => (
            <BeerCard key={favorite.id} beer={favorite} />
        ))
    );
};

export default Favorites;
