import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ListPage.module.css";
import {
  Avatar,
  AvatarSize,
  Button,
  ButtonDesign,
  Card,
  FlexibleColumnLayout,
  FCLLayout,
  FlexBox,
  FlexBoxDirection,
  ShellBar,
  StandardListItem,
  Label,
  List,
  Text,
  Title,
  Toolbar,
  ToolbarSpacer,
  ToolbarDesign,
  Bar,
  DynamicPage,
  DynamicPageHeader,
  DynamicPageTitle,
  BreadcrumbsItem,
  Badge,
  ResponsivePopover,
  FormItem,
  Form,
  FormGroup,
  Input,
} from "@ui5/webcomponents-react"; // loads ui5-button wrapped in a ui5-webcomponents-react component
interface ListPageProps {}
const movieData = [
  {
    movie: "Fridge",
    genre: "Kitchen Appliance",
    country: "Singapore",
  },
  {
    movie: "Aircon 2",
    genre: "General Appliance",
    country: "Thailand",
  },
  
];
const castData = [
  {
    name: "Clywd Gimeno",
    gender: "Male",
  },
  {
    name: "Essie Gadson",
    gender: "Female",
  },
  {
    name: "Claresta Greger",
    gender: "Female",
  },
  {
    name: "Susanne Pinson",
    gender: "Female",
  },
  {
    name: "Gardener Cutford",
    gender: "Male",
  },
  {
    name: "Red Swyer-Sexey",
    gender: "Male",
  },
  {
    name: "Alyson Bachellier",
    gender: "Female",
  },
  {
    name: "Amata Penke",
    gender: "Female",
  },
  {
    name: "Ancell Aprahamian",
    gender: "Male",
  },
  {
    name: "Kimmy Sworne",
    gender: "Female",
  },
  {
    name: "Liam Umpleby",
    gender: "Male",
  },
  {
    name: "Caleb Trathen",
    gender: "Male",
  },
  {
    name: "Starlin Kibard",
    gender: "Female",
  },
  {
    name: "Keefe Brammall",
    gender: "Male",
  },
  {
    name: "Terrill Reeme",
    gender: "Male",
  },
  {
    name: "Gerianne Maciejak",
    gender: "Female",
  },
  {
    name: "Wilhelmine Cutmare",
    gender: "Female",
  },
  {
    name: "Rodie Breukelman",
    gender: "Female",
  },
  {
    name: "Eduard Berk",
    gender: "Male",
  },
  {
    name: "Phil Koppens",
    gender: "Female",
  },
];

const defaultData = { movie: "string", genre: "string", country: "string" };
const defaultCastData = { name: "string", gender: "string" };
const ListPage: FC<ListPageProps> = () => {
  let navigate = useNavigate();
  const [layout, setLayout] = useState(FCLLayout.OneColumn);
  const [selectedMovie, setSelectedMovie] = useState(movieData[0]);
  const [selectedCast, setSelectedCast] = useState(castData[0]);
  const [quote, setQuote] = useState("");

  const getQuotes = () => {
    const allQuotes = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;
    fetch(allQuotes)
      .then((res) => res.json())
      .then((data) => {
        let dataQuotes = data.quotes;
        let randomNum = Math.floor(Math.random() * dataQuotes.length);
        let randomQuote = data.quotes[randomNum];
        setQuote(randomQuote.quote);
      });
  };
  useEffect(() => {
    // Update the document title using the browser API
    getQuotes();
  }, []);
  const onStartColumnClick = (e: any) => {
    setSelectedMovie(
      movieData.find((item) => item["movie"] === e.detail.item.dataset.movie) ||
        defaultData
    );
    setLayout(FCLLayout.TwoColumnsMidExpanded);
  };
  const onMiddleColumnClick = (e: any) => {
    setSelectedCast(
      castData.find((item) => item.name === e.detail.item.dataset.name) ||
        defaultCastData
    );
    setLayout(FCLLayout.ThreeColumnsEndExpanded);
  };
  return (
    <div>
      <DynamicPage
        showHideHeaderButton={false}
        headerTitle={
          <DynamicPageTitle
            actions={
              <>
                <Button
                  id={"openPopoverBtn"}
                  onClick={() => {
                    navigate("/add");
                  }}
                  design="Attention"
                >
                  Add
                </Button>

                <Button design="Attention">Scan</Button>
                <Button design="Emphasized">Login!</Button>
              </>
            }
            header={<Title>Dube </Title>}
            subHeader={<Label>{quote}</Label>}
          >
            <Badge>Status: OK</Badge>
          </DynamicPageTitle>
        }
      >
        <FlexibleColumnLayout
          layout={layout}
          startColumn={
            <>
              <List headerText="Assets" onItemClick={onStartColumnClick}>
                {movieData.map((item) => (
                  <StandardListItem
                    description={item.genre}
                    data-movie={item.movie}
                  >
                    {item.movie}
                  </StandardListItem>
                ))}
              </List>
            </>
          }
          midColumn={
            <>
              <Toolbar design={ToolbarDesign.Solid}>
                <Title>{selectedMovie.movie}</Title>
                <ToolbarSpacer />
                <Button
                  icon="decline"
                  design={ButtonDesign.Transparent}
                  onClick={() => {
                    setLayout(FCLLayout.OneColumn);
                  }}
                />
              </Toolbar>
              <Toolbar
                style={{
                  height: "200px",
                }}
              >
                <Avatar
                  icon="video"
                  size={AvatarSize.XL}
                  style={{
                    marginLeft: "12px",
                  }}
                />
                <FlexBox
                  direction={FlexBoxDirection.Column}
                  style={{
                    marginLeft: "6px",
                  }}
                >
                  <FlexBox>
                    <Label>Movie:</Label>
                    <Text
                      style={{
                        marginLeft: "2px",
                      }}
                    >
                      {selectedMovie.movie}
                    </Text>
                  </FlexBox>
                  <FlexBox>
                    <Label>Genre:</Label>
                    <Text
                      style={{
                        marginLeft: "2px",
                      }}
                    >
                      {selectedMovie.genre}
                    </Text>
                  </FlexBox>
                  <FlexBox>
                    <Label>Country:</Label>
                    <Text
                      style={{
                        marginLeft: "2px",
                      }}
                    >
                      {selectedMovie.country}
                    </Text>
                  </FlexBox>
                </FlexBox>
              </Toolbar>
              <List headerText="Cast" onItemClick={onMiddleColumnClick}>
                {castData.map((item) => (
                  <StandardListItem
                    description={item.gender}
                    data-name={item.name}
                  >
                    {item.name}
                  </StandardListItem>
                ))}
              </List>
            </>
          }
          endColumn={
            <>
              <Toolbar design={ToolbarDesign.Solid}>
                <Title>{selectedCast.name}</Title>
                <ToolbarSpacer />
                <Button
                  icon="decline"
                  design={ButtonDesign.Transparent}
                  onClick={() => {
                    setLayout(FCLLayout.TwoColumnsMidExpanded);
                  }}
                />
              </Toolbar>
              <Card title={selectedCast.name}>
                <div>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. "Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum. "Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Text>
                </div>
              </Card>
            </>
          }
        />
        <FlexibleColumnLayout />
      </DynamicPage>
    </div>
  );
};

export default ListPage;
