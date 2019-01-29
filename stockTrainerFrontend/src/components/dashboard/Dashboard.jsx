import React from "react";
import { Segment, Responsive, Tab, Menu } from "semantic-ui-react";
import "./Dashboard.css";
import Indicators from "./Indicators";
import Favorites from "../favorites/Favorites";
import companyList from "../../util/test.json";

const Dashboard = props => {
  const { favorites, favoriteToggle } = props;
  const favoriteObj = favorites
    .map(e => {
      {
        const newObj = {
          symbol: e,
          name: companyList.find(x => x.symbol === e).name
        };
        return newObj;
      }
    }) // this sort makes it the same order as the other list
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  return (
    <div className="holderDiv">
      <Responsive as={Segment} className="height" maxWidth={768}>
        <Tab
          renderActiveOnly={false}
          className="height"
          panes={[
            {
              menuItem: <Menu.Item className="tabDash">Stock Ticker</Menu.Item>,
              pane: {
                content: (
                  <Favorites
                    className="height"
                    favoriteToggle={favoriteToggle}
                    favorites={favorites}
                    title="Stock Ticker"
                    data={companyList}
                  />
                )
              }
            },
            {
              menuItem: <Menu.Item className="tabDash">Favorites</Menu.Item>,
              pane: {
                content: (
                  <Favorites
                    title="Favorites"
                    favorites={favorites}
                    favoriteToggle={favoriteToggle}
                    data={favoriteObj}
                  />
                )
              }
            }
          ]}
        />
      </Responsive>
      <Responsive minWidth={768} className="gridContainer">
        <Segment className="ind">
          <Indicators />
        </Segment>
        <Segment className="userStocks">
          <Favorites
            title="Favorites"
            favorites={favorites}
            favoriteToggle={favoriteToggle}
            data={companyList}
          />
        </Segment>
        <Segment className="leftColumn">
          <Favorites
            favoriteToggle={favoriteToggle}
            favorites={favorites}
            title="Stock Ticker"
            data={companyList}
          />
        </Segment>
      </Responsive>
    </div>
  );
};

export default Dashboard;
