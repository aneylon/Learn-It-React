import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import Loading from "../loading/Loading";
import {
  Button,
  Container,
  Card as MuiCard,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
const apiUrl = process.env.REACT_APP_API;
const FlashCards = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [setInfo, setSetInfo] = useState({ name: "", subTitle: "" });
  const [selectedCard, setSelectedCard] = useState(0);
  function NextCard(result) {
    switch (result) {
      case "know":
        console.log("know it");
        break;
      case "notSure":
        console.log("not sure");
        break;
      case "dontKnow":
        console.log("dont know");
        break;
      default:
        break;
    }
    if (selectedCard === cards.length - 1) {
      setCards(ShuffleCards(cards));
      setSelectedCard(0);
    } else setSelectedCard(selectedCard + 1);
  }
  function ShuffleCards(cardsToShuffle) {
    let shuffledCards = cardsToShuffle.slice();
    for (let i = 0; i < cardsToShuffle.length; i++) {
      let randomCard = Math.floor(Math.random() * shuffledCards.length);
      let temp = shuffledCards[i];
      shuffledCards[i] = shuffledCards[randomCard];
      shuffledCards[randomCard] = temp;
    }
    return shuffledCards;
  }
  useEffect(() => {
    const GetCardSet = (setId) => {
      fetch(`${apiUrl}/cardSet/${setId}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.cardSet);
          setCards(ShuffleCards(data.cardSet.cards));
          setSetInfo({
            name: data.cardSet.name,
            subTitle: data.cardSet.subTitle,
          });
        })
        .catch((error) => console.error("Error getting card set : ", error));
    };
    GetCardSet(id);
  }, [id]);
  return (
    <Container style={{ maxWidth: "550px" }}>
      <MuiCard variant="elevation" sx={{ marginTop: 15 }}>
        <CardContent>
          {!cards.length && <Loading />}
          <Typography
            variant="h5"
            title={setInfo.subTitle}
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            {setInfo.name}
          </Typography>
          {cards.length > 0 && <Card cardData={cards[selectedCard]} />}
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button variant="outlined" onClick={() => NextCard("know")}>
            Know
          </Button>
          <Button variant="outlined" onClick={() => NextCard("notSure")}>
            Not Sure
          </Button>
          <Button variant="outlined" onClick={() => NextCard("dontKnow")}>
            Don't Know
          </Button>
        </CardActions>
      </MuiCard>
    </Container>
  );
};
export default FlashCards;
