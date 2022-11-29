import React from 'react'
import copa from '../assets/img/copa.png';
import close from '../assets/img/close.png';

const Sidebar = ({sidebar, playerName, tourneyYear, tourneyLocation, tourneyDate, closeSidebarInfo}) => {
    console.log(tourneyYear);
    return(
        <React.Fragment>
            <div className={`sidebarInfo ${sidebar ? 'show':''}`}>
                <header className="header">
                  <a onClick={()=> closeSidebarInfo()}><img src={close} className="close" alt="Copa" /></a>
                  <span>Ultima vez que lo ganó</span>
                </header>
                <img src={copa} className="copa" alt="Copa" />
               <div className="infoPlayer">
                  <p className="titleName">{playerName}</p>
                  <span>Año: {tourneyYear}</span>
                  <span>Lugar: {tourneyLocation}</span>
                  <span>Fecha: {tourneyDate}</span>
               </div>
             </div>
        </React.Fragment>
    )
}


export default Sidebar;