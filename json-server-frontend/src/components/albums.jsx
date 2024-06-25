import React, { useState, useEffect, useRef } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem, Flex } from '@chakra-ui/react';
import { ChevronDownIcon, Search2Icon, DeleteIcon } from '@chakra-ui/icons';
import { FiFilter } from 'react-icons/fi';
import SearchInput from './SearchInputTodos';
import AddAlbum from './AddAlbum';
import PhotosAlbum from './PhotosAlbum';



//-------------------Albums Component------------------------------------------

const Albums = ({ user }) => {

    // return (
    //     <h1>Albums</h1>
    // )


    const API_URL = `http://localhost:3000/albums`;
    const [albums, setAlbums] = useState([]);
    const [filter, setFilter] = useState('serial');
    const [search, setSearch] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('title');
    const [AlbumPhotosVisible, setAlbumPhotosVisible] = useState(false);
    const [currentAlbum, setCurrentAlbum] = useState(null);

    console.log('re-render', search);



    //-------------------Fetch albums from the API for the current user-------------
    useEffect(() => {
        async function getAlbums() {
            try {
                const response = await fetch(`${API_URL}?userId=${user.id}`);
                const data = await response.json();
                setAlbums(data.map((album, index) => ({ ...album, serialNum: index + 1 })));
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        }
        getAlbums();
    }, [user]);


    //-------------------Add new album-----------------------------------------------
    const handleAddAlbum = async (newAlbum) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newAlbum, userId: user.id }),
            });

            if (!response.ok) {
                throw new Error('Failed to add album');
            }

            const addedAlbum = await response.json();
            setAlbums([...albums, { ...addedAlbum, serialNum: albums.length + 1 }]);
        } catch (error) {
            console.error('Error adding album:', error);
        }
    };


    //-------------------Update album------------------------------------------------
    const handleUpdateAlbum = async (updatedAlbum) => {
        try {

            const { serialNum, ...albumWithoutSerialNum } = updatedAlbum;

            const response = await fetch(`${API_URL}/${updatedAlbum.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(albumWithoutSerialNum),
            });

            if (!response.ok) {
                throw new Error('Failed to update album');
            }

            const data = await response.json();
            setAlbums(albums.map(album => (album.id === data.id ? { ...data, serialNum: serialNum } : album)));
        } catch (error) {
            console.error('Error updating album:', error);
        }
    };


    //-------------------Delete album---------------------------------------------------
    const handleDeleteAlbum = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete album');
            }

            setAlbums(albums.filter(album => album.id !== id));
        } catch (error) {
            console.error('Error deleting album:', error);
        }
    };


    //-------------------Open PopUp---------------------------------------------------

    const handleOpenPopUp = (album) => () => {
        console.log('open popup', album);
        setCurrentAlbum(album);
        setAlbumPhotosVisible(true);
    };


    //-------------------Filter Menu---------------------------------------------------

    const FilterMenu = () => {

        const handleMenuItemClick = (value) => {
            setFilter(value);
        };

        return (
            <div style={{ zIndex: "100" }}>
                <Menu>
                    <MenuButton px={12} py={8} as={Button} rightIcon={<ChevronDownIcon />}>
                        <Flex align="center">

                            <FiFilter mr={5} />
                            Filter
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => handleMenuItemClick('serial')} border={filter === 'serial' ? '2px solid black' : 'none'} >
                            Serial
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('alphabetical')} border={filter === 'alphabetical' ? '2px solid black' : 'none'} >
                            Alphabetical
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('random')} border={filter === 'random' ? '2px solid black' : 'none'}>
                            Random
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        );
    };

    const SearchMenu = ({ }) => {

        const handleMenuItemClick = (value) => {
            setSearchCriteria(value);
        };

        return (
            <div style={{ zIndex: "100" }}>
                <Menu>
                    <MenuButton px={12} py={8} as={Button} rightIcon={<ChevronDownIcon />}>
                        <Flex align="center">

                            <Search2Icon mr={5} />
                            Search by
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => handleMenuItemClick('serial')} border={filter === 'serial' ? '2px solid black' : 'none'}>
                            Serial Number
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('title')} border={filter === 'title' ? '2px solid black' : 'none'}>
                            Title
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        );
    };



    //-------------------Filter and sort albums------------------------------------------
    const filteredAlbums = albums
        .filter((album, index) => {
            if (searchCriteria === 'serial') {
                return search ? album.serialNum.toString().includes(search) : true;
            }
            if (searchCriteria === 'title') {
                return search ? album.title.toLowerCase().includes(search.toLowerCase()) : true;
            }
        })
        .sort((a, b) => {
            if (filter === 'serial') return a.serialNum - b.serialNum;
            if (filter === 'alphabetical') return a.title.localeCompare(b.title);
            if (filter === 'random') return 0.5 - Math.random();
            return 0;
        });


    //-------------------albums Filters------------------------------------------

    const AlbumFilters = () => (

        <div style={{ zIndex: "100" }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',

            }}>
                <FilterMenu />
                <SearchMenu search={search} setSearch={setSearch} />
                <SearchInput search={search} setSearch={setSearch} />


            </div>
        </div>);

    return (
        <div>
            <div className='popup-overlay' style={{ display: AlbumPhotosVisible ? "flex" : "none" }}>
                <div className='popup-content' id='popup-photos'>
                    <PhotosAlbum album={currentAlbum} setAlbumPhotosVisible={setAlbumPhotosVisible} />
                </div>
            </div>
            <div style={
                {
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }>
                <h1>Albums</h1>

                <AlbumFilters></AlbumFilters>
                <ul className='todo-list'>
                    {filteredAlbums.map((album, index) => (
                        <li key={album.id} className='todo-item' style={{ backgroundColor: '#FFC0CB' }}>
                            <span>{album.serialNum}</span>
                            <img style={{ width: '55px', cursor: 'pointer' }} src="./img/photos.png" alt="תמונות" onClick={handleOpenPopUp(album)} />
                            <input
                                className='todo-title'
                                type="text"
                                value={album.title}
                                onChange={(e) => handleUpdateAlbum({ ...album, title: e.target.value })}
                            />
                            <button className='delete-button' onClick={() => handleDeleteAlbum(album.id)}><DeleteIcon style={{ color: 'white' }} /></button>
                        </li>
                    ))}
                </ul>
                <AddAlbum onAddAlbum={handleAddAlbum} />

            </div>
        </div>
    );
};




export default Albums;