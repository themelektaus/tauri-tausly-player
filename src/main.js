const { invoke } = window.__TAURI__.tauri;
const { listen } = window.__TAURI__.event;

const app = {
    splash: document.querySelector("#splash"),
    wrapper: document.querySelector("#wrapper"),
    canvasWrapper: document.querySelector("#canvas"),
    canvas: document.querySelector("#canvas canvas"),
    output: document.querySelector("#output"),
    tausly: undefined
}

listen("onLoad", async e =>
{
    if (!e.payload)
    {
        app.splash.classList.remove("hidden")
        await invoke("resize_window", { width: 240, height: 90 })
        return
    }
    
    app.canvasWrapper.classList.remove("hidden")
    
    if (!app.tausly)
    {
        app.tausly = new Tausly
        app.tausly.onEcho = onEcho
        app.tausly.onResize = async (width, height) =>
        {
            await invoke("resize_window", { width: width, height: height })
        }
    }
    
    await invoke("show_window")
    
    app.tausly.setSize(640, 480)
    app.tausly.run(e.payload)
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

async function onEcho(output)
{
    const fadeSpeed = 300
    const displayDuration = 3000
    
    const div = document.createElement("div")
    div.style.transition = `opacity ${fadeSpeed}ms`
    div.innerHTML = output
    
    app.output.appendChild(div)
    await delay()
    
    div.classList.add("visible")
    await delay(fadeSpeed)
    await delay(displayDuration)
    
    div.classList.remove("visible")
    await delay(fadeSpeed)
    
    app.output.removeChild(div)
}

function delay(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms))
}