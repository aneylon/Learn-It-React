import { useEffect, useState } from "react";
let apiUrl = process.env.REACT_APP_API;
const CardList = () => {
  const [cards, setCards] = useState([]);
  function GetCards() {
    fetch(`${apiUrl}/cards`)
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
      });
  }
  useEffect(() => {
    GetCards();
  }, []);
  return (
    <div>
      Card List
      {cards.length > 0 && (
        <ul>
          {cards.map((card) => {
            return (
              <li key={card.id}>
                <p>{card.question}</p>
                <p>{card.answer}</p>
                <p>{card.explain}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default CardList;
