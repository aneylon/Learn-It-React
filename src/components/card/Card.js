import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
const Card = ({ cardData }) => {
  return (
    <Accordion sx={{ textAlign: "center", margin: 3 }} square>
      <AccordionSummary>
        <Typography sx={{ width: "100%" }}>{cardData.question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{cardData.answer}</Typography>
        <Typography>{cardData.explain}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
export default Card;
