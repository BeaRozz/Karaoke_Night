class Buttons{
    constructor(){
        this.Song1 = createButton("Missa Langosta");
        this.Song2 = createButton("I Will Survive");
        this.Song3 = createButton("   Tequila    ");
    }

    hide(){
        this.Song1.hide();
        this.Song2.hide();
        this.Song3.hide();
    }

    display(){
        this.Song1.position(windowWidth/2 - 75, windowHeight/2 - 50);       
        this.Song2.position(windowWidth/2 - 65, windowHeight/2);
        this.Song3.position(windowWidth/2 - 50, windowHeight/2 + 50);

        this.Song1.mousePressed(()=>{
            SongSelection = SongSelection1;
            gameState = PLAY;
            SongDuration = 1504;
            SongSelection.play();
        })

        this.Song2.mousePressed(()=>{
            SongSelection = SongSelection2;
            gameState = 2;
            SongSelection.play();
        })

        this.Song3.mousePressed(()=>{
            SongSelection = SongSelection3;
            gameState = 2;
            SongSelection.play();
        })
    }

}
