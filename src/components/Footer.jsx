import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Stacks</h4>
          <p>Helping you discover the amazing collections your library has beyond books.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/results">Browse Items</a></li>
            <li><a href="/profile">Your Profile</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Questions? Reach out at hello@stacks.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Stacks. Made with love for library explorers.</p>
      </div>
    </footer>
  )
}

export default Footer
