import React, { useState } from 'react'
import { TextInput, Button, Group, Container, Burger, Drawer } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CryptoJS from 'crypto-js'

const Header = () => {
  const [opened, setOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery) return;

    const publicKey = "36e5c3054b58d9f40f12da99a916e19a";
    const privateKey = "6b333a4c18740e862087007e7b0aec4cd9dfc107";
    const ts = Date.now().toString();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${searchQuery}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );
      setSearchResults(response.data.data.results);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching comics:", error);
    }
  };

  return (
    <div className="bg-black py-4 fixed top-0 w-full z-50">
      <Container size="lg">
        <div className="flex items-center justify-between">
          <Link to="/home">
            <div className="text-white text-2xl font-bold">
              ComicAxis
            </div>
          </Link>

          <div className="md:hidden">
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              color="red"
            />
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-4">
            <div className="flex-1 max-w-xl relative">
              <Group>
                <TextInput
                  placeholder="Search Comics..."
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  rightSection={
                    <IconSearch size={16} className="text-gray-500" />
                  }
                />
                <button 
                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-white hover:text-black'
                  onClick={handleSearch}
                >
                  Search
                </button>
              </Group>
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg max-h-96 overflow-y-auto">
                  {searchResults.map((comic) => (
                    <Link 
                      key={comic.id} 
                      to={`/comic/${comic.id}`}
                      onClick={() => setShowResults(false)}
                    >
                      <div className="flex items-center gap-4 p-4 hover:bg-gray-100">
                        <img 
                          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                          alt={comic.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <span className="text-black">{comic.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className='m'>
              <Link to="/signin">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-white hover:text-black">
                  Sign In
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile drawer */}
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            position="right"
            size="100%"
            padding="xl"
          >
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <Group>
                  <TextInput
                    placeholder="Search Comics..."
                    className="flex-1"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    rightSection={
                      <IconSearch size={16} className="text-gray-500" />
                    }
                  />
                  <Button 
                    variant="filled" 
                    fullWidth 
                    color="red"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Group>
                {showResults && searchResults.length > 0 && (
                  <div className="mt-4 bg-white rounded-md shadow-lg max-h-96 overflow-y-auto">
                    {searchResults.map((comic) => (
                      <Link 
                        key={comic.id} 
                        to={`/comic/${comic.id}`}
                        onClick={() => {
                          setShowResults(false);
                          setOpened(false);
                        }}
                      >
                        <div className="flex items-center gap-4 p-4 hover:bg-gray-100">
                          <img 
                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                            alt={comic.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <span className="text-black">{comic.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/signin" onClick={() => setOpened(false)}>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md w-full">
                  Sign In
                </button>
              </Link>
            </div>
          </Drawer>
        </div>
      </Container>
    </div>
  )
}

export default Header