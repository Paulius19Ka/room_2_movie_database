const Footer = () => {
    return (
      <footer style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "0.85rem"
      }}>
        {/* Top row with social & QR card */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: "2rem"
        }}>
          {/* Social icons block */}
          <div style={{
            border: "1px solid #444",
            borderRadius: "10px",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "240px"
          }}>
            <strong style={{ marginBottom: "1rem" }}>Follow IMDb on social</strong>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://www.tiktok.com/@imdb" target="_blank" rel="noreferrer">
                <img src="https://img.icons8.com/ios-filled/24/ffffff/tiktok--v1.png" alt="TikTok" />
              </a>
              <a href="https://www.instagram.com/imdb/" target="_blank" rel="noreferrer">
                <img src="https://img.icons8.com/ios-filled/24/ffffff/instagram-new.png" alt="Instagram" />
              </a>
              <a href="https://twitter.com/imdb" target="_blank" rel="noreferrer">
                <img src="https://img.icons8.com/ios-filled/24/ffffff/twitter.png" alt="Twitter" />
              </a>
              <a href="https://www.youtube.com/imdb" target="_blank" rel="noreferrer">
                <img src="https://img.icons8.com/ios-filled/24/ffffff/youtube-play.png" alt="YouTube" />
              </a>
              <a href="https://www.facebook.com/imdb" target="_blank" rel="noreferrer">
                <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png" alt="Facebook" />
              </a>
            </div>
          </div>
  
          {/* QR code block */}
          <div style={{
            border: "1px solid #444",
            borderRadius: "10px",
            padding: "1rem 2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            minWidth: "260px"
          }}>
            <div>
              <strong>Get the IMDb app</strong>
              <p style={{ color: "#aaa", marginTop: "0.3rem" }}>For Android and iOS</p>
            </div>
            <img
              src="https://www.citypng.com/public/uploads/preview/download-black-qr-code-barcode-png-704081694711798fcch0jaztk.png"
              alt="QR Code"
              style={{ width: "60px", height: "60px" }}
            />
          </div>
        </div>
  
        {/* Text links */}
        <div style={{
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "1rem",
  maxWidth: "700px", // 👈 kad suformuotų dvi eilutes
  marginBottom: "1.5rem"
}}>
          <span>Help</span>
          <span>Site Index</span>
          <span>IMDbPro</span>
          <span>Box Office Mojo</span>
          <span>License IMDb Data</span>
          <span>Press Room</span>
          <span>Advertising</span>
          <span>Jobs</span>
          <span>Conditions of Use</span>
          <span>Privacy Policy</span>
          <span>Your Ads Privacy Choices</span>
        </div>
  
        {/* Amazon */}
        <div style={{ marginBottom: "0.5rem" }}>
  <img
    src="https://noahcertified.org/wp-content/uploads/2020/07/AMAZON-1200x537-1.png"
    alt="Amazon"
    style={{ height: "90px", objectFit: "contain" }}
  />
</div>
          
        
        {/* Copyright */}
        <div style={{ color: "#aaa" }}>
          © 1990–2025 by IMDb.com, Inc.
        </div>
      </footer>
    );
  };
  
  export default Footer;