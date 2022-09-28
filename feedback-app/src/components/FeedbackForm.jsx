import { useState, useContext, useEffect } from "react";
import Card from "../shared/Card";
import Button from "../shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const { addFeedback, editedItem, updateFeedback } =
    useContext(FeedbackContext);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editedItem.edit === true) {
      setBtnDisabled(false);
      setText(editedItem.item.text);
      setRating(editedItem.item.rating);
    }
  }, [editedItem]);

  const handleInputChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(true);
    } else if (text !== "" && text.trim().length < 10) {
      setMessage("Text must be atleast 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };
      if (editedItem.edit === true) {
        updateFeedback(editedItem.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      setText("");
      setBtnDisabled(true);
      setRating(10);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate our service with us?</h2>
        <RatingSelect select={setRating} />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a Review"
            onChange={handleInputChange}
            value={text}
          ></input>
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
