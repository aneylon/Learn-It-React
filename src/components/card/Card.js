const Card = ({ cardData }) => {
  return (
    <div>
      <div>
        <p>{cardData.question}</p>
        <p>{cardData.answer}</p>
        <p>{cardData.explain}</p>
      </div>
    </div>
  );
};
export default Card;
