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

export const fetchFromRedditInfo = createAsyncThunk(
    'searchResults/fetchFromRedditInfo',
    async (str) => {
    const response = await fetch (`https://www.reddit.com/search.json?q=${encodeURIComponent(str)}`);
    const json = await response.json();
    console.log(json);
    }
)

export const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState: {
        searchTerm:'',
        searchResults: {},
        isLoading: false,
        isError: false
    },
    reducers:{
        getSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
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
        },

         //Content Search 

        [fetchFromRedditInfo.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [fetchFromRedditInfo.fulfilled]: (state, action) => {
            state.searchResults = action.payload;
            state.isLoading = false;
            state.isError = false;
        },
        [fetchFromRedditInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
        }
    }
       


})

export const selectSearchResults = state => state.searchResults.searchResults;
export const selectTerm = state => state.searchResults.searchTerm;
export const {getSearchTerm} = searchResultsSlice.actions;
export default searchResultsSlice.reducer;