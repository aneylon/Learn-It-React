import Card from "./Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
const apiUrl = process.env.REACT_APP_API;
// const FlashCards = ({ id }) => {
const FlashCards = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [setInfo, setSetInfo] = useState({ name: "", subTitle: "" });
  const [selectedCard, setSelectedCard] = useState(0);
  // get cards by set
  function GetCardSet(setId) {
    fetch(`${apiUrl}/cardSet/${setId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCards(ShuffleCards(data.cards));
        setSetInfo({ name: data.name, subTitle: data.subTitle });
      })
      .catch((error) => console.error("Error getting card set : ", error));
  }
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
    GetCardSet(id);
  }, [id]);
  return (
    <div>
      {!cards.length && <Loading />}
      <div title={setInfo.subTitle}>{setInfo.name}</div>
      {cards.length > 0 && (
        <div>
          <Card cardData={cards[selectedCard]} />
          <button onClick={() => NextCard("know")}>Know</button>
          <button onClick={() => NextCard("notSure")}>Not Sure</button>
          <button onClick={() => NextCard("dontKnow")}>Don't Know</button>
        </div>
      )}
    </div>
  );
};
export default FlashCards;
