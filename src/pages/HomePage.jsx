import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { API_SETTINGS } from '../settings/settings';

const HomePage = () => {
    const [characters, setCharacter] = useState({
        info: {},
        results: []
    })

    const [episodesList, setEpisodeList] = useState([])

    const getCharacter = async (episodes) => {
        try {
            let result = []
            const character_res = await axios.get(API_SETTINGS.GET_ALL_CHARACTERS);
            character_res.data.results.forEach((character) => {
                const episode_ind = episodes.findIndex((epi) => epi.url === character.episode[0])
                result.push({
                    ...character,
                    episode_data: episodes[episode_ind]
                })
            });

            setCharacter({ ...character_res.data, results: result })
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }

    useEffect(() => {
        const getEpisodeList = async () => {
            let allEpisodes = []
            try {
                const episodes = await axios.get(API_SETTINGS.GET_ALL_EPISODE);
                for (let episode = 0; episode < episodes.data.info.count; episode++) {
                    allEpisodes.push(episode)
                }
                const res = await axios.get(API_SETTINGS.GET_ALL_EPISODE + '/' + allEpisodes);
                setEpisodeList(res.data)
            } catch (error) {
                toast.error("Something went wrong!")
            }
        }
        getEpisodeList()
    }, [])

    useEffect(() => {
        if (episodesList.length) {
            getCharacter(episodesList)
        }
    }, [episodesList])

    return (
        <section className="pb-5">
            <div className="container">
                <div className="section-title">
                    <h5>All Characters</h5>
                </div>
                <div className="character">
                    <div className="row g-4">
                        {characters.results.map((character, index) => (
                            <div className="col-xl-6 col-lg-6 col-md-12 col-12" key={index}>
                                <div className="card character-card">
                                    <div className="card-body p-0">
                                        <div className="row g-2">
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                                <div className="character-image">
                                                    <img src={character.image} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-xl col-lg col-md col-12">
                                                <div className="p-2">
                                                    <div className="mt-2">
                                                        <h4>{character.name}</h4>
                                                    </div>
                                                    <div className="mt-3">
                                                        <h6>
                                                            <i className={'fa-solid fa-circle fa-xs status-' + character.status}></i>
                                                            <span className="ms-2">
                                                                {character.status} - {character.species}
                                                            </span>
                                                        </h6>
                                                    </div>
                                                    <div className="mt-3">
                                                        <span className='text-muted fw-600'>Last known location:</span>
                                                        <a href={character.location.url}>
                                                            <h6>{character.location.name}</h6>
                                                        </a>
                                                    </div>
                                                    <div className="mt-3">
                                                        <span className='text-muted fw-600'>First seen in:</span>
                                                        <a href={character.episode_data?.url}>
                                                            <h6>{character.episode_data?.name}</h6>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage