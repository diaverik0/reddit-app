import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchComments2 = createAsyncThunk(
    'comments/fethComments2',
    async (payload) => {
        console.log(payload);
        const {id, permalink} = payload;
        const response = await fetch(
            `https://www.reddit.com/${permalink}.json`
          );
          const json = await response.json();
          return ({
            parentId: id,
            postComments: (json[1].data.children.map((item) => ({
                id: item.data.name,
                text: item.data.body
              })))
          })
          ;
    }
)

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments:{
        },
        isLoadingComments: false,
        isError: false
    },
    reducers: {},
    extraReducers: {
        [fetchComments2.pending]: (state, action) => {
            state.isLoadingComments = true;
            state.isError = false;
        },
        [fetchComments2.fulfilled]: (state, action) => {
            state.comments = action.payload;
            state.isLoadingComments = false;
            state.isError = false;
        },
        [fetchComments2.rejected]: (state, action) => {
            state.isLoadingComments = false;
            state.isError = true;
        }
    } 
})

export const selectComments = state => state.comments.comments;
export default commentsSlice.reducer;

