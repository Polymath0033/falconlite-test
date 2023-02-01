import { Outlet } from "react-router-dom";
import card from "../assets/cards.svg";
import "../App.css";
const Layout = () => {
  return (
    <>
      <div className="backdrop"></div>
      <div className="App">
        <main>
          <div className="logo">
            <div className="circle-one"></div>
            <div className="circle-two"></div>
            <h1>
              Falcon
              <span className="lite">
                Lite <sup className="sup">TM</sup>
              </span>
            </h1>
          </div>
          <Outlet />
        </main>
        <div className="side">
          <img src={card} alt="card" />
        </div>
      </div>
    </>
  );
};
export default Layout;
