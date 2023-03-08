const store = require("./rtk/app/store")
const { fetchVideos } = require("./rtk/features/video/videoSlice")
const { fetchVideoWithTags } = require("./rtk/features/video/videoSlice")



store.subscribe(() => {

})

store.dispatch(fetchVideos())

setTimeout(() => {
    const tags = store.getState().video.videos.tags
    store.dispatch(fetchVideoWithTags(tags))
}, 100);