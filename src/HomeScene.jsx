import "./HomeScene.css";

function HomeScene() {
  return (
    <section className="home-scene">
      <div className="home-ceiling">
        <div className="ceiling-light">
          <span />
        </div>
      </div>

      <div className="home-wall">
        <div className="wall-clock">10:30</div>

        <div className="tv-unit">
          <div className="tv-screen">
            <span>SMART TV</span>
          </div>
          <div className="tv-stand">
            <span />
            <span />
          </div>
        </div>

        <div className="switch-board">
          <div className="switch-title">HOME CONTROL</div>

          <button>
            <span className="switch-button" />
            LIGHT
          </button>

          <button>
            <span className="switch-button" />
            FAN
          </button>

          <button>
            <span className="switch-button" />
            TV
          </button>

          <button>
            <span className="switch-button" />
            AC
          </button>
        </div>

        <div className="prepaid-meter">
          <div className="meter-header">
            PREPAID
          </div>

          <div className="meter-display">
            <span>₹100.00</span>
            <small>230 V</small>
          </div>

          <div className="meter-status">
            <i />
            SUPPLY ON
          </div>
        </div>
      </div>

      <div className="home-floor">
        <div className="sofa">
          <div className="sofa-back" />
          <div className="sofa-seat" />
          <div className="sofa-arm left" />
          <div className="sofa-arm right" />
        </div>

        <div className="table">
          <div className="table-top" />
          <div className="table-leg one" />
          <div className="table-leg two" />
        </div>

        <div className="plant">
          <div className="plant-pot" />
          <div className="leaf leaf-one" />
          <div className="leaf leaf-two" />
          <div className="leaf leaf-three" />
        </div>
      </div>
    </section>
  );
}

export default HomeScene;