const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;

const app = {
    menu: document.querySelector("#menu"),
    loadButton: document.querySelector("#load"),
    wrapper: document.querySelector("#wrapper"),
    canvasWrapper: document.querySelector("#canvas"),
    canvas: document.querySelector("#canvas canvas"),
    //aspectRatio: 1.0,
    tausly: undefined
}

listen("onLoadTauslyCodeFile", async e =>
{
    app.menu.classList.add("hidden")
    app.canvasWrapper.classList.remove("hidden")
    
    if (!app.tausly)
    {
        app.tausly = new Tausly
        app.tausly.onResize = async (width, height) =>
        {
            //app.aspectRatio = width / height;
            await invoke("resize_window", { width: width, height: height })
        }
    }
    
    app.tausly.setSize(640, 480)
    app.tausly.run(e.payload).then(() =>
    {
        //app.menu.classList.remove("hidden")
        app.canvasWrapper.classList.add("hidden")
    })
})

window.onresize = e =>
{
    const ratio = app.canvas.width / app.canvas.height
    
    const space = {
        width: wrapper.clientWidth,
        height: wrapper.clientHeight,
        ratio: undefined
    }
    
    space.ratio = space.width / space.height
    
    let s
    if (ratio < space.ratio)
        s = space.height / app.canvas.height
    else
        s = space.width / app.canvas.width
    
    app.canvasWrapper.style.transform = `scale(${(Math.floor(s * 1000) / 1000).toFixed(3)})`
}

//listen("onWindowResize", async e =>
//{
//    const size = e.payload
//    if (size.width / size.height != app.aspectRatio)
//    {
//        await invoke("resize_window", {
//            width: size.width,
//            height: size.width / app.aspectRatio
//        })
//    }
//})

app.loadButton.addEventListener("click", async () =>
{
    await invoke("open_file_dialog")
})