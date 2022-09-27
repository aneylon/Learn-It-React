import Card from "./Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API;
// const FlashCards = ({ id }) => {
const FlashCards = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [setInfo, setSetInfo] = useState({ name: "", subTitle: "" });
  const [selectedCard, setSelectedCard] = useState(0);
  // get cards by set
  function GetCardSet(setId) {
    console.log("getting card set", setId);
    fetch(`${apiUrl}/cardSet/${setId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCards(ShuffleCards(data.cards));
        setSetInfo({ name: data.name, subTitle: data.subTitle });
        console.log(data);
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
    console.log("next card");
    if (selectedCard === cards.length - 1) {
      setCards(ShuffleCards(cards));
      setSelectedCard(0);
    } else setSelectedCard(selectedCard + 1);
  }
  function ShuffleCards(cardsToShuffle) {
    let shuffledCards = cardsToShuffle.slice();
    for (let i = 0; i < cardsToShuffle.length; i++) {
      let randomCard = Math.floor(Math.random() * shuffledCards.length);
      console.log("mix it up", i, randomCard);
      let temp = shuffledCards[i];
      shuffledCards[i] = shuffledCards[randomCard];
      shuffledCards[randomCard] = temp;
    }
    console.log(shuffledCards);
    return shuffledCards;
  }
  useEffect(() => {
    console.log("start it up");
    GetCardSet(id);
  }, [id]);
  useEffect(() => {
    console.log(selectedCard);
  });
  return (
    <div>
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
