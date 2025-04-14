import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 2rem 1rem;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialDesktopWrapper = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-bottom: 2rem;
  }
`;

const SocialCard = styled.div`
  border: 1px solid #444;
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QRCard = styled(SocialCard)`
  flex-direction: row;
  justify-content: space-between;
`;

const SocialMobileRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SocialIconsRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 0.5rem 1rem;
  text-align: center;
  max-width: 900px;
  margin-bottom: 1.5rem;
  width: 100%;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, auto);
  }
`;

const AmazonLogo = styled.img`
  height: 40px;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;

const Copyright = styled.div`
  color: #aaa;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      {/* Mobile icons */}
      <SocialMobileRow>
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
      </SocialMobileRow>

      {/* Desktop blocks */}
      <SocialDesktopWrapper>
        <SocialCard>
          <strong style={{ marginBottom: "1rem" }}>Follow IMDb on social</strong>
          <SocialIconsRow>
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
          </SocialIconsRow>
        </SocialCard>

        <QRCard>
          <div>
            <strong>Get the IMDb app</strong>
            <p style={{ color: "#aaa", marginTop: "0.3rem" }}>For Android and iOS</p>
          </div>
          <img
            src="https://www.citypng.com/public/uploads/preview/download-black-qr-code-barcode-png-704081694711798fcch0jaztk.png"
            alt="QR Code"
            style={{ width: "60px", height: "60px", objectFit: "contain" }}
          />
        </QRCard>
      </SocialDesktopWrapper>

      {/* Link grid */}
      <LinksGrid>
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
      </LinksGrid>

      <AmazonLogo
        src="https://noahcertified.org/wp-content/uploads/2020/07/AMAZON-1200x537-1.png"
        alt="Amazon"
      />
      <Copyright>© 1990–2025 by IMDb.com, Inc.</Copyright>
    </FooterWrapper>
  );
};

export default Footer;
