extern crate reqwest;

use std::io::Cursor;

type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;

async fn fetch_url(url: String, file_name: String) -> Result<()> {
    let response = reqwest::get(url).await?;
    let mut file = std::fs::File::create(file_name)?;
    let mut content =  Cursor::new(response.bytes().await?);
    std::io::copy(&mut content, &mut file)?;
    Ok(())
}

#[tokio::main]
async fn main() {
    
    fetch_url(
        "https://raw.githubusercontent.com/themelektaus/tausly/master/editor/dejavu-sans-mono.woff".to_string(),
        "../src/dejavu-sans-mono.woff".to_string()
    ).await.unwrap();
    
    fetch_url(
        "https://raw.githubusercontent.com/themelektaus/tausly/master/editor/dejavu-sans.css".to_string(),
        "../src/dejavu-sans.css".to_string()
    ).await.unwrap();
    
    fetch_url(
        "https://raw.githubusercontent.com/themelektaus/tausly/master/favicon.ico".to_string(),
        "../src/favicon.ico".to_string()
    ).await.unwrap();
    
    fetch_url(
        "https://raw.githubusercontent.com/themelektaus/tausly/master/favicon.ico".to_string(),
        "../src/favicon.ico".to_string()
    ).await.unwrap();
    
    fetch_url(
        "https://raw.githubusercontent.com/themelektaus/tausly/master/reverb-impulse-response.m4a".to_string(),
        "../src/reverb-impulse-response.m4a".to_string()
    ).await.unwrap();
    
    fetch_url(
        "https://raw.githubusercontent.com/themelektaus/tausly/master/tausly.js".to_string(),
        "../src/tausly.js".to_string()
    ).await.unwrap();
    
    tauri_build::build()
}