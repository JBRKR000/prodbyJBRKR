const SPOTIFY_API_KEY = process.env.SPOTIFY_API_KEY;
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

export const getArtistTopTracks = async (artistId: string) => {
    const  response = await fetch(`${SPOTIFY_API_BASE_URL}/artists/${artistId}/top-tracks`, {
        headers: {
            Authorization: `Bearer ${SPOTIFY_API_KEY}`,
        },
    });
    if(response.ok){
        const data = await response.json();
        return data.tracks;
    } else{
        console.error("Failed to fetch top tracks:", response.statusText);
    }
    return [];
}

