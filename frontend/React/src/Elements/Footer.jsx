import React from "react";

const Footer = () => {
  const gitHub = "https://github.com/langfalvidavid/Langfalvi_David_JXHE1Z_Szakdolgozat"
  return (
    <div>

      <footer className="bg-dark text-center text-white">
        <div className="container p-2 pb-2">
          <section className="mb-0 mt-1">
            <a className="btn btn-outline-light btn-floating m-1" target="_blank" href={gitHub} role="button">
            <i className="bi bi-facebook"></i>
            </a>
  
            <a className="btn btn-outline-light btn-floating m-1" target="_blank" href={gitHub} role="button">
            <i className="bi bi-twitter"></i>
            </a>
  
            <a className="btn btn-outline-light btn-floating m-1" target="_blank" href={gitHub} role="button">
              <i className="bi bi-google"></i>
            </a>
  
            <a className="btn btn-outline-light btn-floating m-1" target="_blank" href={gitHub} role="button">
            <i className="bi bi-instagram"></i>
            </a>
  
            <a className="btn btn-outline-light btn-floating m-1" target="_blank" href={gitHub} role="button">
            <i className="bi bi-linkedin"></i>
            </a>
  
            <a className="btn btn-outline-light btn-floating m-1" target="_blank" href={gitHub} role="button">
            <i className="bi bi-github"></i>
            </a>
          </section>
        </div>
  
        {/* <div className="text-center p-1" style={{backgroundColor : "rgba(0, 0, 0, 0.2)"}}>
          <a className="text-white" target="_blank" href={gitHub}> Szakdolgozat </a>
        </div> */}
      </footer>
    </div>
    );
  };

export default Footer;
