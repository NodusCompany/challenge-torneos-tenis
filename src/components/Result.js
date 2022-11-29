import React from 'react'

const Result = ({resultData, openSidebarInfo, loader}) => {
    return(
        <React.Fragment>
        <div className="headerTable">
            <div>Torneo</div>
            <div>Jugador</div>
        </div>

        <div className="listResult">
            {resultData.length > 0 &&
            resultData.map((item, key) => {
                return (
                <div className="itemResult">
                    <div>{item.tourney_name}</div>
                    <div>
                    <a onClick={() => openSidebarInfo(item)}>
                        {item.player_name}
                    </a>
                    </div>
                </div>
                );
            })}
            {loader && (
            <div class="conteneur_general_load_9" align="center">
                <div class="loader_9"></div>
            </div>
            )}
        </div>
        </React.Fragment>
    )
}
export default Result;