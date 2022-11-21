import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchFromReddit = createAsyncThunk(
    'searchResults/fetchFromReddit',
    async (str) => {
    const response = await fetch (`https://www.reddit.com/r/${str}.json`);
    const json = await response.json();
    return json.data.children.map(item => ({
        title: item.data.title,
        author_id: item.data.author_fullname,
        upVotes: item.data.ups,
        img: item.data.thumbnail,
        imgUrl: item.data.url,
        comments: item.data.permalink,
        id: item.data.id,
        type: item.kind,
        content: item.data.selftext}))
    }
)


export const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState: {
        searchResults: {},
        isLoading: false,
        isError: false
    },
    reducers:{},
    extraReducers:{
        [fetchFromReddit.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [fetchFromReddit.fulfilled]: (state, action) => {
            state.searchResults = action.payload;
            state.isLoading = false;
            state.isError = false;
        },
        [fetchFromReddit.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
        }
    }
})

export const selectSearchResults = state => state.searchResults.searchResults;
export default searchResultsSlice.reducer;