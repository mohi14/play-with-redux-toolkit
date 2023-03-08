const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");



// initial state
const initialState = {
    loading: false,
    videos: [],
    error: ""
};

// thunk for ralatedvideos
const fetchVideoWithTags = createAsyncThunk("video/fetchVideoWithTags", async (tags) => {
    const res = await fetch(`http://localhost:9000/videos?${tags.map(tag => `tags_like=${tag}`).join("&")}`)
    const data = await res.json()
    const videos = data.sort((a, b) => parseInt(b.views) - parseInt(a.views))
    return videos
})

// thunk for video
const fetchVideos = createAsyncThunk("video/fetchVideos", async () => {
    const response = await fetch("http://localhost:9000/videos");
    const video = await response.json();
    return video
})


const videoSlice = createSlice({
    name: "video",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideos.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(fetchVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = ""
            state.videos = action.payload;

        });
        builder.addCase(fetchVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.videos = [];
        });

        // 
        builder.addCase(fetchVideoWithTags.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(fetchVideoWithTags.fulfilled, (state, action) => {
            state.loading = false;
            state.error = ""
            state.videos = action.payload;
        });
        builder.addCase(fetchVideoWithTags.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.videos = [];
        });
    }
})

module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;
module.exports.fetchVideoWithTags = fetchVideoWithTags;