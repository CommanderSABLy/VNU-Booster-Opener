import React from "react";
import { useState, Fragment } from "react";
import "./App.css";
import BoosterImage from "./images/Liora_Pack.png";
import VNUBackground from "./images/VNUBackground.png";
import CardBack from "./images/vnu_card_back.png";

const cards = require.context('./images/cards', true);
var cardList = cards.keys().map(card => cards(card));

function shuffle(array) {
    let i = array.length;
    while (i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const Cards = (props) => {
    let {packVis, ...rest} = props;
    var openedCards = [];
    for ( let i = 0; i < cardList.length; i++) {
        openedCards.push({id: i, source: cardList[i]})
    }
    return openedCards.slice(0, 10).map(selectedCard =>
        <Fragment key={selectedCard.id}>
            <IndividualCard isPackVisible={packVis} source={selectedCard.source.default} {...rest} />
        </Fragment>
    );
}

function IndividualCard( props ) {
    let {isPackVisible, source, ...rest} = props;
    return <img className="card" src={isPackVisible ? source :  CardBack} {...rest} />
}

const ImageContainer = (props) => {
    let {imgSrc, ...rest} = props;
    return(
        <div className="fullpage" style={{display: imgSrc ? "flex" : "none"}} {...rest}>
                <img className="fullimage" src={imgSrc} />
            </div>
    )
}

const PackContainer = (props) => {
    let {packClicked, ...rest} = props;
    return(
        <div className="pack-opening" style={{display: !packClicked ? "block" : "none", backgroundImage: `url(${VNUBackground})`}}>
            <h1>Click to Open</h1>
            <img className="full-pack" src={BoosterImage} {...rest} />
        </div>
    )
}

const App = () => {
    const [full, setFull] = useState(false);
    const [image, setImage] = useState("");
    const [packVisible, setPackVisible] = useState(false);
    
    const handleFullClick = () => {
        if ( full ) {
            setFull(!full);
            setImage("");
        }
    }
    const handleCardClick = event => {
        if ( !full ) {
            setImage(event.target.src)
        }
        setFull(!full);
    }
    const handlePackClick = () => {
        cardList = shuffle(cardList);
        setPackVisible(!packVisible);
    }

    const handleAnotherButton = () => {
        setPackVisible(!packVisible);
    }

    return (
        <div className="body">
            <h1>Click to View</h1>
            <div className="card-container">
                <Cards packVis={packVisible} onClick={handleCardClick}/>
            </div>
            <div className="same-pack">
                <button onClick={handleAnotherButton}>Open Another Pack</button>
            </div>
            <PackContainer packClicked={packVisible} onClick={handlePackClick}/>
            <ImageContainer imgSrc={image} onClick={handleFullClick}/>
        </div>
    )
}

export default App