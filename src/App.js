import React, { Component } from 'react';
import Header from './components/header/Header';
import Card from './components/card/Card';
import GameOver from './components/card/GameOver';
import './styles/main.css';

class App extends Component {

  // set the initial state 
  state = { 
    isFlipped: Array(16).fill(false),
    shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardId: -1
  };
  
  // contains the method for duplicating the array of card numbers from 15
  static duplicateCard = () => {
    return [0,1,2,3,4,5,6,7].reduce((preValue, current, index, array) => {
      return preValue.concat([current, current])
    },[]);
  };
  
  // handles the event when the card is clicked 
  // contains the method for flipping card when it is clicked on to reveal the card. 
  handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id; // selected card 
    const newFlipps = this.state.isFlipped.slice();

    this.setState({
        prevSelectedCard: this.state.shuffledCard[cardId],
        prevCardId: cardId
    });

  // the method changes the isFlippedstate of the card to true and prevents a card that is already flipped from responding to the click event
    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState(prevState => ({ 
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));


  // check if the number of flipped cards is two so we can check if the two cards are a match
      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };

//  method that checks if the two flipped cards are a match

isCardMatch = (card1, card2, card1Id, card2Id) => {
  if (card1 === card2) {
    const hideCard = this.state.shuffledCard.slice();
    hideCard[card1Id] = -1;
    hideCard[card2Id] = -1;
    setTimeout(() => {
      this.setState(prevState => ({
        shuffledCard: hideCard
      }))
    }, 1000);
  } else {
    const flipBack = this.state.isFlipped.slice();
    flipBack[card1Id] = false;
    flipBack[card2Id] = false;

    // The setTimeout method used while setting the state is so that the card flip will not be abrupt.

    setTimeout(() => {
      this.setState(prevState => ({ isFlipped: flipBack }));
    }, 1000);
  }
};

}

export default App;
