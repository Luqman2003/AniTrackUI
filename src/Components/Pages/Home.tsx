import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDataFromApi } from "../../Api/api";
import { ring } from 'ldrs';
import Loading from "./Loading";


// anime data type
type Anime = {
    mal_id: number;
    title: string;
};

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [airingData, setAiringData] = useState<Anime[]>([]); // Initialize with an empty array
    const [loading, setLoading] = useState<boolean>(true);

    ring.register();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDataFromApi("https://api.jikan.moe/v4/seasons/now");
                if (response && response.data) {
                    setAiringData(response.data); // Correctly set airing data
                    setLoading(false);
                } else {
                    console.error("No data found");
                }
            } catch (err: any) {
                console.error(err.message);
            }
        };
        fetchData();
    }, []);

    const handleAnimeClick = (mal_id: number, title: string) => {
        navigate(`/anime/${mal_id}/${encodeURIComponent(title)}`);
    };

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <h1>Home page</h1>
                    <ul>
                        {airingData.map((anime) => (
                            <li key={anime.mal_id}>
                                <button onClick={() => handleAnimeClick(anime.mal_id, anime.title)}>
                                    {anime.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
