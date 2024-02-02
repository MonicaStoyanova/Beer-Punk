// import React from 'react'

import { useState } from "react";

const Favorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (name: string) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(name)) {
                return prevFavorites.filter(favoriteId => favoriteId !== name);
            } else {
                return [...prevFavorites, name];
            }
        });
    };
    return (
        <div>Favorites</div>
    )
}

export default Favorites