import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
/*
const redditLocation = 'https://www.reddit.com/'
const redditSubreddit = 'r/';
const redditSearch = 'search.json?q=';
*/

let mainParam ;

export const fetchFromReddit = createAsyncThunk(
    'searchResults/fetchFromReddit',
    async (str) => {
    mainParam = `https://www.reddit.com/r/${str}.json`;
    const response = await fetch (`https://www.reddit.com/r/${str}.json`);
    const json = await response.json();
    return json.data.children.map(item => ({
        subreddit: item.data.subreddit,
        after: json.data.after,
        commentsNum: item.data.num_comments,
        permalink: item.data.permalink,
        title: item.data.title,
        author_id: item.data.author_fullname,
        upVotes: item.data.ups,
        img: item.data.thumbnail,
        imgUrl: item.data.url,
        id: item.data.id,
        type: item.kind,
        content: item.data.selftext,
        comments: []}))
    }
)

export const loadMore = createAsyncThunk(
    'searchResults/loadMore',
    async (afterCode) => {
        console.log(mainParam);
    const response = await fetch (`${mainParam}?after=${afterCode}`);
    const json = await response.json();
    return json.data.children.map(item => ({
        subreddit: item.data.subreddit,
        after: json.data.after,
        commentsNum: item.data.num_comments,
        permalink: item.data.permalink,
        title: item.data.title,
        author_id: item.data.author_fullname,
        upVotes: item.data.ups,
        img: item.data.thumbnail,
        imgUrl: item.data.url,
        id: item.data.id,
        type: item.kind,
        content: item.data.selftext,
        comments: []}))
    }
)

export const fetchFromRedditInfo = createAsyncThunk(
    'searchResults/fetchFromRedditInfo',
    async (str) => {
    mainParam = `https://www.reddit.com/search.json?q=${encodeURIComponent(str)}&`;
    const response = await fetch (`https://www.reddit.com/search.json?q=${encodeURIComponent(str)}`);
    const json = await response.json();
    return json.data.children.map(item => ({
        subreddit: item.data.subreddit,
        after: json.data.after,
        commentsNum: item.data.num_comments,
        permalink: item.data.permalink,
        title: item.data.title,
        author_id: item.data.author_fullname,
        upVotes: item.data.ups,
        img: item.data.thumbnail,
        imgUrl: item.data.url,
        id: item.data.id,
        type: item.kind,
        content: item.data.selftext,
        comments: {}}))
    }
)

export const fetchComments = createAsyncThunk(
    'searchResults/fetchComments',
    async (payload) => {
        const {id, permalink} = payload;
        const response = await fetch(
            `https://www.reddit.com/${permalink}.json`
          );
          const json = await response.json();
          return ({
            parentId: id,
            postComments: (json[1].data.children.map((item) => ({
                id: item.data.name,
                text: item.data.body,
                ups: item.data.ups
              })))
          })
          ;
    }
)


export const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState: {
        currentLocation: '',
        searchResults: {},
        after: '',
        isLoading: false,
        isError: false
    },
    reducers:{
        deleteComments: (state, action) => {
            for (const post of state.searchResults) {
                if (post.id === action.payload)
                { post.comments = [] }
            }
        }
    },
    extraReducers:{
        [fetchFromReddit.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [fetchFromReddit.fulfilled]: (state, action) => {
            state.searchResults = action.payload;
            state.after = action.payload[0].after;
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
            state.after = action.payload[0].after;
            state.isLoading = false;
            state.isError = false;
        },
        [fetchFromRedditInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
        },

              //Even More Content Search 

            [loadMore.pending]: (state, action) => {
                state.isLoading = true;
                state.isError = false;
            },
            [loadMore.fulfilled]: (state, action) => {
                const newContent = action.payload;
                state.searchResults = [...state.searchResults, ...newContent]
                state.after = action.payload[0].after;
                state.isLoading = false;
                state.isError = false;
            },
            [loadMore.rejected]: (state, action) => {
                state.isLoading = false;
                state.isError = true;
            },

        //Comment Search
        [fetchComments.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [fetchComments.fulfilled]: (state, action) => {
            const {parentId, postComments} = action.payload;
            for (const post of state.searchResults) {
                if (post.id === parentId)
                { post.comments = postComments }
            }
            state.isLoading = false;
            state.isError = false;
        },
        [fetchComments.error]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
        }

    }
       


})

export const selectSearchResults = state => state.searchResults.searchResults;
export const selectAfterCode = state => state.searchResults.after;
export const { deleteComments } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;