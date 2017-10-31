var game;
var gameOptions = {
    gameWidth: screen.width,
    gameHeight: screen.height,
    cardSheetWidth: 334,
    cardSheetHeight: 440,
    cardScale: 0.8
}
window.onload = function() {
    game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight);
    game.state.add("PlayGame", playGame)
    game.state.start("PlayGame");
}
var playGame = function(game) {}
playGame.prototype = {
    preload: function() {
        game.load.spritesheet("cards", "cards.png", gameOptions.cardSheetWidth, gameOptions.cardSheetHeight);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    create: function() {
        game.stage.backgroundColor = "#4488AA";
        this.deck = Phaser.ArrayUtils.numberArray(0, 51);
        Phaser.ArrayUtils.shuffle(this.deck);
        this.cardsInGame = [];
        for(var i = 0; i < 51; i++){
            this.cardsInGame.push(this.makeCard(i));
        }
        this.nextCardIndex = 2;
        var tween = game.add.tween(this.cardsInGame[0]).to({
            x: game.width / 2
        }, 500, Phaser.Easing.Cubic.Out, true);
    },
    makeCard: function(cardIndex) {
        var card = game.add.sprite(cardIndex*10 + game.width/2, game.height / 2, "cards");
        card.anchor.set(0.5);
        card.scale.set(gameOptions.cardScale);
        card.frame = this.deck[cardIndex];
        return card;
    },
}
