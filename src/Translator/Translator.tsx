import { useState } from "react";
import { List, ListInlineItem, Tooltip } from 'reactstrap';
import './Translator.css';

const Translator = () => {
    const words = [
        "apple", "book", "car", "dog", "elephant", "flower", "garden", "house", "ice", "jungle",
        "kite", "lemon", "mountain", "notebook", "ocean", "pencil", "queen", "river", "sun", "tree",
        "umbrella", "violin", "window", "xylophone", "yellow", "zebra", "airplane", "banana", "cloud", "door"
    ]

    const[meaning, setMeaning] = useState("")
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const handleHover = async (word : string) => {
        const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const res = await data.json()
        const meaning = res[0].meanings[0].definitions[0].definition
        setMeaning(meaning)
        setTooltipOpen(true)
    }

    const handleLeave = () => {
        setTooltipOpen(false)
    }

    return (
      <>
        <List type="inline" className="list-inline">
          {words.map((word, index) => (
            <ListInlineItem
              id="TooltipExample"
              key={index}
              onMouseEnter={() => handleHover(word)}
              onMouseLeave={handleLeave}
            >
              {word}
            </ListInlineItem>
          ))}
        </List>
        <Tooltip
          placement={"bottom"}
          autohide={true}
          flip={true}
          isOpen={tooltipOpen}
          target="TooltipExample"
          toggle={toggle}
        >
          {meaning || "Loading...."}
        </Tooltip>
      </>
    );
}

export default Translator
